"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const userCreate = async ({
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
      .insert([{ email, first_name, last_name, profile_image_url, user_id }])
      .select();

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
