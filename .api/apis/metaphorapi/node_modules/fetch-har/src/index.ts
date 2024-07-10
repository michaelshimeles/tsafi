import type { DataURL as npmDataURL } from '@readme/data-urls';
import type { Har } from 'har-format';

import { parse as parseDataUrl } from '@readme/data-urls';
import { Readable } from 'readable-stream';

if (!globalThis.Blob) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
    globalThis.Blob = require('formdata-node').Blob;
  } catch (e) {
    throw new Error(
      'Since you do not have the Blob API available in this environment you must install the optional `formdata-node` dependency.'
    );
  }
}

if (!globalThis.File) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
    globalThis.File = require('formdata-node').File;
  } catch (e) {
    throw new Error(
      'Since you do not have the File API available in this environment you must install the optional `formdata-node` dependency.'
    );
  }
}

if (!globalThis.FormData) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
    globalThis.FormData = require('formdata-node').FormData;
  } catch (e) {
    throw new Error(
      'Since you do not have the FormData API available in this environment you must install the optional `formdata-node` dependency.'
    );
  }
}

interface RequestInitWithDuplex extends RequestInit {
  /**
   * `RequestInit#duplex` does not yet exist in the TS `lib.dom.d.ts` definition yet the native
   * fetch implementation in Node 18+, `undici`, requires it for certain POST payloads.
   *
   * @see {@link https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1483}
   * @see {@link https://github.com/nodejs/node/issues/46221}
   * @see {@link https://fetch.spec.whatwg.org/#request-class}
   * @see {@link https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts}
   */
  duplex?: 'half';
}

export interface FetchHAROptions {
  userAgent?: string;
  files?: Record<string, Blob | Buffer>;
  multipartEncoder?: any; // form-data-encoder
  init?: RequestInitWithDuplex;
}

