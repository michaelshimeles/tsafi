"use server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: {
  email: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  user_id: string;
}) => {
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
      .from("user")
      .update([{ email, first_name, last_name, profile_image_url, user_id }])
      .eq("user_id", user_id);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
