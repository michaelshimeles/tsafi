import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/cms(.*)", "/test"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  // Attach tenant information to the URL
  url.searchParams.set('tenant', subdomain);

  return NextResponse.rewrite(url);

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
