/**
 * Returns the input parameter without muting it, but narrowing its inferred type.
 *
 * _(Similar to using the_ `as const` _statement functionnally)_
 *
 * ```ts
 * const object = { foo: "bar" }
 * // { foo: string }
 *
 * const narrowedObject = asConst({ foo: "bar "})
 * // => { foo: "bar" }
 * ```
 */
export var asConst = function asConst(narrowed) {
  return narrowed;
};
//# sourceMappingURL=asConst.js.map