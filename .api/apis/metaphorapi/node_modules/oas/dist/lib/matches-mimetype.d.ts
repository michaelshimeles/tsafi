declare const _default: {
    formUrlEncoded: (mimeType: string) => boolean;
    json: (contentType: string) => boolean;
    multipart: (contentType: string) => boolean;
    wildcard: (contentType: string) => boolean;
    xml: (contentType: string) => boolean;
};
export default _default;
