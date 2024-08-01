import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { readSiteDomain } from "./utils/actions/sites/read-site-domain";
// import { readSiteDomain } from "./utils/actions/sites/read-site-domain";

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

// Main middleware function
export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected and enforce authentication if it is
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl;
  const pathname = url.pathname;

  // Get hostname (e.g., 'mike.com', 'test.mike.com')
  const hostname = req.headers.get("host");

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    // Production logic remains the same
    const baseDomain = process.env.BASE_DOMAIN;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    // Updated development logic
    currentHost = hostname?.split(":")[0].replace(".localhost", "");
  }
  // If there's no currentHost, likely accessing the root domain, handle accordingly
  if (!currentHost) {
    // Continue to the next middleware or serve the root content
    return NextResponse.next();
  }

  // Fetch tenant-specific data based on the hostname
  const response = await readSiteDomain(currentHost);

  // Handle the case where no domain data is found
  if (!response || !response.length) {
    // Continue to the next middleware or serve the root content
    return NextResponse.next();
  }

  const site_id = response[0]?.site_id;
  const tenantSubdomain = response[0]?.site_subdomain;
  const mainDomain = response[0]?.site_custom_domain;

  // Determine which domain to use for rewriting
  const rewriteDomain = tenantSubdomain // || mainDomain;

  console.log("Hostname:", hostname);
  console.log("Current Host:", currentHost);
  console.log("Rewrite Domain:", rewriteDomain);

  if (rewriteDomain) {
    // Rewrite the URL to the tenant-specific path, using the site_id
    return NextResponse.rewrite(new URL(`/${site_id}${pathname}`, req.url));
  }

  // If no rewrite domain is found, continue to the next middleware
  return NextResponse.next();
});

// Define which paths the middleware should run for
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
