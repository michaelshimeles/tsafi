export declare type DeepWritable<T> = {
    -readonly [P in keyof T]: DeepWritable<T[P]>;
};
