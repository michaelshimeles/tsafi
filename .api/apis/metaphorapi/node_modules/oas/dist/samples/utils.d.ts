/**
 * Portions of this file have been extracted and modified from Swagger UI.
 *
 * @license Apache-2.0
 * @see {@link https://github.com/swagger-api/swagger-ui/blob/master/src/core/utils.js}
 */
import type * as RMOAS from '../rmoas.types';
export declare function usesPolymorphism(schema: RMOAS.SchemaObject): false | "anyOf" | "oneOf" | "allOf";
export declare function objectify(thing: unknown | Record<string, unknown>): Record<string, any>;
export declare function normalizeArray(arr: string | number | (string | number)[]): (string | number)[];
export declare function isFunc(thing: unknown): thing is Function;
export declare function deeplyStripKey(input: unknown, keyToStrip: string, predicate?: (obj: unknown, key?: string) => boolean): any | RMOAS.SchemaObject;
