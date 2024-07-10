<h1 align="center">
  <br>
  <img width="365" src="https://cdn.rawgit.com/data-uri/datauri/master/media/datauri.svg" alt="datauri">
  <br>
  <br>
  <br>
</h1>

Node.js [Module](#module) and [CLI](http://npm.im/datauri-cli) to generate [Data URI scheme](http://en.wikipedia.org/wiki/Data_URI_scheme).

> The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in web pages as if they were external resources.

from: [Wikipedia](http://en.wikipedia.org/wiki/Data_URI_scheme)

## MODULE [![Build Status](https://github.com/data-uri/datauri/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/data-uri/datauri/actions/workflows/main.yml?query=branch%3Amain)

`npm install datauri`

### Getting started

By default, datauri module returns a promise, which is resolved with `data:uri` string or rejected with read file error:

```js
const datauri = require('datauri');

const content = await datauri('test/myfile.png');

console.log(content);
//=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

### Callback style and meta data

```js
const datauri = require('datauri');

datauri('test/myfile.png', (err, content, meta) => {
  if (err) {
    throw err;
  }

  console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

  console.log(meta.mimetype); //=> "image/png"
  console.log(meta.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
  console.log(meta.buffer); //=> file buffer
});
```

### CSS parser

```js
const datauriCSS = require('datauri/css');

await datauriCSS('test/myfile.png');
//=> "\n.case {\n    background-image: url('data:image/png; base64,iVBORw..."

await datauriCSS('test/myfile.png', {
  className: 'myClass',
  width: true,
  height: true
});
//=> adds image width and height and custom class name
```

### Synchronous calls

```js
const Datauri = require('datauri/sync');
const meta = Datauri('test/myfile.png');

console.log(meta.content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
console.log(meta.mimetype); //=> "image/png"
console.log(meta.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
console.log(meta.buffer); //=> file buffer
```

### From a Buffer

If you already have a file Buffer, that's the way to go:

```js
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const buffer = fs.readFileSync('./hello');

parser.format('.png', buffer); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

### From a string

```js
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

parser.format('.png', 'xkcd'); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

## Contribute

```CLI
$ npm install
```

To run test specs

```CLI
$ npm test
```

## [ChangeLog](https://github.com/data-uri/datauri/releases)

## Requirements

Node.js 10+

### Previous Node versions and deprecated features:

Node.js 8
`npm install --save datauri@3`
docs: https://github.com/data-uri/datauri/blob/v3.0.0/docs/datauri.md

Node.js 4+
`npm install --save datauri@2`
docs: https://github.com/data-uri/datauri/blob/v2.0.0/docs/datauri.md

## License

MIT License

(c) [Data-URI.js](https://github.com/data-uri)

(c) [Helder Santana](https://heldr.com)
