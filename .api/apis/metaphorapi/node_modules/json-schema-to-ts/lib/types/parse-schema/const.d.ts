import type { M } from "ts-algebra";
import type { JSONSchema7 } from "../definitions";
import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MultipleTypesSchema } from "./multipleTypes";
import type { SingleTypeSchema } from "./singleType";
export declare type ConstSchema = JSONSchema7 & {
    const: unknown;
};
export declare type ParseConstSchema<S extends ConstSchema, O extends ParseSchemaOptions> = S extends SingleTypeSchema ? IntersectConstAndTypeSchema<S, O> : S extends MultipleTypesSchema ? IntersectConstAndTypeSchema<S, O> : ParseConst<S>;
declare type IntersectConstAndTypeSchema<S extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema), O extends ParseSchemaOptions> = M.$Intersect<ParseConst<S>, ParseSchema<Omit<S, "const">, O>>;
declare type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;
export {};
