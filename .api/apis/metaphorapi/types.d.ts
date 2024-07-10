import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type FindSimilarBodyParam = FromSchema<typeof schemas.FindSimilar.body>;
export type FindSimilarResponse200 = FromSchema<typeof schemas.FindSimilar.response['200']>;
export type GetContentsBodyParam = FromSchema<typeof schemas.GetContents.body>;
export type GetContentsResponse200 = FromSchema<typeof schemas.GetContents.response['200']>;
export type SearchBodyParam = FromSchema<typeof schemas.Search.body>;
export type SearchResponse200 = FromSchema<typeof schemas.Search.response['200']>;
