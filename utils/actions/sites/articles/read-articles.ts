"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readAllArticles = async (domain: string) => {
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
    // Fetch site data based on the subdomain
    const { data: siteData, error: siteError } = await supabase
      .from("sites")
      .select("user_id") // Select only the required fields
      .eq("site_subdomain", domain)
      .single();

    if (siteError) {
      console.error("Error fetching site data:", siteError);
      throw siteError;
    }

    // Fetch blog articles, including category and author details, using the userId from siteData
    const { data: articles, error: articleError } = await supabase
      .from("blog")
      .select("*, category(*), author(*)")
      .eq("user_id", siteData.user_id);

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
