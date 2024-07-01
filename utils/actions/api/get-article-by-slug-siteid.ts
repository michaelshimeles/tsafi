"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getArticleBySlugSiteId = async (
  site_id: string,
  slug: string,
  userId: string
) => {
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
    const result = await clerkClient.users.getUser(userId!);

    const { data, error } = await supabase
      .from("blog")
      .select(
        `*,
      author (*),
      category (*)
      `
      )
      .eq("slug", slug)
      .eq("site_id", site_id)
      .eq("published", true)
      .eq("user_id", result?.id);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
