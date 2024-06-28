import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const storeMessages = async (user_id: string, messages: any) => {
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
    const { data: existingChat, error: exisitingChatError } = await supabase
      .from("chat")
      .select("*")
      .eq("user_id", user_id);

    if (exisitingChatError?.code) return exisitingChatError;

    if (existingChat?.length! > 0) {
      const messagesArr = [...existingChat?.[0]?.messages, ...messages];

      const { data, error } = await supabase
        .from("chat")
        .update({ messages: messagesArr })
        .eq("user_id", user_id)
        .select("*");

      if (error?.code) return error;

      return data;
    }

    const { data, error } = await supabase
      .from("chat")
      .insert([
        {
          user_id,
          messages,
        },
      ])
      .select("*");

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
