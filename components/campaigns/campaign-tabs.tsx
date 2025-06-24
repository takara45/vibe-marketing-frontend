"use client";

import { useState } from "react";
import {
  BarChart3Icon,
  BrainCircuitIcon,
  ImageIcon,
  MousePointerClickIcon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdGroupsTab } from "@/components/campaigns/tabs/ad-groups-tab";
import { AdsTab } from "@/components/campaigns/tabs/ads-tab";
import { KeywordsTab } from "@/components/campaigns/tabs/keywords-tab";
import { PerformanceTab } from "@/components/campaigns/tabs/performance-tab";
import { AiSuggestionsTab } from "@/components/campaigns/tabs/ai-suggestions-tab";
import { GoogleAdsAITab } from "@/components/campaigns/tabs/google-ads-ai-tab";
import { AudienceInsightsTab } from "@/components/campaigns/tabs/audience-insights-tab";

interface CampaignTabsProps {
  id: string;
}

export function CampaignTabs({ id }: CampaignTabsProps) {
  const [activeTab, setActiveTab] = useState("ad-groups");

  return (
    <Tabs
      defaultValue="ad-groups"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full gap-1 h-auto">
        <TabsTrigger value="ad-groups" className="flex items-center gap-2">
          <MousePointerClickIcon className="h-4 w-4" />
          <span className="hidden sm:inline">広告グループ</span>
          <span className="sm:hidden">グループ</span>
        </TabsTrigger>
        <TabsTrigger value="ads" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span>広告</span>
        </TabsTrigger>
        <TabsTrigger value="keywords" className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4" />
          <span className="hidden sm:inline">キーワード</span>
          <span className="sm:hidden">KW</span>
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex items-center gap-2">
          <BarChart3Icon className="h-4 w-4" />
          <span className="hidden sm:inline">パフォーマンス</span>
          <span className="sm:hidden">分析</span>
        </TabsTrigger>
        <TabsTrigger value="audience-insights" className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4" />
          <span className="hidden sm:inline">オーディエンス分析</span>
          <span className="sm:hidden">属性</span>
        </TabsTrigger>
        <TabsTrigger value="ai-suggestions" className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4" />
          <span className="hidden sm:inline">AI提案</span>
          <span className="sm:hidden">AI提案</span>
        </TabsTrigger>
        <TabsTrigger value="google-ads-ai" className="flex items-center gap-2">
          <BrainCircuitIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Google広告AI</span>
          <span className="sm:hidden">広告AI</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ad-groups" className="space-y-4">
        <AdGroupsTab campaignId={id} />
      </TabsContent>
      <TabsContent value="ads" className="space-y-4">
        <AdsTab campaignId={id} />
      </TabsContent>
      <TabsContent value="keywords" className="space-y-4">
        <KeywordsTab campaignId={id} />
      </TabsContent>
      <TabsContent value="performance" className="space-y-4">
        <PerformanceTab campaignId={id} />
      </TabsContent>
      <TabsContent value="audience-insights" className="space-y-4">
        <AudienceInsightsTab campaignId={id} />
      </TabsContent>
      <TabsContent value="ai-suggestions" className="space-y-4">
        <AiSuggestionsTab campaignId={id} />
      </TabsContent>
      <TabsContent value="google-ads-ai" className="space-y-4">
        <GoogleAdsAITab campaignId={id} />
      </TabsContent>
    </Tabs>
  );
}
