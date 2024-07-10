import type { M } from "ts-algebra";
import type { JSONSchema7 } from "../definitions";
import type { ParseSchema, ParseSchemaOptions } from "./index";
export declare type NullableSchema = JSONSchema7 & {
    nullable: boolean;
};
export declare type ParseNullableSchema<S extends NullableSchema, O extends ParseSchemaOptions, R = ParseSchema<Omit<S, "nullable">, O>> = S extends {
    nullable: true;
} ? M.$Union<M.Primitive<null> | R> : R;
