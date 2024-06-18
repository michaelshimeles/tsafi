export const addDomainToVercel = async (domain: string) => {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${
      process.env.PROJECT_ID_VERCEL
    }/domains${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: domain,
        // Optional: Redirect www. to root domain
        // ...(domain.startsWith("www.") && {
        //   redirect: domain.replace("www.", ""),
        // }),
      }),
    }
  ).then(async (res) => res.json());

  return response;
};
