"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Define a custom validation regex for subdomain
const subdomainRegex = /^[a-zA-Z0-9-]+$/;

export const changeSiteSubdomain = async (site_id: string, site_subdomain: string) => {
  if (site_subdomain.toLocaleLowerCase() === "www") {
    return {
      message: "Not allowed to use www as a subdomain"
    };
  }

  // Validate the subdomain
  if (!subdomainRegex.test(site_subdomain)) {
    return {
      message: "Subdomain must only contain alphanumeric characters or hyphens, and must not contain '.', '#', or '$'",
    };
  }

  if (site_subdomain.length < 1 || site_subdomain.length > 63) {
    return {
      message: "Subdomain must be between 1 and 63 characters",
    };
  }

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
        site_subdomain: site_subdomain.toLocaleLowerCase(),
      })
      .eq("user_id", userId)
      .eq("site_id", site_id)
      .select();

    if (error?.code) {
      return {
        error,
      };
    }
    revalidatePath("/cms/sites");

    return data;
  } catch (error: any) {
    return error;
  }
};
