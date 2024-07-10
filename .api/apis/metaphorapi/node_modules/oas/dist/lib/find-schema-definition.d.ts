/**
 * Lookup a reference pointer within an OpenAPI definition and return the schema that it resolves
 * to.
 *
 * @param $ref Reference to look up a schema for.
 * @param definition OpenAPI definition to look for the `$ref` pointer in.
 */
export default function findSchemaDefinition($ref: string, definition?: {}): any;
