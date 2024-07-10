import { ISizeCalculationResult } from 'image-size/dist/types/interface';
import { DataURI } from '../types';
declare type ImageDimensions = ISizeCalculationResult;
declare type CSS_AST = DataURI.CSSConfig & {
    className: string;
    background: string;
    dimensions?: ImageDimensions;
};
export declare const cssParser: (ast: CSS_AST) => string;
export {};
