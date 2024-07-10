import type { M } from "ts-algebra";
import type { JSONSchema7 } from "../definitions";
import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";
export declare type OneOfSchema = JSONSchema7 & {
    oneOf: JSONSchema7[];
};
export declare type ParseOneOfSchema<P extends OneOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;
declare type RecurseOnOneOfSchema<S extends JSONSchema7[], P extends OneOfSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7 ? T extends JSONSchema7[] ? RecurseOnOneOfSchema<T, P, O, R | M.$Intersect<ParseSchema<Omit<P, "oneOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, H>, O>>> : never : never : R;
export {};
