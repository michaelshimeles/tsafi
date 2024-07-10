export declare type DeepGet<O, P extends string[], D = undefined> = P extends [
    infer H,
    ...infer T
] ? H extends string ? T extends string[] ? H extends keyof O ? DeepGet<O[H], T, D> : D : never : never : O;
