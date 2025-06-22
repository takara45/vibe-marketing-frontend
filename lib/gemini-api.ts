import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

// Gemini API configuration from environment variables
const GEMINI_API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "DUMMY_API_KEY";
const GEMINI_MODEL =
  process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash-live-001";

// Initialize the Google Generative AI client
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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
  try {
    console.log(
      "Calling Gemini API with prompt:",
      prompt.substring(0, 100) + "..."
    );
    console.log("Using model:", GEMINI_MODEL);
    console.log("Using API key:", GEMINI_API_KEY ? "Set" : "Not set");

    // Use the correct API method for @google/genai v0.14.1
    const model = GEMINI_MODEL;

    const result = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: options?.temperature || 0.7,
        maxOutputTokens: options?.maxOutputTokens || 1024,
      },
    });

    console.log("Gemini API raw response:", result);

    // Extract text from the response
    const text = result.text || "";

    console.log("Extracted text:", text);

    if (!text || text.trim() === "") {
      throw new Error("Empty response from Gemini API");
    }

    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    console.error("Gemini API request parameters:", {
      prompt: prompt.substring(0, 200) + "...",
      model: GEMINI_MODEL,
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
  adType: "headline" | "description" | "responsePart" | "both" = "both"
): Promise<{
  headlines?: string[];
  descriptions?: string[];
  responseParts?: string[];
}> {
  let prompt = `You are an expert copywriter creating Google Ads content. Generate compelling ad text for the following:

Product/Service: ${productInfo}
Target Audience: ${targetAudience}

Please provide the content in the exact format below:`;

  if (adType === "headline" || adType === "both") {
    prompt += `

HEADLINES:
1. [First headline - max 30 characters]
2. [Second headline - max 30 characters]  
3. [Third headline - max 30 characters]`;
  }

  if (adType === "description" || adType === "both") {
    prompt += `

DESCRIPTIONS:
1. [First description - max 90 characters]
2. [Second description - max 90 characters]`;
  }

  if (adType === "responsePart" || adType === "both") {
    prompt += `

RESPONSE PARTS:
1. [First response part - max 60 characters]
2. [Second response part - max 60 characters]`;
  }

  prompt += `

Important: 
- Use the exact section headers shown above (HEADLINES:, DESCRIPTIONS:, RESPONSE PARTS:)
- Each line should start with a number and period
- Keep within character limits
- Make content compelling and relevant to the target audience
- Do not include any additional text or explanations`;

  const result = await callGeminiAPI(prompt, { temperature: 0.8 });

  console.log("Raw AI response for parsing:", result);

  // Parse the response to extract headlines and descriptions
  const headlines: string[] = [];
  const descriptions: string[] = [];
  const responseParts: string[] = [];

  const lines = result.split("\n");
  let currentSection: "headlines" | "descriptions" | "responseParts" | null =
    null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const lowerLine = trimmedLine.toLowerCase();

    // Detect section headers (exact matches from our prompt)
    if (lowerLine === "headlines:") {
      currentSection = "headlines";
      continue;
    } else if (lowerLine === "descriptions:") {
      currentSection = "descriptions";
      continue;
    } else if (lowerLine === "response parts:") {
      currentSection = "responseParts";
      continue;
    }

    // Also handle variations in case AI doesn't follow exact format
    if (
      lowerLine.includes("headline") &&
      (lowerLine.includes(":") || lowerLine.includes("s:"))
    ) {
      currentSection = "headlines";
      continue;
    } else if (
      lowerLine.includes("description") &&
      (lowerLine.includes(":") || lowerLine.includes("s:"))
    ) {
      currentSection = "descriptions";
      continue;
    } else if (lowerLine.includes("response part") && lowerLine.includes(":")) {
      currentSection = "responseParts";
      continue;
    }

    // Extract content based on current section
    if (currentSection && trimmedLine.length > 0) {
      let content = trimmedLine;

      // Remove numbering (1., 2., etc.) and bullet points
      content = content.replace(/^\d+\.\s*/, "").replace(/^[-*•]\s*/, "");

      // Handle colon-separated format
      if (content.includes(":") && !content.startsWith("http")) {
        const parts = content.split(":");
        if (parts.length === 2) {
          content = parts[1].trim();
        }
      }

      // Remove quotes
      content = content.replace(/^["']|["']$/g, "").trim();

      // Minimum length check and avoid common non-content lines
      if (
        content &&
        content.length > 3 &&
        !lowerLine.includes("example") &&
        !lowerLine.includes("note:")
      ) {
        if (currentSection === "headlines" && content.length <= 30) {
          headlines.push(content);
        } else if (currentSection === "descriptions" && content.length <= 90) {
          descriptions.push(content);
        } else if (currentSection === "responseParts" && content.length <= 60) {
          responseParts.push(content);
        }
      }
    }
  }

  console.log("Parsed headlines:", headlines);
  console.log("Parsed descriptions:", descriptions);
  console.log("Parsed response parts:", responseParts);

  return {
    ...(adType === "headline" || adType === "both" ? { headlines } : {}),
    ...(adType === "description" || adType === "both" ? { descriptions } : {}),
    ...(adType === "responsePart" || adType === "both"
      ? { responseParts }
      : {}),
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

/**
 * Generate response part advertisements based on product/service information and target audience
 * @param productInfo Information about the product or service
 * @param targetAudience Description of the target audience
 * @param options Additional options for generation
 * @returns Generated response part advertisements
 */
export async function generateResponsePartAds(
  productInfo: string,
  targetAudience: string,
  options?: {
    keywords?: string[];
    tone?: string;
  }
): Promise<string[]> {
  let prompt = `Generate compelling response part advertisements for the following product/service:
Product/Service: ${productInfo}
Target Audience: ${targetAudience}
`;

  if (options?.keywords && options.keywords.length > 0) {
    prompt += `\nKeywords to include: ${options.keywords.join(", ")}`;
  }

  if (options?.tone) {
    prompt += `\nTone: ${options.tone}`;
  }

  prompt += `\nCreate 3-5 response part advertisements (max 60 characters each) that encourage user interaction or response.
Format the response as a simple list with one response part per line, without numbering or bullet points.`;

  const result = await callGeminiAPI(prompt, { temperature: 0.7 });

  // Parse the response to extract response parts
  return result
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
