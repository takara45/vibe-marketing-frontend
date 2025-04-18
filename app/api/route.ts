import { NextResponse } from "next/server";

/**
 * GET handler for the API root
 * Returns basic API information and available endpoints
 */
export async function GET() {
  return NextResponse.json({
    name: "Advertising Management API",
    version: "1.0.0",
    status: "online",
    documentation: "/api/docs",
    endpoints: [
      "/api/campaigns",
      "/api/campaigns/:id",
      "/api/campaigns/:id/ad-groups",
      "/api/campaigns/:id/ad-groups/:adGroupId",
      "/api/campaigns/:id/ad-groups/:adGroupId/ads",
      "/api/analytics/reports",
      "/api/analytics/reports/:id",
      "/api/settings",
      "/api/webhooks",
    ],
  });
}
