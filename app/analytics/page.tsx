import type { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { AnalyticsTabs } from "@/components/analytics/analytics-tabs";
import { RealTimeDashboard } from "@/components/analytics/real-time-dashboard";
import { CustomReportBuilder } from "@/components/analytics/custom-report-builder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "分析 - Google広告作成・最適化サービス",
  description:
    "広告キャンペーンのパフォーマンスを詳細に分析し、AIによる洞察と改善提案を確認できます",
};

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="分析"
        text="広告キャンペーンのパフォーマンスを詳細に分析し、AIによる洞察と改善提案を確認できます"
      >
        <div className="flex items-center gap-2">
          <div className="grid gap-1">
            <p className="text-sm font-medium">アカウント: Acme Inc</p>
            <p className="text-xs text-muted-foreground">
              期間: 2024年3月15日 - 2024年3月21日
            </p>
          </div>
        </div>
      </DashboardHeader>
      <div className="grid gap-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">概要分析</TabsTrigger>
            <TabsTrigger value="realtime">リアルタイム</TabsTrigger>
            <TabsTrigger value="custom">カスタムレポート</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <AnalyticsTabs />
          </TabsContent>
          <TabsContent value="realtime" className="space-y-4">
            <RealTimeDashboard />
          </TabsContent>
          <TabsContent value="custom" className="space-y-4">
            <CustomReportBuilder />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
