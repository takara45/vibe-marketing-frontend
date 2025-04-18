import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, BarChart3Icon, PencilIcon } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { CampaignDetails } from "@/components/campaigns/campaign-details"
import { CampaignTabs } from "@/components/campaigns/campaign-tabs"

export const metadata: Metadata = {
  title: "キャンペーン詳細 - Google広告作成・最適化サービス",
  description: "Google広告キャンペーンの詳細情報と管理",
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/campaigns">
            <ArrowLeftIcon className="h-4 w-4" />
            キャンペーン一覧に戻る
          </Link>
        </Button>
      </div>
      <DashboardHeader heading="春の新商品プロモーション" text="検索広告 • 実行中 • 2024年3月1日 〜 2024年3月31日">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/analytics?campaign=${params.id}`}>
              <BarChart3Icon className="mr-2 h-4 w-4" />
              分析を表示
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/campaigns/${params.id}/edit`}>
              <PencilIcon className="mr-2 h-4 w-4" />
              編集
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <div className="grid gap-8">
        <CampaignDetails id={params.id} />
        <CampaignTabs id={params.id} />
      </div>
    </DashboardShell>
  )
}
