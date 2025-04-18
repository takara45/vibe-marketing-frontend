"use client"

import { useState } from "react"
import { CopyIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AdsTabProps {
  campaignId: string
}

export function AdsTab({ campaignId }: AdsTabProps) {
  const [newAdDialogOpen, setNewAdDialogOpen] = useState(false)
  const [selectedAdGroup, setSelectedAdGroup] = useState<string | null>(null)

  // サンプルデータ
  const adGroups = [
    { id: "1", name: "商品A - 検索広告" },
    { id: "2", name: "商品B - 検索広告" },
    { id: "3", name: "ブランドキーワード" },
  ]

  const ads = [
    {
      id: "1",
      adGroupId: "1",
      type: "text",
      status: "active",
      headline1: "高品質な商品A | 今だけ特別価格",
      headline2: "公式サイトで安心購入",
      headline3: "送料無料・即日発送",
      description1: "高品質な商品Aを特別価格でご提供。公式サイトなら安心の保証付き。",
      description2: "今なら送料無料・即日発送。お問い合わせも24時間受付中。",
      displayUrl: "example.com/product-a",
      finalUrl: "https://example.com/products/product-a",
      impressions: 8450,
      clicks: 320,
      ctr: 3.79,
      conversions: 18,
      convRate: 5.63,
      cost: 64000,
    },
    {
      id: "2",
      adGroupId: "1",
      type: "text",
      status: "active",
      headline1: "商品A 公式サイト | 最新モデル入荷",
      headline2: "安心の品質保証付き",
      headline3: "24時間サポート対応",
      description1: "最新モデルの商品Aが入荷しました。公式サイト限定の特典付き。",
      description2: "安心の品質保証と24時間サポート対応。今なら送料無料でお届け。",
      displayUrl: "example.com/new-product-a",
      finalUrl: "https://example.com/products/new-product-a",
      impressions: 7250,
      clicks: 280,
      ctr: 3.86,
      conversions: 14,
      convRate: 5.0,
      cost: 56000,
    },
    {
      id: "3",
      adGroupId: "2",
      type: "text",
      status: "active",
      headline1: "商品B 公式販売 | 限定モデル",
      headline2: "最短翌日お届け",
      headline3: "30日間返品保証",
      description1: "限定モデルの商品Bを公式サイトで販売中。最短翌日お届け。",
      description2: "30日間返品保証付き。安心してお買い求めいただけます。",
      displayUrl: "example.com/product-b",
      finalUrl: "https://example.com/products/product-b",
      impressions: 9120,
      clicks: 350,
      ctr: 3.84,
      conversions: 20,
      convRate: 5.71,
      cost: 70000,
    },
    {
      id: "4",
      adGroupId: "3",
      type: "text",
      status: "active",
      headline1: "[ブランド名] 公式サイト",
      headline2: "安心の正規品・全国送料無料",
      headline3: "会員登録で10%オフ",
      description1: "[ブランド名]の公式サイト。安心の正規品を全国送料無料でお届け。",
      description2: "会員登録で今すぐ10%オフ。最新情報をいち早くお届けします。",
      displayUrl: "example.com",
      finalUrl: "https://example.com",
      impressions: 12750,
      clicks: 480,
      ctr: 3.76,
      conversions: 22,
      convRate: 4.58,
      cost: 95000,
    },
  ]

  const filteredAds = selectedAdGroup ? ads.filter((ad) => ad.adGroupId === selectedAdGroup) : ads

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select onValueChange={(value) => setSelectedAdGroup(value === "all" ? null : value)}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="すべての広告グループ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての広告グループ</SelectItem>
              {adGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setNewAdDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          広告を追加
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredAds.map((ad) => (
          <Card key={ad.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{ad.headline1}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        テキスト広告
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          ad.status === "active"
                            ? "bg-green-50 text-green-700"
                            : ad.status === "paused"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-50 text-gray-700"
                        }
                      >
                        {ad.status === "active" && "実行中"}
                        {ad.status === "paused" && "一時停止"}
                        {ad.status === "draft" && "下書き"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {adGroups.find((group) => group.id === ad.adGroupId)?.name}
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
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">
                      {ad.headline1} | {ad.headline2} | {ad.headline3}
                    </div>
                    <div className="text-sm text-green-700">{ad.displayUrl}</div>
                    <div className="text-sm">{ad.description1}</div>
                    <div className="text-sm">{ad.description2}</div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">インプレッション</span>
                      <span className="font-medium">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">クリック数</span>
                      <span className="font-medium">{ad.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CTR</span>
                      <span className="font-medium">{ad.ctr.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">コンバージョン</span>
                      <span className="font-medium">{ad.conversions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">コンバージョン率</span>
                      <span className="font-medium">{ad.convRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">費用</span>
                      <span className="font-medium">¥{ad.cost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={newAdDialogOpen} onOpenChange={setNewAdDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>新規広告の追加</DialogTitle>
            <DialogDescription>新しい広告を作成します。広告タイプを選択してください。</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">テキスト広告</TabsTrigger>
              <TabsTrigger value="responsive">レスポンシブ広告</TabsTrigger>
              <TabsTrigger value="image">画像広告</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">テキスト広告</p>
                <p className="text-sm text-muted-foreground">
                  検索結果に表示される標準的なテキスト広告です。見出し、説明文、URLを設定できます。
                </p>
                <div className="rounded-md border p-4 mt-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">見出し1 | 見出し2 | 見出し3</div>
                    <div className="text-sm text-green-700">example.com</div>
                    <div className="text-sm">説明文1がここに表示されます。</div>
                    <div className="text-sm">説明文2がここに表示されます。</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="responsive" className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">レスポンシブ検索広告</p>
                <p className="text-sm text-muted-foreground">
                  複数の見出しと説明文を設定し、Google AIが最適な組み合わせを自動的に表示します。
                </p>
                <div className="rounded-md border p-4 mt-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">見出し例1 | 見出し例2 | 見出し例3</div>
                    <div className="text-sm text-green-700">example.com</div>
                    <div className="text-sm">説明文例1がここに表示されます。</div>
                    <div className="text-sm">説明文例2がここに表示されます。</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="image" className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">画像広告</p>
                <p className="text-sm text-muted-foreground">
                  ディスプレイネットワークに表示される画像広告です。様々なサイズの画像を設定できます。
                </p>
                <div className="rounded-md border p-4 mt-2 flex justify-center">
                  <div className="w-[300px] h-[250px] bg-gray-100 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">300 x 250 画像広告</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAdDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setNewAdDialogOpen(false)}>次へ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
