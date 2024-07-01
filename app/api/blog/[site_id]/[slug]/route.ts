import { getArticleBySlugSiteId } from "@/utils/actions/api/get-article-by-slug-siteid";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { site_id: string; slug: string } }
) {
  const authorization = headers().get("X-Auth-Key");
  try {
    const result = await clerkClient.users.getUser(authorization!);
    const response = await getArticleBySlugSiteId(params?.site_id!, params?.slug!, result?.id);

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
