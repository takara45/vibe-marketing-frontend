import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OverviewCards } from "@/components/overview-cards"
import { CampaignPerformance } from "@/components/campaign-performance"
import { BudgetUsage } from "@/components/budget-usage"
import { PerformanceByDevice } from "@/components/performance-by-device"
import { PerformanceByTime } from "@/components/performance-by-time"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="ダッシュボード" text="Google広告キャンペーンのパフォーマンスと最適化提案を確認できます">
        <div className="flex items-center gap-2">
          <div className="grid gap-1">
            <p className="text-sm font-medium">アカウント: Acme Inc</p>
            <p className="text-xs text-muted-foreground">最終更新: 2024年3月21日 8:15</p>
          </div>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:gap-8">
        <OverviewCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <CampaignPerformance className="lg:col-span-4" />
          <BudgetUsage className="lg:col-span-3" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <PerformanceByDevice />
          <PerformanceByTime />
        </div>
      </div>
    </DashboardShell>
  )
}
