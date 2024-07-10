# fetch-har
Make a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) request from a HAR definition.

[![CI](https://github.com/readmeio/fetch-har/workflows/CI/badge.svg)](https://github.com/readmeio/fetch-har/)
[![](https://img.shields.io/npm/v/fetch-har)](https://npm.im/fetch-har)
[![License](https://img.shields.io/npm/l/fetch-har.svg)](LICENSE)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)

## Features

- Supports Node 14+ (including the native `fetch` implementation in Node 18!).
- Natively works in all browsers that support [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) without having to use any polyfils.
- [Tested](https://github.com/readmeio/fetch-har/actions) across Chrome, Safari, Firefox on Mac, Windows, and Linux.
- Requests can be mocked with [nock](https://npm.im/nock) or [fetch-mock](https://npm.im/fetch-mock).

## Installation

```
npm install --save fetch-har
```

## Usage
```js
require('isomorphic-fetch');

// If executing from an environment that doesn't normally provide `fetch()` we'll automatically
// polyfill in the `Blob`, `File`, and `FormData` APIs with the optional `formdata-node` package
// (provided you've installed it).
const fetchHAR = require('fetch-har').default;
// import fetchHAR from 'fetch-har'); // Or if you're in an ESM codebase.

const har = {
  log: {
    entries: [
      {
        request: {
          headers: [
            {
              name: 'Authorization',
              value: 'Bearer api-key',
            },
            {
              name: 'Content-Type',
              value: 'application/json',
            },
          ],
          queryString: [
            { name: 'a', value: 1 },
            { name: 'b', value: 2 },
          ],
          postData: {
            mimeType: 'application/json',
            text: '{"id":8,"category":{"id":6,"name":"name"},"name":"name"}',
          },
          method: 'POST',
          url: 'http://httpbin.org/post',
        },
      },
    ],
  },
};

fetchHAR(har)
  .then(res => res.json())
  .then(console.log);
```

### API
If you are executing `fetch-har` in a browser environment that supports the [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) then you don't need to do anything. If you arent, however, you'll need to polyfill it.

Unfortunately the most popular NPM package [form-data](https://npm.im/form-data) ships with a [non-spec compliant API](https://github.com/form-data/form-data/issues/124), and for this we don't recommend you use it, as if you use `fetch-har` to upload files it may not work.

Though we recommend either [formdata-node](https://npm.im/formdata-node) or [formdata-polyfill](https://npm.im/formdata-polyfill) we prefer [formdata-node](https://npm.im/formdata-node) right now as it's CJS-compatible.

#### Options
##### userAgent
A custom `User-Agent` header to apply to your request. Please note that browsers have their own handling for these headers in `fetch()` calls so it may not work everywhere; it will always be sent in Node however.

```js
await fetchHAR(har, { userAgent: 'my-client/1.0' });
```

##### files
An optional object map you can supply to use for `multipart/form-data` file uploads in leu of relying on if the HAR you have has [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). It supports Node file buffers and the [File](https://developer.mozilla.org/en-US/docs/Web/API/File) API.

```js
await fetchHAR(har, { files: {
  'owlbert.png': await fs.readFile('./owlbert.png'),
  'file.txt': document.querySelector('#some-file-input').files[0],
} });
```

If you don't supply this option `fetch-har` will fallback to the data URL present within the supplied HAR. If no `files` option is present, and no data URL (via `param.value`) is present in the HAR, a fatal exception will be thrown.

##### multipartEncoder
> ❗ If you are using `fetch-har` in Node you may need this option to execute `multipart/form-data` requests!

If you are running `fetch-har` within a Node environment and you're using `node-fetch@2`, or another `fetch` polyfill that does not support a spec-compliant `FormData` API, you will need to specify an encoder that will transform your `FormData` object into something that can be used with [Request.body](https://developer.mozilla.org/en-US/docs/Web/API/Request/body).

We recommend [form-data-encoder](https://npm.im/form-data-encoder).

```js
const { FormDataEncoder } = require('form-data-encoder');

await fetchHAR(har, { multipartEncoder: FormDataEncoder });
```

You do **not**, and shouldn't, need to use this option in browser environments.

##### init
This optional argument lets you supply any option that's available to supply to the [Request constructor](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request).

```js
await fetchHAR(har, {
  init: {
    headers: new Headers({
      'x-custom-header': 'buster',
    }),
  },
})
```

> ❗ Note that if you supply `body` or `credentials` to this option they may be overridden by what your HAR requires.
