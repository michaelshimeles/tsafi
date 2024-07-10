const DATA_URL_REGEX =
  // eslint-disable-next-line unicorn/no-unsafe-regex
  /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s<>]*?)$/i;

/**
 * Determine if a given data URL is valid or not.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/data_URIs}
 * @see {@link http://tools.ietf.org/html/rfc2397}
 * @see {@link http://tools.ietf.org/html/rfc2396#section2}
 */
function validate(str: string) {
  return DATA_URL_REGEX.test((str || '').trim());
}

export type DataURL = {
  mediaType?: string;
  contentType?: string;
  name?: string;
  base64: boolean;
  data: string;
  toBuffer: () => Buffer;
  [k: string]: any;
};

/**
 * Parse a given data URL into its individual parts.
 *
 */
function parse(str: string) {
  if (!validate(str)) {
    return false;
  }

  const parts = str.trim().match(DATA_URL_REGEX);
  const parsed = {} as DataURL;

  if (parts[1]) {
    parsed.mediaType = parts[1].toLowerCase();

    const mediaTypeParts = parts[1].split(';').map(x => {
      // `name` attributes are for filenames so we shouldn't lowercase them as some filesystems are
      // case-sensitive.
      if (x.startsWith('name=')) {
        return x;
      }

      return x.toLowerCase();
    });

    parsed.contentType = mediaTypeParts[0];

    mediaTypeParts.slice(1).forEach(attribute => {
      const p = attribute.split('=');
      parsed[p[0]] = p[1];
    });
  }

  parsed.base64 = !!parts[parts.length - 2];
  parsed.data = parts[parts.length - 1] || '';

  parsed.toBuffer = () => {
    const encoding = parsed.base64 ? 'base64' : 'utf8';

    return Buffer.from(parsed.data, encoding);
  };

  return parsed;
}

export { parse, validate };
