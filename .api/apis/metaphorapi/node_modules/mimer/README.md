# Mimer [![Build Status](https://github.com/data-uri/mimer/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/data-uri/mimer/actions/workflows/main.yml?query=branch%3Amain) [![install size](https://packagephobia.com/badge?p=mimer)](https://packagephobia.com/result?p=mimer)

A file extension to [MIME](http://en.wikipedia.org/wiki/MIME) type module. Uses [mime-db](https://npm.im/mime-db) data but with zero dependencies.

## Getting started
`npm install mimer` or `npx mimer <file>`.

### Module
```js
const mimer = require('mimer');

mimer('.pdf'); // -> "application/pdf"
mimer('pdf'); // -> "application/pdf"
mimer('../readme.pdf'); // -> "application/pdf"
mimer('pedefe'); // -> "application/octet-stream"
```

#### Extension Map
```js
const mimer = require('mimer');
const mimerMap = require('mimer/map');

mimerMap.get('pdf'); // -> "application/pdf"
mimerMap.set('graphql', 'application/graphql');
mimer('content.graphql'); // -> "application/graphql"
```

#### Safe mode
In case you want to avoid changes on original Map for safety.
```js
const mimer = require('mimer/safe');
const mimerMap = require('mimer/map');

mimerMap.set('graphql', 'application/graphql');
mimer('content.graphql'); // -> "application/octet-stream"
```

## CLI

```sh
npm install -g mimer
mimer readme.pdf
```
or just

```sh
npx mimer readme.pdf
```

## Contribute

Just create a new Github Codespace or:

```sh
$ git clone https://github.com/data-uri/mimer.git
$ cd mimer
$ npm i
$ npm test
```

## [Changelog](https://github.com/data-uri/mimer/releases).

## License

MIT License
(c) [Helder Santana](http://heldr.com)
