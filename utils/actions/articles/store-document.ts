"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const storeDocument = async (
  title: string,
  blog: string,
  id: string,
  site_id: string
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
      .from("documents")
      .update([{ title, document: blog }])
      .eq("document_id", id)
      .eq("site_id", site_id)
      .eq("user_id", userId)
      .select();

    if (error?.code) return error;

    revalidatePath("/cms/documents");

    return data;
  } catch (error: any) {
    return error;
  }
};
