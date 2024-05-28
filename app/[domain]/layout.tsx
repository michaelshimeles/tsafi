import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { readAllArticles } from "@/utils/actions/sites/articles/read-articles";
import { readSiteDomain } from "@/utils/actions/sites/read-site-domain";
import { NavBar } from "./_components/NavBar";


export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  // const domain = decodeURIComponent(params.domain);
  // const data = await getSiteData(domain);

  // if (!data) {
  //   notFound();
  // }

  // // Optional: Redirect to custom domain if it exists
  // if (
  //   domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
  //   data.customDomain &&
  //   process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  // ) {
  //   return redirect(`https://${data.customDomain}`);
  // }
  const result = await readSiteDomain(params?.domain)


  return (
    <>
      <NavBar title={result?.[0]?.site_name} description={result?.[0]?.site_description} logo={result?.[0]?.site_logo} />
        <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
          {children}
        </main>
    </>
  );
}