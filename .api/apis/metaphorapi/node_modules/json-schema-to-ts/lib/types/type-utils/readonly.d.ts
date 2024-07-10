export declare type DeepReadonly<T> = T extends Record<string | number | symbol, any> ? {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;
