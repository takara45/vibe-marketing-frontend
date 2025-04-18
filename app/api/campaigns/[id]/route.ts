import { NextRequest, NextResponse } from "next/server";

// Mock data for demonstration - in a real app, this would be in a database
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
 * GET handler for a specific campaign
 * Returns a campaign by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  return NextResponse.json({ data: campaign });
}

/**
 * PUT handler for a specific campaign
 * Updates a campaign by ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const campaignIndex = campaigns.findIndex((c) => c.id === params.id);

    if (campaignIndex === -1) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Update campaign
    const updatedCampaign = {
      ...campaigns[campaignIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    // In a real implementation, this would update a database
    campaigns[campaignIndex] = updatedCampaign;

    return NextResponse.json({ data: updatedCampaign });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * DELETE handler for a specific campaign
 * Deletes a campaign by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const campaignIndex = campaigns.findIndex((c) => c.id === params.id);

  if (campaignIndex === -1) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  // In a real implementation, this would delete from a database
  const deletedCampaign = campaigns[campaignIndex];
  campaigns.splice(campaignIndex, 1);

  return NextResponse.json(
    { data: deletedCampaign, message: "Campaign deleted successfully" },
    { status: 200 }
  );
}
