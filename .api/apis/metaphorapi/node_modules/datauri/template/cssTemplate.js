"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssParser = void 0;
const tabChar = '\xa0\xa0';
const propMap = new Map([
    ['backgroundSize', (size) => `background-size: ${size.width}px ${size.height}px`],
    ['width', (size) => `width: ${size.width}px`],
    ['height', (size) => `height: ${size.height}px`]
]);
const parseImageSize = (ast) => Object.keys(ast).reduce((rule, propName) => {
    const prop = propMap.get(propName);
    if (prop && ast.dimensions) {
        return rule.concat(`${tabChar}${prop(ast.dimensions)};`);
    }
    return rule;
}, []);
const cssParser = (ast) => [
    '',
    `.${ast.className.replace(/\s+/gi, '_')} {`,
    `${tabChar}background-image: url('${ast.background}');`
]
    .concat(...(ast.dimensions ? [parseImageSize(ast), '}'] : ['}']))
    .join('\n');
exports.cssParser = cssParser;
