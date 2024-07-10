require('isomorphic-fetch');

// If executing from an environment that doesn't normally provide `fetch()`
// we'll automatically polyfill in the `Blob`, `File`, and `FormData` APIs
// with the optional `formdata-node` package (provided you've installed it).
const fetchHAR = require('.').default;

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
