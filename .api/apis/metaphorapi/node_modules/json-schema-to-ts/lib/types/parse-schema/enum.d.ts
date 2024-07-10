import type { M } from "ts-algebra";
import type { JSONSchema7 } from "../definitions";
import type { Compute } from "../type-utils";
import type { ParseSchema, ParseSchemaOptions } from "./index";
export declare type EnumSchema = JSONSchema7 & {
    enum: unknown[];
};
export declare type ParseEnumSchema<S extends EnumSchema, O extends ParseSchemaOptions> = M.$Intersect<ParseEnum<S>, ParseSchema<Omit<S, "enum">, O>>;
declare type ParseEnum<S extends EnumSchema> = M.Enum<Compute<S["enum"][number]>>;
export {};
