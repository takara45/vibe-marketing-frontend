"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  RefreshCw,
  Lightbulb,
  Sparkles,
  BarChart,
  Target,
} from "lucide-react";
import {
  generateAdText,
  generateKeywordSuggestions,
  analyzePerformance,
  generateOptimizationSuggestions,
  generateResponsePartAds,
} from "@/lib/gemini-api";

interface AiSuggestionsTabProps {
  campaignId: string;
  campaignData?: any;
}

export function AiSuggestionsTab({
  campaignId,
  campaignData,
}: AiSuggestionsTabProps) {
  const [activeTab, setActiveTab] = useState("adText");
  const [responsePartTab, setResponsePartTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for each suggestion type
  const [adTextSuggestions, setAdTextSuggestions] = useState<{
    headlines?: string[];
    descriptions?: string[];
    responseParts?: string[];
  } | null>(null);

  const [keywordSuggestions, setKeywordSuggestions] = useState<string[] | null>(
    null
  );

  const [performanceInsights, setPerformanceInsights] = useState<{
    insights: string[];
    recommendations: string[];
  } | null>(null);

  const [optimizationSuggestions, setOptimizationSuggestions] = useState<{
    budgetRecommendations: string[];
    keywordRecommendations: string[];
    targetingRecommendations: string[];
    structureRecommendations: string[];
  } | null>(null);

  // Mock campaign data for demo purposes
  const mockCampaignData = {
    name: "Summer Sale Campaign",
    description: "Promoting summer products with special discounts",
    targetAudience:
      "Adults 25-45 interested in outdoor activities and summer fashion",
    metrics: {
      impressions: 45000,
      clicks: 2250,
      conversions: 112,
      cost: 1800,
      revenue: 5600,
    },
    timeframe: "Last 30 days",
    previousPerformance: {
      impressions: 40000,
      clicks: 1800,
      conversions: 90,
      cost: 1600,
      revenue: 4500,
    },
    budget: 60,
    bidStrategy: "Maximize Conversions",
    keywords: [
      {
        keyword: "summer sale",
        impressions: 12000,
        clicks: 600,
        conversions: 30,
        cost: 480,
      },
      {
        keyword: "summer fashion",
        impressions: 8000,
        clicks: 400,
        conversions: 20,
        cost: 320,
      },
      {
        keyword: "beach accessories",
        impressions: 6000,
        clicks: 300,
        conversions: 15,
        cost: 240,
      },
      {
        keyword: "summer discount",
        impressions: 5000,
        clicks: 250,
        conversions: 12,
        cost: 200,
      },
      {
        keyword: "outdoor gear sale",
        impressions: 4000,
        clicks: 200,
        conversions: 10,
        cost: 160,
      },
      {
        keyword: "winter clothes",
        impressions: 200,
        clicks: 5,
        conversions: 0,
        cost: 10,
      },
      {
        keyword: "fall fashion",
        impressions: 300,
        clicks: 8,
        conversions: 0,
        cost: 16,
      },
      {
        keyword: "holiday gifts",
        impressions: 250,
        clicks: 6,
        conversions: 0,
        cost: 12,
      },
    ],
    adGroups: [
      {
        name: "Summer Clothing",
        impressions: 20000,
        clicks: 1000,
        conversions: 50,
        cost: 800,
      },
      {
        name: "Beach Accessories",
        impressions: 15000,
        clicks: 750,
        conversions: 37,
        cost: 600,
      },
      {
        name: "Outdoor Gear",
        impressions: 10000,
        clicks: 500,
        conversions: 25,
        cost: 400,
      },
    ],
    targeting: {
      locations: ["United States", "Canada", "United Kingdom"],
      devices: ["Mobile", "Desktop", "Tablet"],
      demographics: ["25-34", "35-44", "Male", "Female"],
    },
    goals: {
      primary: "Maximize ROAS",
      target: 300,
    },
  };

  // Function to generate ad text suggestions
  const handleGenerateAdText = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = campaignData || mockCampaignData;
      const result = await generateAdText(
        data.description,
        data.targetAudience,
        "both"
      );
      setAdTextSuggestions(result);
    } catch (err) {
      setError("Failed to generate ad text suggestions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate keyword suggestions
  const handleGenerateKeywords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = campaignData || mockCampaignData;
      const existingKeywords = data.keywords.map((k: any) => k.keyword);
      const result = await generateKeywordSuggestions(
        data.description,
        data.targetAudience,
        existingKeywords
      );
      setKeywordSuggestions(result);
    } catch (err) {
      setError("Failed to generate keyword suggestions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to analyze performance
  const handleAnalyzePerformance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = campaignData || mockCampaignData;
      const result = await analyzePerformance({
        name: data.name,
        metrics: data.metrics,
        timeframe: data.timeframe,
        targetAudience: data.targetAudience,
        previousPerformance: data.previousPerformance,
      });
      setPerformanceInsights(result);
    } catch (err) {
      setError("Failed to analyze performance. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate optimization suggestions
  const handleGenerateOptimizations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = campaignData || mockCampaignData;
      const result = await generateOptimizationSuggestions({
        name: data.name,
        budget: data.budget,
        bidStrategy: data.bidStrategy,
        keywords: data.keywords,
        adGroups: data.adGroups,
        targeting: data.targeting,
        goals: data.goals,
      });
      setOptimizationSuggestions(result);
    } catch (err) {
      setError(
        "Failed to generate optimization suggestions. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Suggestions</h2>
          <p className="text-muted-foreground">
            Leverage Gemini AI to improve your campaign performance
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="adText" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Ad Text</span>
          </TabsTrigger>
          <TabsTrigger value="responsePart" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Response Parts</span>
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Keywords</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Optimization</span>
          </TabsTrigger>
        </TabsList>

        {/* Ad Text Suggestions */}
        <TabsContent value="adText" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Ad Text</CardTitle>
              <CardDescription>
                Generate compelling headlines and descriptions for your ads
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && activeTab === "adText" && (
                <div className="bg-red-50 p-4 rounded-md mb-4 text-red-800">
                  {error}
                </div>
              )}

              {!adTextSuggestions ? (
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerateAdText}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading && activeTab === "adText" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate Ad Text</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Headlines</h3>
                    <div className="space-y-2">
                      {adTextSuggestions.headlines?.map((headline, index) => (
                        <div
                          key={index}
                          className="p-3 bg-muted rounded-md flex justify-between items-center"
                        >
                          <p>{headline}</p>
                          <Button variant="ghost" size="sm">
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Descriptions</h3>
                    <div className="space-y-2">
                      {adTextSuggestions.descriptions?.map(
                        (description, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{description}</p>
                            <Button variant="ghost" size="sm">
                              Use
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={handleGenerateAdText}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading && activeTab === "adText" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span>Regenerate</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Response Part Suggestions */}
        <TabsContent value="responsePart" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Response Part Ads</CardTitle>
              <CardDescription>
                Generate compelling response part advertisements for your ads
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && activeTab === "responsePart" && (
                <div className="bg-red-50 p-4 rounded-md mb-4 text-red-800">
                  {error}
                </div>
              )}

              {!adTextSuggestions?.responseParts ? (
                <div className="flex justify-center">
                  <Button
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const data = campaignData || mockCampaignData;
                        const result = await generateAdText(
                          data.description,
                          data.targetAudience,
                          "responsePart"
                        );
                        setAdTextSuggestions(result);
                      } catch (err) {
                        setError(
                          "Failed to generate response part ads. Please try again."
                        );
                        console.error(err);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading && activeTab === "responsePart" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate Response Parts</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Response Part Ads</h3>
                    <div className="space-y-2">
                      {adTextSuggestions.responseParts?.map(
                        (responsePart, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{responsePart}</p>
                            <Button variant="ghost" size="sm">
                              Use
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={async () => {
                        setLoading(true);
                        setError(null);
                        try {
                          const data = campaignData || mockCampaignData;
                          const result = await generateAdText(
                            data.description,
                            data.targetAudience,
                            "responsePart"
                          );
                          setAdTextSuggestions(result);
                        } catch (err) {
                          setError(
                            "Failed to generate response part ads. Please try again."
                          );
                          console.error(err);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading && activeTab === "responsePart" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span>Regenerate</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keyword Suggestions */}
        <TabsContent value="keywords" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Keyword Suggestions</CardTitle>
              <CardDescription>
                Discover new keywords to expand your campaign reach
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && activeTab === "keywords" && (
                <div className="bg-red-50 p-4 rounded-md mb-4 text-red-800">
                  {error}
                </div>
              )}

              {!keywordSuggestions ? (
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerateKeywords}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading && activeTab === "keywords" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Lightbulb className="h-4 w-4" />
                        <span>Generate Keywords</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {keywordSuggestions.map((keyword, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-md flex justify-between items-center"
                      >
                        <p>{keyword}</p>
                        <Button variant="ghost" size="sm">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={handleGenerateKeywords}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading && activeTab === "keywords" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span>Regenerate</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analysis */}
        <TabsContent value="performance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Analysis</CardTitle>
              <CardDescription>
                Get AI-powered insights on your campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && activeTab === "performance" && (
                <div className="bg-red-50 p-4 rounded-md mb-4 text-red-800">
                  {error}
                </div>
              )}

              {!performanceInsights ? (
                <div className="flex justify-center">
                  <Button
                    onClick={handleAnalyzePerformance}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading && activeTab === "performance" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <BarChart className="h-4 w-4" />
                        <span>Analyze Performance</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Key Insights</h3>
                    <div className="space-y-2">
                      {performanceInsights.insights.map((insight, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <div className="space-y-2">
                      {performanceInsights.recommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{recommendation}</p>
                            <Button variant="ghost" size="sm">
                              Apply
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={handleAnalyzePerformance}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading && activeTab === "performance" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span>Refresh Analysis</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Suggestions */}
        <TabsContent value="optimization" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Optimization Suggestions</CardTitle>
              <CardDescription>
                Get AI-powered recommendations to optimize your campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && activeTab === "optimization" && (
                <div className="bg-red-50 p-4 rounded-md mb-4 text-red-800">
                  {error}
                </div>
              )}

              {!optimizationSuggestions ? (
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerateOptimizations}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading && activeTab === "optimization" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4" />
                        <span>Generate Optimizations</span>
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Budget Recommendations</h3>
                    <div className="space-y-2">
                      {optimizationSuggestions.budgetRecommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{recommendation}</p>
                            <Button variant="ghost" size="sm">
                              Apply
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">
                      Keyword Recommendations
                    </h3>
                    <div className="space-y-2">
                      {optimizationSuggestions.keywordRecommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{recommendation}</p>
                            <Button variant="ghost" size="sm">
                              Apply
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">
                      Targeting Recommendations
                    </h3>
                    <div className="space-y-2">
                      {optimizationSuggestions.targetingRecommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{recommendation}</p>
                            <Button variant="ghost" size="sm">
                              Apply
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">
                      Structure Recommendations
                    </h3>
                    <div className="space-y-2">
                      {optimizationSuggestions.structureRecommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted rounded-md flex justify-between items-center"
                          >
                            <p>{recommendation}</p>
                            <Button variant="ghost" size="sm">
                              Apply
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={handleGenerateOptimizations}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading && activeTab === "optimization" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span>Refresh Optimizations</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
