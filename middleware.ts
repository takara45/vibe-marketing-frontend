import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiMiddleware } from "./app/api/middleware";

/**
 * Middleware configuration
 * Applies middleware to specific paths
 */
export function middleware(request: NextRequest) {
  // Apply API middleware to all /api routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    return apiMiddleware(request);
  }

  // Continue for non-API routes
  return NextResponse.next();
}

/**
 * Configure which paths this middleware is run on
 */
export const config = {
  matcher: [
    // Apply to all API routes
    "/api/:path*",
  ],
};
