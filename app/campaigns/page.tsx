import type { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CampaignList } from "@/components/campaigns/campaign-list"
import { CampaignActions } from "@/components/campaigns/campaign-actions"

export const metadata: Metadata = {
  title: "キャンペーン - Google広告作成・最適化サービス",
  description: "Google広告キャンペーンの作成、管理、最適化を行います",
}

export default function CampaignsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="キャンペーン" text="Google広告キャンペーンの作成、管理、最適化を行います">
        <CampaignActions />
      </DashboardHeader>
      <div className="grid gap-8">
        <CampaignList />
      </div>
    </DashboardShell>
  )
}
