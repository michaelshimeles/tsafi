import type { JSONSchema7TypeName } from "json-schema";
import type { M } from "ts-algebra";
import type { JSONSchema7 } from "../definitions";
import type { ParseSchema, ParseSchemaOptions } from "./index";
export declare type MultipleTypesSchema = JSONSchema7 & {
    type: JSONSchema7TypeName[];
};
export declare type ParseMultipleTypesSchema<P extends MultipleTypesSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;
declare type RecurseOnMixedSchema<S extends JSONSchema7TypeName[], P extends MultipleTypesSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7TypeName ? T extends JSONSchema7TypeName[] ? RecurseOnMixedSchema<T, P, O, R | ParseSchema<Omit<P, "type"> & {
    type: H;
}, O>> : never : never : R;
export {};
