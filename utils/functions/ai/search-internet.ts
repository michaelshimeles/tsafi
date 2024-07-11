var myHeaders = new Headers();

export const searchInternet = async (query: string) => {
  myHeaders.append("X-API-KEY", process.env.SEARCH_API!);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    q: query,
  });

  const options = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const result = await fetch("https://google.serper.dev/search", options);

    const response = await result?.json();
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
