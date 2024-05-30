import { readSiteDomain } from "@/utils/actions/sites/read-site-domain";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { NavBar } from "./_components/NavBar";
import Head from "next/head";

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const result = await readSiteDomain(params?.domain);

  if (!result) {
    notFound();
  }

  const siteName = result?.[0]?.site_name;
  const siteDescription = result?.[0]?.site_description;
  const siteLogo = result?.[0]?.site_logo;
  const siteCover = result?.[0]?.site_cover_image;

  return (
    <>
      <head>
        <title>{siteName}</title>
        <meta name="site_name" content={siteName} />
        <meta name="description" content={siteDescription} />
        <meta name="image" content={siteCover} />
        <meta name="url" content={params?.domain + "." + process.env.BASE_DOMAIN}></meta>
        <link rel="icon" href={siteLogo} />
      </head >
      <body>

        <NavBar
          title={siteName}
          description={siteDescription}
          logo={siteLogo}
        />
        <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
          {children}
        </main>
      </body>
    </>
  );
}
