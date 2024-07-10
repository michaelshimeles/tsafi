/// <reference types="node" />
import { DataURI } from './types';
declare class DataURIParser {
    fileName?: string;
    mimetype?: string;
    content?: string;
    base64?: string;
    buffer?: Buffer;
    encode(fileName: string, handler?: DataURI.Callback): Promise<string | undefined>;
    format(fileName: string, fileContent: DataURI.Input): DataURIParser;
    private createMetadata;
}
export = DataURIParser;
