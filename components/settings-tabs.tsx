"use client"

import { useState } from "react"
import {
  BellIcon,
  CreditCardIcon,
  GaugeIcon,
  ChromeIcon as GoogleIcon,
  KeyIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/components/settings/account-settings"
import { GoogleAdsSettings } from "@/components/settings/google-ads-settings"
import { AiSettings } from "@/components/settings/ai-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import { BillingSettings } from "@/components/settings/billing-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { SecuritySettings } from "@/components/settings/security-settings"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="hidden md:inline">アカウント</span>
        </TabsTrigger>
        <TabsTrigger value="google-ads" className="flex items-center gap-2">
          <GoogleIcon className="h-4 w-4" />
          <span className="hidden md:inline">Google広告</span>
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center gap-2">
          <GaugeIcon className="h-4 w-4" />
          <span className="hidden md:inline">AI設定</span>
        </TabsTrigger>
        <TabsTrigger value="team" className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4" />
          <span className="hidden md:inline">チーム</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCardIcon className="h-4 w-4" />
          <span className="hidden md:inline">請求</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <BellIcon className="h-4 w-4" />
          <span className="hidden md:inline">通知</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <KeyIcon className="h-4 w-4" />
          <span className="hidden md:inline">API</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <SettingsIcon className="h-4 w-4" />
          <span className="hidden md:inline">セキュリティ</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-4">
        <AccountSettings />
      </TabsContent>
      <TabsContent value="google-ads" className="space-y-4">
        <GoogleAdsSettings />
      </TabsContent>
      <TabsContent value="ai" className="space-y-4">
        <AiSettings />
      </TabsContent>
      <TabsContent value="team" className="space-y-4">
        <TeamSettings />
      </TabsContent>
      <TabsContent value="billing" className="space-y-4">
        <BillingSettings />
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <NotificationSettings />
      </TabsContent>
      <TabsContent value="api" className="space-y-4">
        <ApiSettings />
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
}
