import { z } from "zod";

// Gemini API configuration from environment variables
const GEMINI_API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "DUMMY_API_KEY";
const GEMINI_API_URL =
  process.env.NEXT_PUBLIC_GEMINI_API_URL ||
  "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-pro";

// Schema for Gemini API request
const geminiRequestSchema = z.object({
  contents: z.array(
    z.object({
      parts: z.array(
        z.object({
          text: z.string(),
        })
      ),
    })
  ),
  generationConfig: z
    .object({
      temperature: z.number().optional(),
      topP: z.number().optional(),
      topK: z.number().optional(),
      maxOutputTokens: z.number().optional(),
    })
    .optional(),
});

// Schema for Gemini API response
const geminiResponseSchema = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(
          z.object({
            text: z.string(),
          })
        ),
      }),
    })
  ),
});

// Type definitions
export type GeminiRequest = z.infer<typeof geminiRequestSchema>;
export type GeminiResponse = z.infer<typeof geminiResponseSchema>;

/**
 * Base function to make requests to the Gemini API
 */
export async function callGeminiAPI(
  prompt: string,
  options?: {
    temperature?: number;
    maxOutputTokens?: number;
  }
): Promise<string> {
  const url = `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const request: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: options?.temperature || 0.7,
      maxOutputTokens: options?.maxOutputTokens || 1024,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const validatedData = geminiResponseSchema.parse(data);

    return validatedData.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error);
    console.error("Gemini API request parameters:", {
      prompt,
      options: options ? JSON.stringify(options) : undefined,
    });
    throw error;
  }
}

/**
 * Generate ad text based on product/service information and target audience
 */
export async function generateAdText(
  productInfo: string,
  targetAudience: string,
  adType: "headline" | "description" | "both" = "both"
): Promise<{ headlines?: string[]; descriptions?: string[] }> {
  let prompt = `Generate compelling ad text for the following product/service:
Product/Service: ${productInfo}
Target Audience: ${targetAudience}
`;

  if (adType === "headline" || adType === "both") {
    prompt += `\nCreate 3 engaging headlines (max 30 characters each) that highlight the key benefits.`;
  }

  if (adType === "description" || adType === "both") {
    prompt += `\nCreate 2 descriptive ad texts (max 90 characters each) that explain the value proposition.`;
  }

  prompt += `\nFormat the response as plain text with headlines and descriptions clearly labeled.`;

  const result = await callGeminiAPI(prompt, { temperature: 0.8 });

  // Parse the response to extract headlines and descriptions
  const headlines: string[] = [];
  const descriptions: string[] = [];

  const lines = result.split("\n");
  for (const line of lines) {
    if (line.toLowerCase().includes("headline") && line.includes(":")) {
      const headline = line.split(":")[1]?.trim();
      if (headline) headlines.push(headline);
    } else if (
      line.toLowerCase().includes("description") &&
      line.includes(":")
    ) {
      const description = line.split(":")[1]?.trim();
      if (description) descriptions.push(description);
    }
  }

  return {
    ...(adType === "headline" || adType === "both" ? { headlines } : {}),
    ...(adType === "description" || adType === "both" ? { descriptions } : {}),
  };
}

/**
 * Generate keyword suggestions based on product/service information
 */
export async function generateKeywordSuggestions(
  productInfo: string,
  targetAudience: string,
  competitorKeywords?: string[]
): Promise<string[]> {
  let prompt = `Generate a list of 15 relevant keywords and keyword phrases for Google Ads based on:
Product/Service: ${productInfo}
Target Audience: ${targetAudience}
`;

  if (competitorKeywords && competitorKeywords.length > 0) {
    prompt += `\nCompetitor Keywords: ${competitorKeywords.join(", ")}`;
  }

  prompt += `\nInclude a mix of:
- Broad match keywords
- Exact match keywords
- Long-tail keywords
- High commercial intent keywords

Format the response as a simple list with one keyword per line, without numbering or bullet points.`;

  const result = await callGeminiAPI(prompt, { temperature: 0.7 });

  // Parse the response to extract keywords
  return result
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 &&
        !line.startsWith("-") &&
        !line.toLowerCase().includes("keyword")
    );
}

/**
 * Analyze campaign performance and provide insights
 */
export async function analyzePerformance(campaignData: {
  name: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue?: number;
  };
  timeframe: string;
  targetAudience: string;
  previousPerformance?: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue?: number;
  };
}): Promise<{ insights: string[]; recommendations: string[] }> {
  const { name, metrics, timeframe, targetAudience, previousPerformance } =
    campaignData;

  // Calculate key performance indicators
  const ctr = (metrics.clicks / metrics.impressions) * 100;
  const cpc = metrics.cost / metrics.clicks;
  const conversionRate = (metrics.conversions / metrics.clicks) * 100;
  const costPerConversion = metrics.cost / metrics.conversions;
  const roi = metrics.revenue
    ? ((metrics.revenue - metrics.cost) / metrics.cost) * 100
    : undefined;

  let performanceComparison = "";
  if (previousPerformance) {
    const prevCtr =
      (previousPerformance.clicks / previousPerformance.impressions) * 100;
    const prevCpc = previousPerformance.cost / previousPerformance.clicks;
    const prevConversionRate =
      (previousPerformance.conversions / previousPerformance.clicks) * 100;
    const prevCostPerConversion =
      previousPerformance.cost / previousPerformance.conversions;
    const prevRoi = previousPerformance.revenue
      ? ((previousPerformance.revenue - previousPerformance.cost) /
          previousPerformance.cost) *
        100
      : undefined;

    performanceComparison = `
Previous Performance Comparison:
- CTR: ${prevCtr.toFixed(2)}% (${ctr > prevCtr ? "+" : ""}${(
      ctr - prevCtr
    ).toFixed(2)}%)
- CPC: $${prevCpc.toFixed(2)} (${cpc < prevCpc ? "-" : "+"}${Math.abs(
      cpc - prevCpc
    ).toFixed(2)})
- Conversion Rate: ${prevConversionRate.toFixed(2)}% (${
      conversionRate > prevConversionRate ? "+" : ""
    }${(conversionRate - prevConversionRate).toFixed(2)}%)
- Cost Per Conversion: $${prevCostPerConversion.toFixed(2)} (${
      costPerConversion < prevCostPerConversion ? "-" : "+"
    }${Math.abs(costPerConversion - prevCostPerConversion).toFixed(2)})
${
  roi !== undefined && prevRoi !== undefined
    ? `- ROI: ${prevRoi.toFixed(2)}% (${roi > prevRoi ? "+" : ""}${(
        roi - prevRoi
      ).toFixed(2)}%)`
    : ""
}
`;
  }

  const prompt = `Analyze the following Google Ads campaign performance data and provide insights and recommendations:

Campaign: ${name}
Timeframe: ${timeframe}
Target Audience: ${targetAudience}

Current Performance:
- Impressions: ${metrics.impressions}
- Clicks: ${metrics.clicks}
- Conversions: ${metrics.conversions}
- Cost: $${metrics.cost.toFixed(2)}
${metrics.revenue ? `- Revenue: $${metrics.revenue.toFixed(2)}` : ""}
- CTR: ${ctr.toFixed(2)}%
- CPC: $${cpc.toFixed(2)}
- Conversion Rate: ${conversionRate.toFixed(2)}%
- Cost Per Conversion: $${costPerConversion.toFixed(2)}
${roi !== undefined ? `- ROI: ${roi.toFixed(2)}%` : ""}
${performanceComparison}

Provide:
1. 3-5 key insights about the campaign performance
2. 3-5 specific recommendations to improve performance

Format your response with clearly separated sections for Insights and Recommendations.`;

  const result = await callGeminiAPI(prompt, { temperature: 0.4 });

  // Parse the response to extract insights and recommendations
  const insights: string[] = [];
  const recommendations: string[] = [];

  let currentSection: "insights" | "recommendations" | null = null;

  const lines = result.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.toLowerCase().includes("insight")) {
      currentSection = "insights";
      continue;
    } else if (trimmedLine.toLowerCase().includes("recommendation")) {
      currentSection = "recommendations";
      continue;
    }

    if (
      (currentSection && trimmedLine.startsWith("-")) ||
      /^\d+\./.test(trimmedLine)
    ) {
      const content = trimmedLine.replace(/^-|\d+\.\s*/, "").trim();
      if (content) {
        if (currentSection === "insights") {
          insights.push(content);
        } else if (currentSection === "recommendations") {
          recommendations.push(content);
        }
      }
    }
  }

  return { insights, recommendations };
}

/**
 * Generate optimization suggestions for a campaign
 */
export async function generateOptimizationSuggestions(campaignData: {
  name: string;
  budget: number;
  bidStrategy: string;
  keywords: Array<{
    keyword: string;
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
  }>;
  adGroups: Array<{
    name: string;
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
  }>;
  targeting: {
    locations: string[];
    devices: string[];
    demographics: string[];
  };
  goals: {
    primary: string;
    target?: number;
  };
}): Promise<{
  budgetRecommendations: string[];
  keywordRecommendations: string[];
  targetingRecommendations: string[];
  structureRecommendations: string[];
}> {
  const { name, budget, bidStrategy, keywords, adGroups, targeting, goals } =
    campaignData;

  // Sort keywords by performance (using conversions or clicks)
  const sortedKeywords = [...keywords].sort((a, b) => {
    if (a.conversions !== b.conversions) return b.conversions - a.conversions;
    return b.clicks - a.clicks;
  });

  // Sort ad groups by performance
  const sortedAdGroups = [...adGroups].sort((a, b) => {
    if (a.conversions !== b.conversions) return b.conversions - a.conversions;
    return b.clicks - a.clicks;
  });

  const prompt = `Generate optimization suggestions for the following Google Ads campaign:

Campaign: ${name}
Budget: $${budget} per day
Bid Strategy: ${bidStrategy}
Primary Goal: ${goals.primary}${
    goals.target ? ` (Target: ${goals.target})` : ""
  }

Top Keywords by Performance:
${sortedKeywords
  .slice(0, 5)
  .map(
    (k) =>
      `- "${k.keyword}": Impressions: ${k.impressions}, Clicks: ${
        k.clicks
      }, Conversions: ${k.conversions}, Cost: $${k.cost.toFixed(2)}`
  )
  .join("\n")}

Bottom Keywords by Performance:
${sortedKeywords
  .slice(-5)
  .map(
    (k) =>
      `- "${k.keyword}": Impressions: ${k.impressions}, Clicks: ${
        k.clicks
      }, Conversions: ${k.conversions}, Cost: $${k.cost.toFixed(2)}`
  )
  .join("\n")}

Ad Groups:
${sortedAdGroups
  .map(
    (ag) =>
      `- "${ag.name}": Impressions: ${ag.impressions}, Clicks: ${
        ag.clicks
      }, Conversions: ${ag.conversions}, Cost: $${ag.cost.toFixed(2)}`
  )
  .join("\n")}

Targeting:
- Locations: ${targeting.locations.join(", ")}
- Devices: ${targeting.devices.join(", ")}
- Demographics: ${targeting.demographics.join(", ")}

Provide specific optimization suggestions in the following categories:
1. Budget Allocation (3 suggestions)
2. Keyword Optimization (3 suggestions)
3. Targeting Refinements (3 suggestions)
4. Campaign Structure Improvements (3 suggestions)

Format your response with clearly separated sections for each category.`;

  const result = await callGeminiAPI(prompt, { temperature: 0.4 });

  // Parse the response to extract different types of recommendations
  const budgetRecommendations: string[] = [];
  const keywordRecommendations: string[] = [];
  const targetingRecommendations: string[] = [];
  const structureRecommendations: string[] = [];

  let currentSection: "budget" | "keyword" | "targeting" | "structure" | null =
    null;

  const lines = result.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.toLowerCase().includes("budget")) {
      currentSection = "budget";
      continue;
    } else if (trimmedLine.toLowerCase().includes("keyword")) {
      currentSection = "keyword";
      continue;
    } else if (trimmedLine.toLowerCase().includes("targeting")) {
      currentSection = "targeting";
      continue;
    } else if (
      trimmedLine.toLowerCase().includes("structure") ||
      trimmedLine.toLowerCase().includes("campaign structure")
    ) {
      currentSection = "structure";
      continue;
    }

    if (
      currentSection &&
      (trimmedLine.startsWith("-") || /^\d+\./.test(trimmedLine))
    ) {
      const content = trimmedLine.replace(/^-|\d+\.\s*/, "").trim();
      if (content) {
        if (currentSection === "budget") {
          budgetRecommendations.push(content);
        } else if (currentSection === "keyword") {
          keywordRecommendations.push(content);
        } else if (currentSection === "targeting") {
          targetingRecommendations.push(content);
        } else if (currentSection === "structure") {
          structureRecommendations.push(content);
        }
      }
    }
  }

  return {
    budgetRecommendations,
    keywordRecommendations,
    targetingRecommendations,
    structureRecommendations,
  };
}
