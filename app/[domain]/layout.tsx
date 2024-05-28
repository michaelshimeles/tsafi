import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";


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

  return (
    <main className="flex min-w-screen flex-col items-center justify-between mt-[5rem]">
      <div className="flex flex-col mt-[1rem] justify-center items-center w-[90%]">
        <div className='flex flex-col items-center p-3 w-full'>
          <div className='flex flex-col justify-start items-center gap-2 w-full'>
            <div className='flex gap-3 justify-start items-center w-full'>
              <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
                CMS Site
              </h1>
            </div>
            <div className='flex gap-3 justify-start items-center w-full border-b pb-4'>
              <p className="text-gray-500">
                Building a multi tenant website is difficult
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}