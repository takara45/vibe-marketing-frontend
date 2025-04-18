import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, PlusIcon } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { AdsList } from "@/components/campaigns/ads-list"

export const metadata: Metadata = {
  title: "広告一覧 - Google広告作成・最適化サービス",
  description: "広告グループに属する広告の一覧と管理",
}

export default function AdGroupAdsPage({ params }: { params: { id: string; adGroupId: string } }) {
  // 実際のアプリケーションでは、これらのIDを使用してデータを取得します
  const campaignId = params.id
  const adGroupId = params.adGroupId

  return (
    <DashboardShell>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href={`/campaigns/${campaignId}`}>
            <ArrowLeftIcon className="h-4 w-4" />
            キャンペーン詳細に戻る
          </Link>
        </Button>
      </div>
      <DashboardHeader
        heading="広告一覧"
        text={`キャンペーンID: ${campaignId} / 広告グループID: ${adGroupId} の広告を管理します`}
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          広告を追加
        </Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <AdsList campaignId={campaignId} adGroupId={adGroupId} />
      </div>
    </DashboardShell>
  )
}
