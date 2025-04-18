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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                <div className="space-y-1 lg:col-span-2">
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
