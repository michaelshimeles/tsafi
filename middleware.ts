import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { readSiteDomain } from "./utils/actions/sites/read-site-domain";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)", "/test"]);

// Main middleware function
export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected and enforce authentication if it is
  if (isProtectedRoute(req)) auth().protect();

  // Get the request URL and pathname
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Get hostname (e.g., 'vercel.com', 'test.vercel.app')
  const hostname = req.headers.get("host");

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    // In production, use the custom base domain from environment variables
    const baseDomain = process.env.BASE_DOMAIN;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    // In development, handle localhost case
    currentHost = hostname?.replace(`.localhost:3000`, "");
  }

  // If there's no currentHost, likely accessing the root domain, handle accordingly
  if (!currentHost) {
    console.log("No subdomain, serving root domain content");
    // Continue to the next middleware or serve the root content
    return NextResponse.next();
  }

  console.log("currentHost", currentHost);

  // Fetch tenant-specific data based on the subdomain
  const response = await readSiteDomain(currentHost);

  // Handle the case where no subdomain data is found
  if (!response || !response.length) {
    console.log("Subdomain not found, serving root domain content");
    // Continue to the next middleware or serve the root content
    return NextResponse.next();
  }

  // Get the tenant's subdomain from the response
  const tenantSubdomain = response[0]?.site_subdomain;

  if (tenantSubdomain) {
    return NextResponse.rewrite(new URL(`/${tenantSubdomain}${pathname}`, req.url));
  }


  // Rewrite the URL to the tenant-specific path
  return NextResponse.rewrite(
    new URL(
      tenantSubdomain === "/" ? "" : `cms.rasmic.xyz`,
      req.url
    )
  );
});

// Define which paths the middleware should run for
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
