import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AiSuggestionsTab } from "@/components/campaigns/tabs/ai-suggestions-tab";
import * as geminiApi from "@/lib/gemini-api";

// Mock the Gemini API functions
jest.mock("@/lib/gemini-api", () => ({
  generateAdText: jest.fn(),
  generateKeywordSuggestions: jest.fn(),
  analyzePerformance: jest.fn(),
  generateOptimizationSuggestions: jest.fn(),
}));

describe("AiSuggestionsTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with all tabs", () => {
    render(<AiSuggestionsTab campaignId="test-id" />);

    // Check for tab titles
    expect(screen.getByText("Ad Text")).toBeInTheDocument();
    expect(screen.getByText("Keywords")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Optimization")).toBeInTheDocument();

    // Check for main heading
    expect(screen.getByText("AI-Powered Suggestions")).toBeInTheDocument();
  });

  it("shows generate buttons for each tab", () => {
    render(<AiSuggestionsTab campaignId="test-id" />);

    // Ad Text tab is active by default
    expect(screen.getByText("Generate Ad Text")).toBeInTheDocument();
  });
});
