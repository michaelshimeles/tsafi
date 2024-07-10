var myHeaders = new Headers();

export const searchInternet = async (query: string) => {
  myHeaders.append("X-API-KEY", "b6d711f177a2c08817b0442d235f62e2c64a2b62");
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

    const response = await result?.json()
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }

  // fetch("https://google.serper.dev/search", options)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
};
