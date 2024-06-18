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
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
        site_custom_domain: site_custom_domain.toLocaleLowerCase(),
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
      addDomainToVercel(site_custom_domain.toLocaleLowerCase()),
      addDomainToVercel(`www.${site_custom_domain.toLocaleLowerCase()}`),
    ]);

    revalidatePath("/cms/sites");

    return {
      domainAdding,
      wwwDomainAdding,
    };
  } catch (error: any) {
    return error;
  }
};
