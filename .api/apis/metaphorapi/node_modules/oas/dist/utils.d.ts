import findSchemaDefinition from './lib/find-schema-definition';
declare const supportedMethods: Set<string>;
declare const _default: {
    findSchemaDefinition: typeof findSchemaDefinition;
    jsonSchemaTypes: Record<string, string>;
    matchesMimeType: {
        formUrlEncoded: (mimeType: string) => boolean;
        json: (contentType: string) => boolean;
        multipart: (contentType: string) => boolean;
        wildcard: (contentType: string) => boolean;
        xml: (contentType: string) => boolean;
    };
};
export default _default;
export { supportedMethods };
