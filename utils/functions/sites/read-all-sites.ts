import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readAllSites = async () => {
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
      .from("sites")
      .select()
      .order('created_at', { ascending: false }); // Adjust the column name as per your table schema

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
