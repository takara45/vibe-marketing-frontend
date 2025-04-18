import { NextRequest, NextResponse } from "next/server";

// Mock data for demonstration
const campaigns = [
  {
    id: "1",
    name: "Summer Sale 2025",
    status: "active",
    budget: 5000,
    dailyBudget: 250,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    platform: "google",
    objective: "conversions",
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Product Launch",
    status: "paused",
    budget: 10000,
    dailyBudget: 500,
    startDate: "2025-07-15",
    endDate: "2025-09-15",
    platform: "google",
    objective: "awareness",
    createdAt: "2025-06-20T14:45:00Z",
    updatedAt: "2025-06-25T09:15:00Z",
  },
];

/**
 * GET handler for campaigns
 * Returns a list of campaigns with optional filtering
 */
export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const platform = searchParams.get("platform");

  // Apply filters if provided
  let filteredCampaigns = [...campaigns];

  if (status) {
    filteredCampaigns = filteredCampaigns.filter(
      (campaign) => campaign.status === status
    );
  }

  if (platform) {
    filteredCampaigns = filteredCampaigns.filter(
      (campaign) => campaign.platform === platform
    );
  }

  return NextResponse.json({
    data: filteredCampaigns,
    meta: {
      total: filteredCampaigns.length,
      page: 1,
      limit: 10,
    },
  });
}

/**
 * POST handler for campaigns
 * Creates a new campaign
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "budget",
      "dailyBudget",
      "startDate",
      "platform",
      "objective",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new campaign
    const newCampaign = {
      id: (campaigns.length + 1).toString(),
      status: "draft",
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real implementation, this would save to a database
    campaigns.push(newCampaign);

    return NextResponse.json({ data: newCampaign }, { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
