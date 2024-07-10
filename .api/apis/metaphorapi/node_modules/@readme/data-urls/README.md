# @readme/data-urls
A utility for parsing and validating [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs).

[![CI](https://github.com/readmeio/data-urls/workflows/CI/badge.svg)](https://github.com/readmeio/data-urls/)
[![](https://img.shields.io/npm/v/@readme/data-urls)](https://npm.im/@readme/data-urls)
[![License](https://img.shields.io/npm/l/@readme/data-urls.svg)](LICENSE)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)

This library is a loose fork of [parse-data-url](https://npm.im/parse-data-url) and [valid-data-url](https://npm.im/valid-data-url).

## Installation

```
npm install --save @readme/data-urls
```

## Usage
```js
import { parse, validate } from '@readme/data-urls';

const url = 'data:image/png;name=owlbert-shrub.png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACNUlEQVR4AWJkIA2wCQHqJgcouZ0ADv+SmayR28PibPOP2jafzdp6Lh/v2bVt2+1zbdvtbtbMpGfmvmD8jStc9uB3v75gdNmqtJqsa6qCDEBPRVH7XpKk1P9yHLZv3mG6keV9BIsWGqNuvNaiy+YoARFIXFXwf6Frjz/X9oS4LNRkty4QH/0MSnnWDHORHV3pJsiozRk0zWW/9MEi0A9ffqOhf5RRDW6SGLT/ZXcT8C1hWvao8iF1c4ecKx5eejW1bii1y1asW14P5XsUNkogmvVQg2aPLOnrqss9qE81OYlAucRrN/LrqlBSWYufv34jq7gKseA7MCr0IOhffForGsTWDBJnqE2/B0H+hKRRG3DtxEGk6QBZQ9UFClMSnTJe/cCVI5uQJJpx+8AyOBUPPv+JIpJjgJqCZzKT0AGdAgT/1OLtSzsKI2/gspnxvGExZYFADcoSsqM10SADF4jC4TCCUDN8nih+eoIgPAdGeajBNxyMH20JwsPNMwSicUjBCAwmAZ6GkCmA7I+qCxTGRHSkVzZiCRmKAsRkuVmWiENrt6gL5Di7iw4oogFSINIkCTU09hNAP64CREPUBbzAx9ABrc2I3w2NeY5DMByHu8AGY3YyeoKIuSmBWCD6OuqLPJXe/Dpvkb3FuoDbdENKuBVJ4nxZJpKgWoUXCMcYUwBwDfR8FxZPN4wfWK2Zunq7tGLmZMOc7x7ZUn/RuDmrX0H/4FffQ2teylCecuWmDNsTnainfwFPuNZTR3MemwAAAABJRU5ErkJggg==';

console.log(validate(url)); // true
console.log(parse(url));
```

```js
{
  mediaType: 'image/png;name=owlbert-shrub.png',
  contentType: 'image/png',
  name: 'owlbert-shrub.png',
  base64: true,
  data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACNUlEQVR4AWJkIA2wCQHqJgcouZ0ADv+SmayR28PibPOP2jafzdp6Lh/v2bVt2+1zbdvtbtbMpGfmvmD8jStc9uB3v75gdNmqtJqsa6qCDEBPRVH7XpKk1P9yHLZv3mG6keV9BIsWGqNuvNaiy+YoARFIXFXwf6Frjz/X9oS4LNRkty4QH/0MSnnWDHORHV3pJsiozRk0zWW/9MEi0A9ffqOhf5RRDW6SGLT/ZXcT8C1hWvao8iF1c4ecKx5eejW1bii1y1asW14P5XsUNkogmvVQg2aPLOnrqss9qE81OYlAucRrN/LrqlBSWYufv34jq7gKseA7MCr0IOhffForGsTWDBJnqE2/B0H+hKRRG3DtxEGk6QBZQ9UFClMSnTJe/cCVI5uQJJpx+8AyOBUPPv+JIpJjgJqCZzKT0AGdAgT/1OLtSzsKI2/gspnxvGExZYFADcoSsqM10SADF4jC4TCCUDN8nih+eoIgPAdGeajBNxyMH20JwsPNMwSicUjBCAwmAZ6GkCmA7I+qCxTGRHSkVzZiCRmKAsRkuVmWiENrt6gL5Di7iw4oogFSINIkCTU09hNAP64CREPUBbzAx9ABrc2I3w2NeY5DMByHu8AGY3YyeoKIuSmBWCD6OuqLPJXe/Dpvkb3FuoDbdENKuBVJ4nxZJpKgWoUXCMcYUwBwDfR8FxZPN4wfWK2Zunq7tGLmZMOc7x7ZUn/RuDmrX0H/4FffQ2teylCecuWmDNsTnainfwFPuNZTR3MemwAAAABJRU5ErkJggg==',
  toBuffer: [Function (anonymous)]
}
```
