/// <reference types="node" />
import Api from './parser';
import { ISize } from 'image-size/dist/types/interface';
export declare namespace DataURI {
    interface CSSConfig {
        width?: boolean;
        height?: boolean;
        backgroundSize?: boolean;
        className?: string;
        dimensions?: ISize;
    }
    type Input = string | Buffer;
    type Callback = (err?: Error, content?: string, instance?: Api) => any;
}
