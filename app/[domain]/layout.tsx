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
      <Head>
        <title>{siteName}</title>
        <meta property="og:site_name" content={siteName} />
        <meta property="description" content={siteDescription} />
        <meta property="og:image" content={siteCover} />
        <meta property="og:url" content={params?.domain + "." + process.env.BASE_DOMAIN}></meta>
        <link rel="icon" href={siteLogo} />
      </Head >
      <NavBar
        title={siteName}
        description={siteDescription}
        logo={siteLogo}
      />
      <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
        {children}
      </main>
    </>
  );
}
