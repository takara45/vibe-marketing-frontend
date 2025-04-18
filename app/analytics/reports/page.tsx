import type { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AnalyticsReport } from "@/components/analytics/analytics-report"

export const metadata: Metadata = {
  title: "分析レポート - Google広告作成・最適化サービス",
  description: "広告キャンペーンの詳細な分析レポートを作成、表示、共有できます",
}

export default function AnalyticsReportPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="分析レポート" text="広告キャンペーンの詳細な分析レポートを作成、表示、共有できます" />
      <div className="grid gap-8">
        <AnalyticsReport />
      </div>
    </DashboardShell>
  )
}
