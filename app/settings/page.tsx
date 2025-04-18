import type { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsTabs } from "@/components/settings-tabs"

export const metadata: Metadata = {
  title: "設定 - Google広告作成・最適化サービス",
  description: "アカウント設定、Google広告連携、AI設定などを管理します",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="設定" text="アカウント設定、Google広告連携、AI設定などを管理します" />
      <div className="grid gap-8">
        <SettingsTabs />
      </div>
    </DashboardShell>
  )
}
