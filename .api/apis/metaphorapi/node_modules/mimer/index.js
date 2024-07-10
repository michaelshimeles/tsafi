const { extname } = require('path');
const defaultMap = require('./map');
const defaultMime = 'application/octet-stream';

module.exports = function Mimer(input, extMap = defaultMap) {
    return extMap.get(extname(`_${input.startsWith('.') ? '' : '.'}${input}`).slice(1))
        || defaultMime;
}
