"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const storeArticles = async (
  title: string,
  subtitle: string,
  slug: string,
  blog: string,
  author_id: string,
  category_id: string,
  keywords: string,
  image: string,
  image_alt: string,
  site_id: string
) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const cookieStore = cookies();

  const keywordArray = keywords?.split(",");

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
      .from("blog")
      .insert([
        {
          title,
          subtitle,
          slug,
          blog_html: blog,
          category_id,
          author_id,
          keywords: keywordArray,
          image,
          image_alt,
          user_id: userId,
          site_id,
        },
      ])
      .select();

    if (error?.code) return error;

    revalidatePath("/cms");

    return data;
  } catch (error: any) {
    return error;
  }
};
