import { getArticlesSlugId } from "@/utils/actions/api/get-articles-slugs-id";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { site_id: string } }) {
  const authorization = headers().get("X-Auth-Key");

  console.log('params', params); // This should log the parameters correctly

  try {
    const result = await clerkClient.users.getUser(authorization!);
    const response = await getArticlesSlugId(result?.id!, params?.site_id);
    console.log('response', response)

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
