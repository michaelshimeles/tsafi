"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = require("fs");
const mimer_1 = __importDefault(require("mimer"));
const uriTemplate_1 = require("./template/uriTemplate");
const { readFile } = fs_1.promises;
class DataURIParser {
    async encode(fileName, handler) {
        try {
            const buffer = await readFile(fileName);
            this.format(fileName, buffer);
            handler && handler(undefined, this.content, this);
            return this.content;
        }
        catch (err) {
            if (handler) {
                handler(err);
                return;
            }
            throw err;
        }
    }
    format(fileName, fileContent) {
        const fileBuffer = fileContent instanceof Buffer ? fileContent : Buffer.from(fileContent);
        this.buffer = fileBuffer;
        this.base64 = fileBuffer.toString('base64');
        this.createMetadata(fileName);
        return this;
    }
    createMetadata(fileName) {
        const { base64, mimetype = mimer_1.default(fileName) } = this;
        this.fileName = fileName;
        this.mimetype = mimetype;
        this.content = uriTemplate_1.uriParser({ base64, mimetype });
        return this;
    }
}
module.exports = DataURIParser;
