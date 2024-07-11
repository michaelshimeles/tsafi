"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { addDomainToVercel } from "../vercel/add-domain";

export const changeSiteDomain = async (
  site_id: string,
  site_custom_domain: string
) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("sites")
      .update({
        site_custom_domain: site_custom_domain.toLowerCase(),
      })
      .eq("user_id", userId)
      .eq("site_id", site_id)
      .select();

    if (error?.code) {
      return {
        error,
      };
    }

    const [domainAdding, wwwDomainAdding] = await Promise.all([
      addDomainToVercel(site_custom_domain.toLowerCase()),
      addDomainToVercel(`www.${site_custom_domain.toLowerCase()}`),
    ]);

    revalidatePath("/cms/sites");

    // Fetch the verification records from Vercel
    const vercelDomainResponse = await fetch(
      `https://api.vercel.com/v9/projects/${
        process.env.PROJECT_ID_VERCEL
      }/domains/${site_custom_domain.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROJECT_ID_VERCEL}`,
        },
      }
    );

    const domainData = await vercelDomainResponse.json();
    console.log("domainData", domainData);

    return {
      domainAdding,
      wwwDomainAdding,
      verificationRecords: domainData.verification,
    };
  } catch (error: any) {
    return error;
  }
};
