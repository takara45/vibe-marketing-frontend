"use client";

import { useState } from "react";
import {
  BarChart3Icon,
  BrainCircuitIcon,
  ImageIcon,
  MousePointerClickIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdGroupsTab } from "@/components/campaigns/tabs/ad-groups-tab";
import { AdsTab } from "@/components/campaigns/tabs/ads-tab";
import { KeywordsTab } from "@/components/campaigns/tabs/keywords-tab";
import { PerformanceTab } from "@/components/campaigns/tabs/performance-tab";
import { AiSuggestionsTab } from "@/components/campaigns/tabs/ai-suggestions-tab";
import { GoogleAdsAITab } from "@/components/campaigns/tabs/google-ads-ai-tab";

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
      <TabsList>
        <TabsTrigger value="ad-groups" className="flex items-center gap-2">
          <MousePointerClickIcon className="h-4 w-4" />
          <span>広告グループ</span>
        </TabsTrigger>
        <TabsTrigger value="ads" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span>広告</span>
        </TabsTrigger>
        <TabsTrigger value="keywords" className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4" />
          <span>キーワード</span>
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex items-center gap-2">
          <BarChart3Icon className="h-4 w-4" />
          <span>パフォーマンス</span>
        </TabsTrigger>
        <TabsTrigger value="ai-suggestions" className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4" />
          <span>AI提案</span>
        </TabsTrigger>
        <TabsTrigger value="google-ads-ai" className="flex items-center gap-2">
          <BrainCircuitIcon className="h-4 w-4" />
          <span>Google広告AI</span>
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
      <TabsContent value="ai-suggestions" className="space-y-4">
        <AiSuggestionsTab campaignId={id} />
      </TabsContent>
      <TabsContent value="google-ads-ai" className="space-y-4">
        <GoogleAdsAITab campaignId={id} />
      </TabsContent>
    </Tabs>
  );
}
