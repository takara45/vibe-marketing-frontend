import {
  callGeminiAPI,
  generateAdText,
  generateKeywordSuggestions,
  analyzePerformance,
  generateOptimizationSuggestions,
} from "@/lib/gemini-api";
import "@testing-library/jest-dom";

// Mock fetch globally
global.fetch = jest.fn();

describe("Gemini API Client", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    // Mock environment variables before tests
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_GEMINI_API_KEY: "test-api-key",
      NEXT_PUBLIC_GEMINI_API_URL: "https://test-api-url.com",
      NEXT_PUBLIC_GEMINI_MODEL: "test-model",
    };
  });

  afterAll(() => {
    // Restore environment after tests
    process.env = originalEnv;
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup default mock response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "Mock response text",
                },
              ],
            },
          },
        ],
      }),
    });
  });

  describe("callGeminiAPI", () => {
    it("should call fetch with correct parameters using environment variables", async () => {
      const prompt = "Test prompt";

      await callGeminiAPI(prompt);

      expect(global.fetch).toHaveBeenCalledTimes(1);

      const [url, config] = (global.fetch as jest.Mock).mock.calls[0];

      // Check URL contains model and API key from environment variables
      expect(url).toContain("test-model");
      expect(url).toContain("test-api-key");
      expect(url).toContain("test-api-url.com");

      // Check request body
      const body = JSON.parse(config.body);
      expect(body.contents[0].parts[0].text).toBe(prompt);
    });
  });

  // Basic tests for other functions
  describe("generateAdText", () => {
    it("should call fetch with the correct URL", async () => {
      await generateAdText("Product", "Audience", "both");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [url] = (global.fetch as jest.Mock).mock.calls[0];

      // Verify environment variables are used
      expect(url).toContain("test-model");
      expect(url).toContain("test-api-key");
      expect(url).toContain("test-api-url.com");
    });
  });

  describe("generateKeywordSuggestions", () => {
    it("should call fetch with the correct URL", async () => {
      await generateKeywordSuggestions("Product", "Audience");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [url] = (global.fetch as jest.Mock).mock.calls[0];

      // Verify environment variables are used
      expect(url).toContain("test-model");
      expect(url).toContain("test-api-key");
      expect(url).toContain("test-api-url.com");
    });
  });

  describe("analyzePerformance", () => {
    it("should call fetch with the correct URL", async () => {
      const campaignData = {
        name: "Test Campaign",
        metrics: {
          impressions: 1000,
          clicks: 100,
          conversions: 10,
          cost: 200,
        },
        timeframe: "Last 30 days",
        targetAudience: "Test audience",
      };

      await analyzePerformance(campaignData);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [url] = (global.fetch as jest.Mock).mock.calls[0];

      // Verify environment variables are used
      expect(url).toContain("test-model");
      expect(url).toContain("test-api-key");
      expect(url).toContain("test-api-url.com");
    });
  });

  describe("generateOptimizationSuggestions", () => {
    it("should call fetch with the correct URL", async () => {
      const campaignData = {
        name: "Test Campaign",
        budget: 100,
        bidStrategy: "Maximize Conversions",
        keywords: [
          {
            keyword: "test",
            impressions: 100,
            clicks: 10,
            conversions: 1,
            cost: 20,
          },
        ],
        adGroups: [
          {
            name: "Test Group",
            impressions: 100,
            clicks: 10,
            conversions: 1,
            cost: 20,
          },
        ],
        targeting: {
          locations: ["US"],
          devices: ["Mobile"],
          demographics: ["25-34"],
        },
        goals: {
          primary: "Maximize Conversions",
        },
      };

      await generateOptimizationSuggestions(campaignData);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [url] = (global.fetch as jest.Mock).mock.calls[0];

      // Verify environment variables are used
      expect(url).toContain("test-model");
      expect(url).toContain("test-api-key");
      expect(url).toContain("test-api-url.com");
    });
  });
});
