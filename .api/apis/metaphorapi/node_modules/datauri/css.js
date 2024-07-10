"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parser_1 = __importDefault(require("./parser"));
const image_size_1 = require("image-size");
const cssTemplate_1 = require("./template/cssTemplate");
const path_1 = __importDefault(require("path"));
const defaultCSSConfig = {};
function createClassName(fileName) {
    return path_1.default.basename(fileName, path_1.default.extname(fileName));
}
async function DataURICSSParser(filePath, config = defaultCSSConfig) {
    var _a;
    const parser = new parser_1.default();
    const background = await parser.encode(filePath);
    const ast = Object.assign(Object.assign({}, defaultCSSConfig), config);
    if (!background || !parser.fileName || !parser.buffer) {
        throw `Unabled to read file ${filePath}`;
    }
    if (ast.width || ast.height || ast.backgroundSize) {
        ast.dimensions = image_size_1.imageSize(parser.buffer);
    }
    return cssTemplate_1.cssParser(Object.assign(Object.assign({}, ast), { className: (_a = ast.className) !== null && _a !== void 0 ? _a : createClassName(parser.fileName), background }));
}
module.exports = DataURICSSParser;
