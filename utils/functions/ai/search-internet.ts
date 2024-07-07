export const searchInternet = async (query: string) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: `{"query":${query},"pageOptions":{"onlyMainContent":true,"fetchPageContent":true,"includeHtml":true,"includeRawHtml":true},"searchOptions":{"limit":123}}`,
  };

  try {
    const result = await fetch("https://api.firecrawl.dev/v0/search", options);
    const response = await result?.json();

    return response;
  } catch (error) {
    return error;
  }
};