type DataURL = npmDataURL & {
  // `parse-data-url` doesn't explicitly support `name` in data URLs but if it's there it'll be
  // returned back to us.
  name?: string;
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isBuffer(value: any) {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
}

function isFile(value: any) {
  if (value instanceof File) {
    /**
     * The `Blob` polyfill on Node comes back as being an instanceof `File`. Because passing a Blob
     * into a File will end up with a corrupted file we want to prevent this.
     *
     * This object identity crisis does not happen in the browser.
     */
    return value.constructor.name === 'File';
  }

  return false;
}

/**
 * @license MIT
 * @see {@link https://github.com/octet-stream/form-data-encoder/blob/master/lib/util/isFunction.ts}
 */
function isFunction(value: any) {
  return typeof value === 'function';
}

/**
 * We're using this library in here instead of loading it from `form-data-encoder` because that
 * uses lookbehind regex in its main encoder that Safari doesn't support so it throws a fatal page
 * exception.
 *
 * @license MIT
 * @see {@link https://github.com/octet-stream/form-data-encoder/blob/master/lib/util/isFormData.ts}
 */
function isFormData(value: any) {
  return (
    value &&
    isFunction(value.constructor) &&
    value[Symbol.toStringTag] === 'FormData' &&
    isFunction(value.append) &&
    isFunction(value.getAll) &&
    isFunction(value.entries) &&
    isFunction(value[Symbol.iterator])
  );
}

function getFileFromSuppliedFiles(filename: string, files: FetchHAROptions['files']) {
  if (filename in files) {
    return files[filename];
  } else if (decodeURIComponent(filename) in files) {
    return files[decodeURIComponent(filename)];
  }

  return false;
}

export default function fetchHAR(har: Har, opts: FetchHAROptions = {}) {
  if (!har) throw new Error('Missing HAR definition');
  if (!har.log || !har.log.entries || !har.log.entries.length) throw new Error('Missing log.entries array');

  const { request } = har.log.entries[0];
  const { url } = request;
  let querystring = '';
  let shouldSetDuplex = false;

  const options: RequestInitWithDuplex = {
    // If we have custom options for the `Request` API we need to add them in here now before we
    // fill it in with everything we need from the HAR.
    ...(opts.init ? opts.init : {}),
    method: request.method,
  };

  if (!options.headers) {
    options.headers = new Headers();
  } else if (typeof options.headers === 'object' && !(options.headers instanceof Headers) && options.headers !== null) {
    options.headers = new Headers(options.headers);
  }

  const headers = options.headers as Headers;
  if ('headers' in request && request.headers.length) {
    // eslint-disable-next-line consistent-return
    request.headers.forEach(header => {
      try {
        return headers.append(header.name, header.value);
      } catch (err) {
        /**
         * `Headers.append()` will throw errors if the header name is not a legal HTTP header name,
         * like `X-API-KEY (Header)`. If that happens instead of tossing the error back out, we
         * should silently just ignore
         * it.
         */
      }
    });
  }

  if ('cookies' in request && request.cookies.length) {
    /**
     * As the browser fetch API can't set custom cookies for requests, they instead need to be
     * defined on the document and passed into the request via `credentials: include`. Since this
     * is a browser-specific quirk, that should only
     * happen in browsers!
     */
    if (isBrowser()) {
      request.cookies.forEach(cookie => {
        document.cookie = `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`;
      });

      options.credentials = 'include';
    } else {
      headers.append(
        'cookie',
        request.cookies
          .map(cookie => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`)
          .join('; ')
      );
    }
  }

  if ('postData' in request) {
    if ('params' in request.postData) {
      if (!('mimeType' in request.postData)) {
        // @ts-expect-error HAR spec requires that `mimeType` is always present but it might not be.
        request.postData.mimeType = 'application/octet-stream';
      }

      switch (request.postData.mimeType) {
        case 'application/x-www-form-urlencoded':
          /**
           * Since the content we're handling here is to be encoded as
           * `application/x-www-form-urlencoded`, this should override any other `Content-Type`
           * headers that are present in the HAR. This is how Postman handles this case when
           * building code snippets!
           *
           * @see {@link https://github.com/github/fetch/issues/263#issuecomment-209530977}
           */
          headers.set('Content-Type', request.postData.mimeType);

          const encodedParams = new URLSearchParams();
          request.postData.params.forEach(param => encodedParams.set(param.name, param.value));

          options.body = encodedParams.toString();
          break;

        case 'multipart/alternative':
        case 'multipart/form-data':
        case 'multipart/mixed':
        case 'multipart/related':
          /**
           * If there's a `Content-Type` header set we need to remove it. We're doing this because
           * when we pass the form data object into `fetch` that'll set a proper `Content-Type`
           * header for this request that also includes the boundary used on the content.
           *
           * If we don't do this, then consumers won't be able to parse out the payload because
           * they won't know what the boundary to split on it.
           */
          if (headers.has('Content-Type')) {
            headers.delete('Content-Type');
          }

          const form = new FormData();
          if (!isFormData(form)) {
            /**
             * The `form-data` NPM module returns one of two things: a native `FormData` API or its
             * own polyfill. Unfortunately this polyfill does not support the full API of the native
             * FormData object so when you load `form-data` within a browser environment you'll
             * have two major differences in API:
             *
             *  - The `.append()` API in `form-data` requires that the third argument is an object
             *    containing various, undocumented, options. In the browser, `.append()`'s third
             *    argument should only be present when the second is a `Blob` or `USVString`, and
             *    when it is present, it should be a filename string.
             *  - `form-data` does not expose an `.entries()` API, so the only way to retrieve data
             *    out of it for construction of boundary-separated payload content is to use its
             *    `.pipe()` API. Since the browser doesn't have this API, you'll be unable to
             * retrieve data out of it.
             *
             * Now since the native `FormData` API is iterable, and has the `.entries()` iterator,
             * we can easily detect if we have a native copy of the FormData API. It's for all of
             * these reasons that we're opting to hard crash here because supporting this
             * non-compliant API is more trouble than its worth.
             *
             * @see {@link https://github.com/form-data/form-data/issues/124}
             */
            throw new Error(
              "We've detected you're using a non-spec compliant FormData library. We recommend polyfilling FormData with https://npm.im/formdata-node"
            );
          }

          request.postData.params.forEach(param => {
            if ('fileName' in param) {
              if (opts.files) {
                const fileContents = getFileFromSuppliedFiles(param.fileName, opts.files);
                if (fileContents) {
                  // If the file we've got available to us is a Buffer then we need to convert it so
                  // that the FormData API can use it.
                  if (isBuffer(fileContents)) {
                    form.append(
                      param.name,
                      new File([fileContents], param.fileName, {
                        type: param.contentType || null,
                      }),
                      param.fileName
                    );

                    return;
                  } else if (isFile(fileContents)) {
                    form.append(param.name, fileContents as Blob, param.fileName);
                    return;
                  }

                  throw new TypeError(
                    'An unknown object has been supplied into the `files` config for use. We only support instances of the File API and Node Buffer objects.'
                  );
                }
              }

              if ('value' in param) {
                let paramBlob;
                const parsed = parseDataUrl(param.value);
                if (parsed) {
                  // If we were able to parse out this data URL we don't need to transform its data
                  // into a buffer for `Blob` because that supports data URLs already.
                  paramBlob = new Blob([param.value], { type: parsed.contentType || param.contentType || null });
                } else {
                  paramBlob = new Blob([param.value], { type: param.contentType || null });
                }

                form.append(param.name, paramBlob, param.fileName);
                return;
              }

              throw new Error(
                "The supplied HAR has a postData parameter with `fileName`, but neither `value` content within the HAR or any file buffers were supplied with the `files` option. Since this library doesn't have access to the filesystem, it can't fetch that file."
              );
            }

            form.append(param.name, param.value);
          });

          /**
           * If a the `fetch` polyfill that's being used here doesn't have spec-compliant handling
           * for the `FormData` API (like `node-fetch@2`), then you should pass in a handler (like
           * the `form-data-encoder` library) to transform its contents into something that can be
           * used with the `Request` object.
           *
           * @see {@link https://www.npmjs.com/package/formdata-node}
           */
          if (opts.multipartEncoder) {
            // eslint-disable-next-line new-cap
            const encoder = new opts.multipartEncoder(form);
            Object.keys(encoder.headers).forEach(header => {
              headers.set(header, encoder.headers[header]);
            });

            // @ts-expect-error "Property 'from' does not exist on type 'typeof Readable'." but it does!
            options.body = Readable.from(encoder);
            shouldSetDuplex = true;
          } else {
            options.body = form;
          }
          break;

        default:
          const formBody: Record<string, unknown> = {};
          request.postData.params.map(param => {
            try {
              formBody[param.name] = JSON.parse(param.value);
            } catch (e) {
              formBody[param.name] = param.value;
            }

            return true;
          });

          options.body = JSON.stringify(formBody);
      }
    } else if (request.postData.text?.length) {
      // If we've got `files` map content present, and this post data content contains a valid data
      // URL then we can substitute the payload with that file instead of the using data URL.
      if (opts.files) {
        const parsed = parseDataUrl(request.postData.text) as DataURL;
        if (parsed) {
          if (parsed?.name && parsed.name in opts.files) {
            const fileContents = getFileFromSuppliedFiles(parsed.name, opts.files);
            if (fileContents) {
              if (isBuffer(fileContents)) {
                options.body = fileContents;
              } else if (isFile(fileContents)) {
                // `Readable.from` isn't available in browsers but the browser `Request` object can
                // handle `File` objects just fine without us having to mold it into shape.
                if (isBrowser()) {
                  options.body = fileContents;
                } else {
                  // @ts-expect-error "Property 'from' does not exist on type 'typeof Readable'." but it does!
                  options.body = Readable.from((fileContents as File).stream());
                  shouldSetDuplex = true;

                  // Supplying a polyfilled `File` stream into `Request.body` doesn't automatically
                  // add `Content-Length`.
                  if (!headers.has('content-length')) {
                    headers.set('content-length', String((fileContents as File).size));
                  }
                }
              }
            }
          }
        }
      }

      if (typeof options.body === 'undefined') {
        options.body = request.postData.text;
      }
    }

    /**
     * The fetch spec, which Node 18+ strictly abides by, now requires that `duplex` be sent with
     * requests that have payloads.
     *
     * As `RequestInit#duplex` isn't supported by any browsers, or even mentioned on MDN, we aren't
     * sending it in browser environments. This work is purely to support Node 18+ and `undici`
     * environments.
     *
     * @see {@link https://github.com/nodejs/node/issues/46221}
     * @see {@link https://github.com/whatwg/fetch/pull/1457}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request}
     */
    if (shouldSetDuplex && !isBrowser()) {
      options.duplex = 'half';
    }
  }

  // We automaticaly assume that the HAR that we have already has query parameters encoded within
  // it so we do **not** use the `URLSearchParams` API here for composing the query string.
  let requestURL = url;
  if ('queryString' in request && request.queryString.length) {
    const urlObj = new URL(requestURL);

    const queryParams = Array.from(urlObj.searchParams).map(([k, v]) => `${k}=${v}`);
    request.queryString.forEach(q => {
      queryParams.push(`${q.name}=${q.value}`);
    });

    querystring = queryParams.join('&');

    // Because anchor hashes before query strings will prevent query strings from being delivered
    // we need to pop them off and re-add them after.
    if (urlObj.hash) {
      const urlWithoutHashes = requestURL.replace(urlObj.hash, '');
      requestURL = `${urlWithoutHashes.split('?')[0]}${querystring ? `?${querystring}` : ''}`;
      requestURL += urlObj.hash;
    } else {
      requestURL = `${requestURL.split('?')[0]}${querystring ? `?${querystring}` : ''}`;
    }
  }

  if (opts.userAgent) {
    headers.append('User-Agent', opts.userAgent);
  }

  options.headers = headers;

  return fetch(requestURL, options);
}
