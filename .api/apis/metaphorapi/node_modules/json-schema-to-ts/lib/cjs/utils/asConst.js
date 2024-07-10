"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asConst = void 0;

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
var asConst = function asConst(narrowed) {
  return narrowed;
};

exports.asConst = asConst;
//# sourceMappingURL=asConst.js.map