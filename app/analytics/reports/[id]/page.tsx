import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, DownloadIcon, MailIcon, Share2Icon } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PerformanceReport } from "@/components/analytics/report-templates/performance-report"
import { ConversionReport } from "@/components/analytics/report-templates/conversion-report"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "レポート詳細 - Google広告作成・最適化サービス",
  description: "広告キャンペーンの詳細な分析レポートを表示します",
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  // 実際のアプリケーションでは、このIDを使用してレポート情報を取得します
  // ここではサンプルデータを使用します
  const reportId = params.id

  // レポートタイプに基づいて適切なレポートコンポーネントを表示
  const renderReportContent = () => {
    // 実際のアプリケーションでは、レポートIDに基づいてレポートタイプを判断します
    if (reportId === "1") {
      return <PerformanceReport />
    } else if (reportId === "2") {
      return <ConversionReport />
    } else {
      return <PerformanceReport />
    }
  }

  return (
    <DashboardShell>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/analytics/reports">
            <ArrowLeftIcon className="h-4 w-4" />
            レポート一覧に戻る
          </Link>
        </Button>
      </div>
      <DashboardHeader heading="週次パフォーマンスレポート" text="期間: 2024年3月15日 〜 2024年3月21日">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Share2Icon className="mr-2 h-4 w-4" />
                共有
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <MailIcon className="mr-2 h-4 w-4" />
                メールで送信
              </DropdownMenuItem>
              <DropdownMenuItem>リンクをコピー</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>定期配信を設定</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <DownloadIcon className="mr-2 h-4 w-4" />
                エクスポート
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF形式でダウンロード</DropdownMenuItem>
              <DropdownMenuItem>Excel形式でダウンロード</DropdownMenuItem>
              <DropdownMenuItem>CSV形式でダウンロード</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DashboardHeader>
      <div className="grid gap-8">{renderReportContent()}</div>
    </DashboardShell>
  )
}
