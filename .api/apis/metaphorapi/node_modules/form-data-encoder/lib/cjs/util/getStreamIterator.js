"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isFunction_1 = __importDefault(require("./isFunction"));
const isAsyncIterable = (value) => ((0, isFunction_1.default)(value[Symbol.asyncIterator]));
async function* readStream(readable) {
    const reader = readable.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        yield value;
    }
}
const getStreamIterator = (source) => {
    if (isAsyncIterable(source)) {
        return source;
    }
    if ((0, isFunction_1.default)(source.getReader)) {
        return readStream(source);
    }
    throw new TypeError("Unsupported data source: Expected either ReadableStream or async iterable.");
};
exports.default = getStreamIterator;
