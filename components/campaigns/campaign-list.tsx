"use client"

import { useState } from "react"
import {
  BarChart3Icon,
  ChevronRightIcon,
  CopyIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  TrashIcon,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const campaignsData = [
  {
    id: "1",
    name: "春の新商品プロモーション",
    type: "search",
    typeName: "検索広告",
    status: "active",
    budget: 30000,
    spent: 320000,
    remaining: 130000,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    impressions: 45230,
    clicks: 1520,
    ctr: 3.36,
    conversions: 78,
    convRate: 5.13,
    cpa: 4102.56,
    roas: 350,
  },
  {
    id: "2",
    name: "新規顧客獲得キャンペーン",
    type: "display",
    typeName: "ディスプレイ広告",
    status: "paused",
    budget: 20000,
    spent: 210000,
    remaining: 90000,
    startDate: "2024-03-05",
    endDate: "2024-03-31",
    impressions: 32450,
    clicks: 980,
    ctr: 3.02,
    conversions: 45,
    convRate: 4.59,
    cpa: 4666.67,
    roas: 280,
  },
  {
    id: "3",
    name: "ブランド認知度向上キャンペーン",
    type: "display",
    typeName: "ディスプレイ広告",
    status: "active",
    budget: 15000,
    spent: 180000,
    remaining: 20000,
    startDate: "2024-03-10",
    endDate: "2024-03-31",
    impressions: 28750,
    clicks: 850,
    ctr: 2.96,
    conversions: 32,
    convRate: 3.76,
    cpa: 5625.0,
    roas: 220,
  },
  {
    id: "4",
    name: "リターゲティングキャンペーン",
    type: "search",
    typeName: "検索広告",
    status: "active",
    budget: 10000,
    spent: 150000,
    remaining: 20000,
    startDate: "2024-03-15",
    endDate: "2024-03-31",
    impressions: 19000,
    clicks: 720,
    ctr: 3.79,
    conversions: 42,
    convRate: 5.83,
    cpa: 3571.43,
    roas: 420,
  },
  {
    id: "5",
    name: "夏の特別セールキャンペーン",
    type: "shopping",
    typeName: "ショッピング広告",
    status: "draft",
    budget: 25000,
    spent: 0,
    remaining: 250000,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    impressions: 0,
    clicks: 0,
    ctr: 0,
    conversions: 0,
    convRate: 0,
    cpa: 0,
    roas: 0,
  },
  {
    id: "6",
    name: "冬のプロモーションキャンペーン",
    type: "video",
    typeName: "動画広告",
    status: "ended",
    budget: 35000,
    spent: 350000,
    remaining: 0,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    impressions: 52300,
    clicks: 1850,
    ctr: 3.54,
    conversions: 95,
    convRate: 5.14,
    cpa: 3684.21,
    roas: 380,
  },
]

export function CampaignList() {
  const [activeTab, setActiveTab] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null)

  const handleDeleteClick = (campaignId: string) => {
    setCampaignToDelete(campaignId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // 実際の削除処理をここに実装
    console.log(`キャンペーン ${campaignToDelete} を削除しました`)
    setDeleteDialogOpen(false)
    setCampaignToDelete(null)
  }

  const filteredCampaigns = campaignsData.filter((campaign) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return campaign.status === "active"
    if (activeTab === "paused") return campaign.status === "paused"
    if (activeTab === "draft") return campaign.status === "draft"
    if (activeTab === "ended") return campaign.status === "ended"
    return true
  })

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="active">実行中</TabsTrigger>
          <TabsTrigger value="paused">一時停止</TabsTrigger>
          <TabsTrigger value="draft">下書き</TabsTrigger>
          <TabsTrigger value="ended">終了</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center">
                    <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                      {campaign.name}
                    </Link>
                    <ChevronRightIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {campaign.typeName}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          campaign.status === "active"
                            ? "bg-green-50 text-green-700"
                            : campaign.status === "paused"
                              ? "bg-amber-50 text-amber-700"
                              : campaign.status === "draft"
                                ? "bg-gray-50 text-gray-700"
                                : "bg-red-50 text-red-700"
                        }
                      >
                        {campaign.status === "active" && "実行中"}
                        {campaign.status === "paused" && "一時停止"}
                        {campaign.status === "draft" && "下書き"}
                        {campaign.status === "ended" && "終了"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {campaign.startDate} 〜 {campaign.endDate}
                      </span>
                    </div>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}`}>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        <span>詳細を表示</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}/edit`}>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        <span>編集</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      <span>複製</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {campaign.status === "active" ? (
                      <DropdownMenuItem>
                        <PauseIcon className="mr-2 h-4 w-4" />
                        <span>一時停止</span>
                      </DropdownMenuItem>
                    ) : campaign.status === "paused" || campaign.status === "draft" ? (
                      <DropdownMenuItem>
                        <PlayIcon className="mr-2 h-4 w-4" />
                        <span>開始</span>
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem asChild>
                      <Link href={`/analytics?campaign=${campaign.id}`}>
                        <BarChart3Icon className="mr-2 h-4 w-4" />
                        <span>分析を表示</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(campaign.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      <span>削除</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">予算</span>
                    <span className="font-medium">¥{campaign.budget.toLocaleString()}/日</span>
                  </div>
                  {campaign.status !== "draft" && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">使用額: ¥{campaign.spent.toLocaleString()}</span>
                        <span className="text-muted-foreground">残り: ¥{campaign.remaining.toLocaleString()}</span>
                      </div>
                      <Progress
                        value={(campaign.spent / (campaign.spent + campaign.remaining)) * 100}
                        className="h-1"
                      />
                    </div>
                  )}
                </div>
                {campaign.status !== "draft" && (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">インプレッション</span>
                        <span className="font-medium">{campaign.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">クリック数</span>
                        <span className="font-medium">{campaign.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">CTR</span>
                        <span className="font-medium">{campaign.ctr.toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">コンバージョン</span>
                        <span className="font-medium">{campaign.conversions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">コンバージョン率</span>
                        <span className="font-medium">{campaign.convRate.toFixed(2)}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">CPA</span>
                        <span className="font-medium">¥{campaign.cpa.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">ROAS</span>
                        <span className="font-medium">{campaign.roas}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">総費用</span>
                        <span className="font-medium">¥{campaign.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">総売上</span>
                        <span className="font-medium">
                          ¥{((campaign.spent * campaign.roas) / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {campaign.status === "draft" && (
                  <div className="col-span-3 flex items-center text-sm text-muted-foreground">
                    このキャンペーンはまだ開始されていません。編集して開始してください。
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>キャンペーンを削除</DialogTitle>
            <DialogDescription>
              このキャンペーンを削除してもよろしいですか？この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
