"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readAllArticles = async (site_id: string) => {
  const cookieStore = cookies();

  // Initialize Supabase client
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
    // Fetch blog articles, including category and author details, using the userId from siteData
    const { data: articles, error: articleError } = await supabase
      .from("blog")
      .select("*, category(*), author(*)")
      .eq("published", true)
      .eq("site_id", site_id);

    if (articleError) {
      console.error("Error fetching articles:", articleError);
      throw articleError;
    }

    return articles;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred." };
  }
};
