"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateArticle = async (slug: string, blog: string) => {
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
      .from("blog")
      .update([
        {
          blog_html: blog,
        },
      ])
      .eq("user_id", userId)
      .eq("slug", slug)
      .select();

    if (error?.code) return error;

    revalidatePath("/cms");

    return data;
  } catch (error: any) {
    return error;
  }
};
