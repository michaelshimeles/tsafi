# @readme/postman-to-openapi

🛸 Convert Postman Collection v2.1/v2.0 to OpenAPI v3.0.

Or in other words, transform [this specification](https://schema.getpostman.com/json/collection/v2.1.0/collection.json) and [also this](https://schema.getpostman.com/json/collection/v2.0.0/collection.json) to [this one](http://spec.openapis.org/oas/v3.0.3.html)

[![build](https://github.com/readmeio/postman-to-openapi/workflows/Build/badge.svg)](https://github.com/readmeio/postman-to-openapi/actions)
[![npm version](https://img.shields.io/npm/v/@readme/postman-to-openapi
)](https://npm.im/@readme/postman-to-openapi)
[![CodeQL](https://github.com/readmeio/postman-to-openapi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/readmeio/postman-to-openapi/actions/workflows/codeql-analysis.yml)

## Installation

Using `npm`:

```bash
npm i @readme/postman-to-openapi
```

Using `yarn`:

```bash
yarn add @readme/postman-to-openapi
```

## Quick Usage

As a library

```js
const postmanToOpenAPI = require('postman-to-openapi')

// Postman collection
const postmanCollection = './path/to/postman/collection.json'
// Output OpenAPI Path
const outputFile = './api/collection.yml'

postmanToOpenAPI(postmanCollection, outputFile, { defaultTag: 'General' })
  .then(result => {
    console.log(`OpenAPI specs: ${result}`)
  })
  .catch(err => {
    console.log(err)
  })
```

## Documentation

All features, usage instructions and help can be found in the [Documentation page](https://joolfe.github.io/postman-to-openapi/)

## Differences from `postman-to-openapi`

There are some small differences between this library and the [postman-to-openapi](https://npm.im/postman-to-openapi) upstream:

* Does not ship with a CLI component.
* Has protections in place to prevent `undefined` statuses from being set.
* Has no `version` property on the exported method to determine which version you're running as this is unnecessary without a CLI component.
