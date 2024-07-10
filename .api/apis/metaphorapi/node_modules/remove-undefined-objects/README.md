# remove-undefined-objects


[![Build](https://github.com/readmeio/remove-undefined-objects/workflows/CI/badge.svg)](https://github.com/readmeio/remove-undefined-objects/) [![](https://img.shields.io/npm/v/remove-undefined-objects)](https://npm.im/remove-undefined-objects)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)

## Installation

```sh
npm install --save remove-undefined-objects
```

## Usage

```js
import removeUndefinedObjects from 'remove-undefined-objects';
// const { default: removeUndefinedObjects } = require('remove-undefined-objects');

console.log(removeUndefinedObjects({key: [], key2: 123}));
// { key2: 123 }
```
