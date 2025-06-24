"use client"

import { useState } from "react"
import { CopyIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CPCMetricCard } from "@/components/ui/cpc-metric-card"

interface AdGroupsTabProps {
  campaignId: string
}

export function AdGroupsTab({ campaignId }: AdGroupsTabProps) {
  const [newAdGroupDialogOpen, setNewAdGroupDialogOpen] = useState(false)

  // サンプルデータ
  const adGroups = [
    {
      id: "1",
      name: "商品A - 検索広告",
      status: "active",
      impressions: 18450,
      clicks: 620,
      ctr: 3.36,
      conversions: 32,
      convRate: 5.16,
      cost: 130000,
      cpa: 4062.5,
      cpc: { current: 209.7, previous: 196.5, trend: 'up' as const, category: 'high' as const },
      keywords: [
        { keyword: "商品A 購入", cpc: 225.3, quality_score: 8, impressions: 8200, clicks: 280 },
        { keyword: "商品A 価格", cpc: 195.8, quality_score: 7, impressions: 6500, clicks: 210 },
        { keyword: "商品A レビュー", cpc: 208.2, quality_score: 9, impressions: 3750, clicks: 130 },
      ],
    },
    {
      id: "2",
      name: "商品B - 検索広告",
      status: "active",
      impressions: 15780,
      clicks: 540,
      ctr: 3.42,
      conversions: 28,
      convRate: 5.19,
      cost: 115000,
      cpa: 4107.14,
      cpc: { current: 213.0, previous: 218.7, trend: 'down' as const, category: 'high' as const },
      keywords: [
        { keyword: "商品B 激安", cpc: 198.5, quality_score: 6, impressions: 7800, clicks: 265 },
        { keyword: "商品B 通販", cpc: 221.8, quality_score: 8, impressions: 5200, clicks: 175 },
        { keyword: "商品B セール", cpc: 218.7, quality_score: 7, impressions: 2780, clicks: 100 },
      ],
    },
    {
      id: "3",
      name: "ブランドキーワード",
      status: "active",
      impressions: 12750,
      clicks: 480,
      ctr: 3.76,
      conversions: 22,
      convRate: 4.58,
      cost: 95000,
      cpa: 4318.18,
      cpc: { current: 197.9, previous: 189.2, trend: 'up' as const, category: 'medium' as const },
      keywords: [
        { keyword: "ブランド名", cpc: 165.2, quality_score: 10, impressions: 8500, clicks: 320 },
        { keyword: "ブランド名 公式", cpc: 189.8, quality_score: 9, impressions: 3200, clicks: 120 },
        { keyword: "ブランド名 ストア", cpc: 242.5, quality_score: 8, impressions: 1050, clicks: 40 },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">広告グループ</h3>
        <Button onClick={() => setNewAdGroupDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          広告グループを追加
        </Button>
      </div>

      <div className="grid gap-4">
        {adGroups.map((adGroup) => (
          <Card key={adGroup.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>
                    <Link href={`/campaigns/${campaignId}/ad-groups/${adGroup.id}`} className="hover:underline">
                      {adGroup.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    <Badge
                      variant="outline"
                      className={
                        adGroup.status === "active"
                          ? "bg-green-50 text-green-700"
                          : adGroup.status === "paused"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-50 text-gray-700"
                      }
                    >
                      {adGroup.status === "active" && "実行中"}
                      {adGroup.status === "paused" && "一時停止"}
                      {adGroup.status === "draft" && "下書き"}
                    </Badge>
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">アクション</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <PencilIcon className="mr-2 h-4 w-4" />
                      <span>編集</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      <span>複製</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <TrashIcon className="mr-2 h-4 w-4" />
                      <span>削除</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">インプレッション</span>
                      <span className="font-medium">{adGroup.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">クリック数</span>
                      <span className="font-medium">{adGroup.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CTR</span>
                      <span className="font-medium">{adGroup.ctr.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">コンバージョン</span>
                      <span className="font-medium">{adGroup.conversions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">コンバージョン率</span>
                      <span className="font-medium">{adGroup.convRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CPA</span>
                      <span className="font-medium">¥{adGroup.cpa.toFixed(2)}</span>
                    </div>
                  </div>
                  <div>
                    <CPCMetricCard
                      title="平均CPC"
                      currentCPC={adGroup.cpc.current}
                      previousCPC={adGroup.cpc.previous}
                      trend={adGroup.cpc.trend}
                      category={adGroup.cpc.category}
                      description="広告グループ単価"
                    />
                  </div>
                  <div className="lg:col-span-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">費用</span>
                      <span className="font-medium">¥{adGroup.cost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/campaigns/${campaignId}/ad-groups/${adGroup.id}/ads`}>広告を表示</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/campaigns/${campaignId}/ad-groups/${adGroup.id}/keywords`}>キーワードを表示</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* キーワード別CPC詳細 */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">キーワード別CPC詳細</h4>
                  <div className="space-y-2">
                    {adGroup.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{keyword.keyword}</span>
                          <Badge variant="outline" className="text-xs">
                            品質スコア: {keyword.quality_score}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>¥{keyword.cpc.toFixed(2)}</span>
                          <span>{keyword.impressions.toLocaleString()} imp</span>
                          <span>{keyword.clicks} clicks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={newAdGroupDialogOpen} onOpenChange={setNewAdGroupDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>新規広告グループの追加</DialogTitle>
            <DialogDescription>このキャンペーンに新しい広告グループを追加します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">広告グループ名</Label>
              <Input id="name" placeholder="例: 商品C - 検索広告" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">説明（任意）</Label>
              <Textarea id="description" placeholder="広告グループの説明を入力してください" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAdGroupDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setNewAdGroupDialogOpen(false)}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
