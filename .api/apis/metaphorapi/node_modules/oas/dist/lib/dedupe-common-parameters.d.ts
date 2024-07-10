import * as RMOAS from '../rmoas.types';
/**
 * With an array of common parameters filter down them to what isn't already present in a list of
 * non-common parameters.
 *
 * @param parameters Array of parameters defined at the operation level.
 * @param commonParameters Array of **common** parameters defined at the path item level.
 */
export default function dedupeCommonParameters(parameters: RMOAS.ParameterObject[], commonParameters: RMOAS.ParameterObject[]): import("openapi-types").OpenAPIV3.ParameterObject[];
