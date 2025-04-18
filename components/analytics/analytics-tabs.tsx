"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3Icon,
  CoinsIcon,
  FileTextIcon,
  LineChartIcon,
  MousePointerClickIcon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
  TagIcon,
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { OverviewAnalytics } from "@/components/analytics/overview-analytics"
import { CampaignAnalytics } from "@/components/analytics/campaign-analytics"
import { AdGroupAnalytics } from "@/components/analytics/ad-group-analytics"
import { KeywordAnalytics } from "@/components/analytics/keyword-analytics"
import { AudienceAnalytics } from "@/components/analytics/audience-analytics"
import { ConversionAnalytics } from "@/components/analytics/conversion-analytics"
import { BudgetAnalytics } from "@/components/analytics/budget-analytics"
import { AiInsights } from "@/components/analytics/ai-insights"

export function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              <span className="hidden md:inline">概要</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden md:inline">キャンペーン</span>
            </TabsTrigger>
            <TabsTrigger value="ad-groups" className="flex items-center gap-2">
              <TagIcon className="h-4 w-4" />
              <span className="hidden md:inline">広告グループ</span>
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" />
              <span className="hidden md:inline">キーワード</span>
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              <span className="hidden md:inline">ユーザー属性</span>
            </TabsTrigger>
            <TabsTrigger value="conversions" className="flex items-center gap-2">
              <MousePointerClickIcon className="h-4 w-4" />
              <span className="hidden md:inline">コンバージョン</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <CoinsIcon className="h-4 w-4" />
              <span className="hidden md:inline">予算</span>
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <SparklesIcon className="h-4 w-4" />
              <span className="hidden md:inline">AI洞察</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" asChild className="ml-2">
          <Link href="/analytics/reports">
            <FileTextIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">レポート</span>
          </Link>
        </Button>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <OverviewAnalytics />
      </TabsContent>
      <TabsContent value="campaigns" className="space-y-4">
        <CampaignAnalytics />
      </TabsContent>
      <TabsContent value="ad-groups" className="space-y-4">
        <AdGroupAnalytics />
      </TabsContent>
      <TabsContent value="keywords" className="space-y-4">
        <KeywordAnalytics />
      </TabsContent>
      <TabsContent value="audience" className="space-y-4">
        <AudienceAnalytics />
      </TabsContent>
      <TabsContent value="conversions" className="space-y-4">
        <ConversionAnalytics />
      </TabsContent>
      <TabsContent value="budget" className="space-y-4">
        <BudgetAnalytics />
      </TabsContent>
      <TabsContent value="ai-insights" className="space-y-4">
        <AiInsights />
      </TabsContent>
    </div>
  )
}
