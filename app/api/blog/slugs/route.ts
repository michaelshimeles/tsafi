import { getArticlesSlugApi } from "@/utils/actions/api/get-articles-slugs";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authorization = headers().get("X-Auth-Key");

  try {
    const result = await clerkClient.users.getUser(authorization!);
    const response = await getArticlesSlugApi(result?.id!);

    console.log('result', result)

    if (response?.error) {
      return NextResponse.json({
        status: 400,
        message: "error",
        error: response?.error,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "success",
      response,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 404,
      message: "failed",
      error: error?.errors?.[0]?.code,
    });
  }
}
