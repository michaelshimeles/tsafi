declare const FindSimilar: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["url"];
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "The url for which you would like to find similar links";
                readonly examples: readonly ["https://slatestarcodex.com/2014/07/30/meditations-on-moloch/"];
            };
            readonly numResults: {
                readonly type: "integer";
                readonly description: "Number of search results to return. Default 10. Max 10 for basic plans. Up to thousands for custom plans.";
                readonly examples: readonly [10];
            };
            readonly includeDomains: {
                readonly type: "array";
                readonly description: "List of domains to include in the search. If specified, results will only come from these domains.";
                readonly items: {
                    readonly type: "string";
                };
                readonly examples: readonly ["example.com", "sample.net"];
            };
            readonly excludeDomains: {
                readonly type: "array";
                readonly description: "List of domains to exclude in the search. If specified, results will not include any from these domains.";
                readonly items: {
                    readonly type: "string";
                };
                readonly examples: readonly ["excludedomain.com", "excludeme.net"];
            };
            readonly startCrawlDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Crawl date refers to the date that Exa discovered a link. Results will include links that were crawled after this date. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-01-01T00:00:00.000Z"];
            };
            readonly endCrawlDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Crawl date refers to the date that Exa discovered a link. Results will include links that were crawled before this date. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-12-31T00:00:00.000Z"];
            };
            readonly startPublishedDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Only links with a published date after this will be returned. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-01-01T00:00:00.000Z"];
            };
            readonly endPublishedDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Only links with a published date before this will be returned. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-12-31T00:00:00.000Z"];
            };
            readonly category: {
                readonly type: "string";
                readonly enum: readonly ["company", "research paper", "news", "github", "tweet", "movie", "song", "personal site", "pdf"];
                readonly description: "(beta) A data category to focus on, with higher comprehensivity and data cleanliness. Categories right now include company, research paper, news, github, tweet, movie, song, personal site, and pdf";
            };
            readonly contents: {
                readonly type: "object";
                readonly properties: {
                    readonly text: {
                        readonly type: "object";
                        readonly description: "Parsed contents of the page.";
                        readonly properties: {
                            readonly maxCharacters: {
                                readonly type: "integer";
                                readonly description: "Max length in characters for the text returned";
                            };
                            readonly includeHtmlTags: {
                                readonly type: "boolean";
                                readonly description: "Whether HTML tags, which can help the LLM understand structure of text, should be included. Default false";
                            };
                        };
                    };
                    readonly highlights: {
                        readonly type: "object";
                        readonly description: "Relevant extract(s) from the webpage.";
                        readonly properties: {
                            readonly numSentences: {
                                readonly type: "integer";
                                readonly description: "The number of sentences to be returned in each snippet. Default 5";
                            };
                            readonly highlightsPerUrl: {
                                readonly type: "integer";
                                readonly description: "The number of snippets to return per page. Default 1";
                            };
                            readonly query: {
                                readonly type: "string";
                                readonly description: "If specified, targets snippets most relevant to the query. In search, defaults to the search query.";
                            };
                        };
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly description: "A list of search results containing title, URL, published date, author, and score.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly title: {
                                readonly type: "string";
                                readonly description: "The title of the search result.";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "The URL of the search result.";
                            };
                            readonly publishedDate: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "An estimate of the creation date, from parsing HTML content. Format is YYYY-MM-DD.";
                            };
                            readonly author: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "If available, the author of the content.";
                            };
                            readonly score: {
                                readonly type: readonly ["number", "null"];
                                readonly description: "A number from 0 to 1 representing similarity between the query/url and the result.";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The temporary ID for the document. Useful for /contents endpoint.";
                            };
                            readonly text: {
                                readonly type: "string";
                                readonly description: "The full content text of the search result.";
                            };
                            readonly highlights: {
                                readonly type: "array";
                                readonly description: "Array of highlights extracted from the search result content.";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly highlightScores: {
                                readonly type: "array";
                                readonly description: "Array of cosine similarity scores for each highlighted";
                                readonly items: {
                                    readonly type: "number";
                                    readonly format: "float";
                                    readonly minimum: -3.402823669209385e+38;
                                    readonly maximum: 3.402823669209385e+38;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetContents: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["ids"];
        readonly properties: {
            readonly ids: {
                readonly type: "array";
                readonly description: "Array of document IDs obtained from searches";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly text: {
                readonly type: "object";
                readonly description: "Parsed contents of the page.";
                readonly properties: {
                    readonly maxCharacters: {
                        readonly type: "integer";
                        readonly description: "Max length in characters for the text returned";
                    };
                    readonly includeHtmlTags: {
                        readonly type: "boolean";
                        readonly description: "Whether HTML tags, which can help the LLM understand structure of text, should be included. Default false";
                    };
                };
            };
            readonly highlights: {
                readonly type: "object";
                readonly description: "Relevant extract(s) from the webpage.";
                readonly properties: {
                    readonly numSentences: {
                        readonly type: "integer";
                        readonly description: "The number of sentences to be returned in each snippet. Default 5";
                    };
                    readonly highlightsPerUrl: {
                        readonly type: "integer";
                        readonly description: "The number of snippets to return per page. Default 1";
                    };
                    readonly query: {
                        readonly type: "string";
                        readonly description: "If specified, targets snippets most relevant to the query. In search, defaults to the search query.";
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly title: {
                                readonly type: "string";
                                readonly description: "The title of the search result.";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "The URL of the search result.";
                            };
                            readonly publishedDate: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "An estimate of the creation date, from parsing HTML content. Format is YYYY-MM-DD.";
                            };
                            readonly author: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "If available, the author of the content.";
                            };
                            readonly score: {
                                readonly type: readonly ["number", "null"];
                                readonly description: "A number from 0 to 1 representing similarity between the query/url and the result.";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The temporary ID for the document. Useful for /contents endpoint.";
                            };
                            readonly text: {
                                readonly type: "string";
                                readonly description: "The full content text of the search result.";
                            };
                            readonly highlights: {
                                readonly type: "array";
                                readonly description: "Array of highlights extracted from the search result content.";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly highlightScores: {
                                readonly type: "array";
                                readonly description: "Array of cosine similarity scores for each highlighted";
                                readonly items: {
                                    readonly type: "number";
                                    readonly format: "float";
                                    readonly minimum: -3.402823669209385e+38;
                                    readonly maximum: 3.402823669209385e+38;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Search: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["query"];
        readonly properties: {
            readonly query: {
                readonly type: "string";
                readonly description: "The query string.";
                readonly examples: readonly ["Here is an article about the state of search:"];
            };
            readonly useAutoprompt: {
                readonly type: "boolean";
                readonly description: "If true, your query will be converted to a Exa query. Default false.";
            };
            readonly type: {
                readonly type: "string";
                readonly description: "The Type of search, 'keyword', 'neural', or 'magic' (decides between keyword and neural). Default neural.";
            };
            readonly numResults: {
                readonly type: "integer";
                readonly description: "Number of search results to return. Default 10. Max 10 for basic plans. Up to thousands for custom plans.";
                readonly examples: readonly [10];
            };
            readonly includeDomains: {
                readonly type: "array";
                readonly description: "List of domains to include in the search. If specified, results will only come from these domains.";
                readonly items: {
                    readonly type: "string";
                };
                readonly examples: readonly ["example.com", "sample.net"];
            };
            readonly excludeDomains: {
                readonly type: "array";
                readonly description: "List of domains to exclude in the search. If specified, results will not include any from these domains.";
                readonly items: {
                    readonly type: "string";
                };
                readonly examples: readonly ["excludedomain.com", "excludeme.net"];
            };
            readonly startCrawlDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Crawl date refers to the date that Exa discovered a link. Results will include links that were crawled after this date. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-01-01T00:00:00.000Z"];
            };
            readonly endCrawlDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Crawl date refers to the date that Exa discovered a link. Results will include links that were crawled before this date. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-12-31T00:00:00.000Z"];
            };
            readonly startPublishedDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Only links with a published date after this will be returned. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-01-01T00:00:00.000Z"];
            };
            readonly endPublishedDate: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Only links with a published date before this will be returned. Must be specified in ISO 8601 format.";
                readonly examples: readonly ["2023-12-31T00:00:00.000Z"];
            };
            readonly category: {
                readonly type: "string";
                readonly enum: readonly ["company", "research paper", "news", "github", "tweet", "movie", "song", "personal site", "pdf"];
                readonly description: "(beta) A data category to focus on, with higher comprehensivity and data cleanliness. Categories right now include company, research paper, news, github, tweet, movie, song, personal site, and pdf";
            };
            readonly contents: {
                readonly type: "object";
                readonly properties: {
                    readonly text: {
                        readonly type: "object";
                        readonly description: "Parsed contents of the page.";
                        readonly properties: {
                            readonly maxCharacters: {
                                readonly type: "integer";
                                readonly description: "Max length in characters for the text returned";
                            };
                            readonly includeHtmlTags: {
                                readonly type: "boolean";
                                readonly description: "Whether HTML tags, which can help the LLM understand structure of text, should be included. Default false";
                            };
                        };
                    };
                    readonly highlights: {
                        readonly type: "object";
                        readonly description: "Relevant extract(s) from the webpage.";
                        readonly properties: {
                            readonly numSentences: {
                                readonly type: "integer";
                                readonly description: "The number of sentences to be returned in each snippet. Default 5";
                            };
                            readonly highlightsPerUrl: {
                                readonly type: "integer";
                                readonly description: "The number of snippets to return per page. Default 1";
                            };
                            readonly query: {
                                readonly type: "string";
                                readonly description: "If specified, targets snippets most relevant to the query. In search, defaults to the search query.";
                            };
                        };
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly description: "A list of search results containing title, URL, published date, author, and score.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly title: {
                                readonly type: "string";
                                readonly description: "The title of the search result.";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "The URL of the search result.";
                            };
                            readonly publishedDate: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "An estimate of the creation date, from parsing HTML content. Format is YYYY-MM-DD.";
                            };
                            readonly author: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "If available, the author of the content.";
                            };
                            readonly score: {
                                readonly type: readonly ["number", "null"];
                                readonly description: "A number from 0 to 1 representing similarity between the query/url and the result.";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The temporary ID for the document. Useful for /contents endpoint.";
                            };
                            readonly text: {
                                readonly type: "string";
                                readonly description: "The full content text of the search result.";
                            };
                            readonly highlights: {
                                readonly type: "array";
                                readonly description: "Array of highlights extracted from the search result content.";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly highlightScores: {
                                readonly type: "array";
                                readonly description: "Array of cosine similarity scores for each highlighted";
                                readonly items: {
                                    readonly type: "number";
                                    readonly format: "float";
                                    readonly minimum: -3.402823669209385e+38;
                                    readonly maximum: 3.402823669209385e+38;
                                };
                            };
                        };
                    };
                };
                readonly autopromptString: {
                    readonly type: "string";
                    readonly description: "The Exa query created by the autoprompt functionality.";
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { FindSimilar, GetContents, Search };
