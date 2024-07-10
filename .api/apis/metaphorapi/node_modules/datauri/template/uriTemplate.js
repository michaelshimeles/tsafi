"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uriParser = void 0;
const uriParser = ({ mimetype = 'application/octet-stream', base64 = '' }) => `data:${mimetype};base64,${base64}`;
exports.uriParser = uriParser;
