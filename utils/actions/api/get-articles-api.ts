"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getAllArticlesApi = async (userId: string) => {
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
    const result = await clerkClient.users.getUser(userId!);

    const { data, error } = await supabase
      .from("blog")
      .select("*, category(*), author(*)")
      .eq("user_id", result?.id)
      .eq("published", true);

    if (error?.code)
      return {
        error,
      };

    return data;
  } catch (error: any) {
    return error;
  }
};
