"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>通知設定</CardTitle>
          <CardDescription>通知の受信方法と頻度を設定します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">キャンペーン通知</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="campaign-status">キャンペーンステータスの変更</Label>
                  <p className="text-sm text-muted-foreground">
                    キャンペーンが開始、一時停止、または終了した場合に通知します。
                  </p>
                </div>
                <Switch id="campaign-status" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="budget-alerts">予算アラート</Label>
                  <p className="text-sm text-muted-foreground">予算の50%、80%、100%に達した場合に通知します。</p>
                </div>
                <Switch id="budget-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="performance-alerts">パフォーマンスアラート</Label>
                  <p className="text-sm text-muted-foreground">
                    クリック率やコンバージョン率が大幅に変化した場合に通知します。
                  </p>
                </div>
                <Switch id="performance-alerts" defaultChecked />
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">AI通知</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-suggestions">AI最適化提案</Label>
                  <p className="text-sm text-muted-foreground">
                    Gemini AIによる広告最適化の提案があった場合に通知します。
                  </p>
                </div>
                <Switch id="ai-suggestions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-optimizations">自動最適化の実行</Label>
                  <p className="text-sm text-muted-foreground">AIによる自動最適化が実行された場合に通知します。</p>
                </div>
                <Switch id="auto-optimizations" defaultChecked />
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">アカウント通知</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="billing-notifications">請求通知</Label>
                  <p className="text-sm text-muted-foreground">
                    請求が処理された場合や支払い方法に問題がある場合に通知します。
                  </p>
                </div>
                <Switch id="billing-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="team-changes">チーム変更</Label>
                  <p className="text-sm text-muted-foreground">
                    チームメンバーが追加または削除された場合に通知します。
                  </p>
                </div>
                <Switch id="team-changes" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-alerts">セキュリティアラート</Label>
                  <p className="text-sm text-muted-foreground">
                    新しいデバイスからのログインや不審なアクティビティがあった場合に通知します。
                  </p>
                </div>
                <Switch id="security-alerts" defaultChecked />
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">通知方法</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="notification-method">優先通知方法</Label>
                <Select defaultValue="email">
                  <SelectTrigger id="notification-method">
                    <SelectValue placeholder="通知方法を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">メール</SelectItem>
                    <SelectItem value="push">プッシュ通知</SelectItem>
                    <SelectItem value="both">両方</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notification-frequency">通知頻度</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="通知頻度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">リアルタイム</SelectItem>
                    <SelectItem value="daily">1日1回のダイジェスト</SelectItem>
                    <SelectItem value="weekly">週1回のダイジェスト</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>設定を保存</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
