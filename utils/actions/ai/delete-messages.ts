"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteMessages = async () => {
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
      .from("chat")
      .update({ messages: [] })
      .eq("user_id", userId)
      .select("*");

    console.log("fired");

    revalidatePath(`/cms/ai`);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
