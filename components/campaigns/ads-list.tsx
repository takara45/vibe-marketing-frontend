"use client"

import { useState } from "react"
import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
  CheckIcon,
  RefreshCwIcon,
} from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AdsListProps {
  campaignId: string
  adGroupId: string
}

export function AdsList({ campaignId, adGroupId }: AdsListProps) {
  const [newAdDialogOpen, setNewAdDialogOpen] = useState(false)
  const [editAdDialogOpen, setEditAdDialogOpen] = useState(false)
  const [selectedAd, setSelectedAd] = useState<string | null>(null)

  // サンプルデータ - 実際のアプリケーションではAPIから取得します
  const ads = [
    {
      id: "1",
      adGroupId: adGroupId,
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
      adGroupId: adGroupId,
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
      adGroupId: adGroupId,
      type: "responsive",
      status: "active",
      headline1: "商品A レスポンシブ広告 | 特別価格",
      headline2: "公式サイト限定特典",
      headline3: "送料無料・即日発送",
      description1: "高品質な商品Aをレスポンシブ広告でご紹介。様々なサイズに最適化されます。",
      description2: "公式サイト限定の特典付き。今なら送料無料でお届け。",
      displayUrl: "example.com/responsive-ad",
      finalUrl: "https://example.com/products/responsive-ad",
      impressions: 9120,
      clicks: 350,
      ctr: 3.84,
      conversions: 20,
      convRate: 5.71,
      cost: 70000,
    },
  ]

  const handleEditAd = (adId: string) => {
    setSelectedAd(adId)
    setEditAdDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">広告一覧</h3>
        <Button onClick={() => setNewAdDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          広告を追加
        </Button>
      </div>

      <div className="grid gap-4">
        {ads.map((ad) => (
          <Card key={ad.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{ad.headline1}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {ad.type === "text" ? "テキスト広告" : "レスポンシブ広告"}
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
                    <DropdownMenuItem onClick={() => handleEditAd(ad.id)}>
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

      {/* 新規広告作成ダイアログ */}
      <Dialog open={newAdDialogOpen} onOpenChange={setNewAdDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>AI支援による新規広告の作成</DialogTitle>
            <DialogDescription>広告タイプを選択し、商品情報を入力するとAIが最適な広告を生成します。</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">テキスト広告</TabsTrigger>
              <TabsTrigger value="responsive">レスポンシブ広告</TabsTrigger>
              <TabsTrigger value="image">画像広告</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">商品・サービス情報</h3>
                    <p className="text-xs text-muted-foreground">
                      以下の情報を入力すると、AIが最適な広告テキストを生成します。
                    </p>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="product-name">商品・サービス名</Label>
                      <Input id="product-name" placeholder="例: 高性能ノートパソコン XYZ-2000" />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="product-features">主な特徴・セールスポイント</Label>
                      <Textarea
                        id="product-features"
                        placeholder="例: 最新CPU搭載、16GB RAM、1TB SSD、バッテリー寿命20時間、軽量1.2kg"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="target-audience">ターゲットオーディエンス</Label>
                      <Input id="target-audience" placeholder="例: ビジネスマン、学生、クリエイター" />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="promotion-details">プロモーション詳細（任意）</Label>
                      <Input id="promotion-details" placeholder="例: 期間限定20%オフ、送料無料、30日間返品保証" />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="tone">広告のトーン</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="トーンを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">プロフェッショナル</SelectItem>
                          <SelectItem value="friendly">フレンドリー</SelectItem>
                          <SelectItem value="casual">カジュアル</SelectItem>
                          <SelectItem value="enthusiastic">熱意的</SelectItem>
                          <SelectItem value="informative">情報提供的</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full mt-2" variant="secondary">
                      <SparklesIcon className="mr-2 h-4 w-4" />
                      AIに広告テキストを生成させる
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-2">生成された広告テキスト</h3>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="headline1">見出し1</Label>
                      <Input id="headline1" value="高性能ノートPC XYZ-2000 | 最新CPU搭載" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="headline2">見出し2</Label>
                      <Input id="headline2" value="20時間バッテリー搭載" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="headline3">見出し3</Label>
                      <Input id="headline3" value="期間限定20%オフ・送料無料" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description1">説明文1</Label>
                      <Textarea
                        id="description1"
                        value="最新CPU、16GB RAM、1TB SSDを搭載した高性能ノートPC。ビジネスマンや学生に最適。"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description2">説明文2</Label>
                      <Textarea
                        id="description2"
                        value="20時間のバッテリー寿命と軽量1.2kgで持ち運びも安心。30日間返品保証付き。"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="displayUrl">表示URL</Label>
                      <Input id="displayUrl" value="example.com/xyz-2000" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="finalUrl">最終URL</Label>
                      <Input id="finalUrl" value="https://example.com/products/xyz-2000" />
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4 bg-muted/30">
                  <h3 className="text-sm font-medium mb-2">プレビュー</h3>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">
                      高性能ノートPC XYZ-2000 | 最新CPU搭載 | 20時間バッテリー搭載 | 期間限定20%オフ・送料無料
                    </div>
                    <div className="text-sm text-green-700">example.com/xyz-2000</div>
                    <div className="text-sm">
                      最新CPU、16GB RAM、1TB SSDを搭載した高性能ノートPC。ビジネスマンや学生に最適。
                    </div>
                    <div className="text-sm">
                      20時間のバッテリー寿命と軽量1.2kgで持ち運びも安心。30日間返品保証付き。
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="responsive" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">商品・サービス情報</h3>
                    <p className="text-xs text-muted-foreground">
                      以下の情報を入力すると、AIが複数の見出しと説明文を生成します。
                    </p>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="resp-product-name">商品・サービス名</Label>
                      <Input id="resp-product-name" placeholder="例: 高性能ノートパソコン XYZ-2000" />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="resp-product-features">主な特徴・セールスポイント</Label>
                      <Textarea
                        id="resp-product-features"
                        placeholder="例: 最新CPU搭載、16GB RAM、1TB SSD、バッテリー寿命20時間、軽量1.2kg"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="resp-target-audience">ターゲットオーディエンス</Label>
                      <Input id="resp-target-audience" placeholder="例: ビジネスマン、学生、クリエイター" />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="resp-promotion-details">プロモーション詳細（任意）</Label>
                      <Input id="resp-promotion-details" placeholder="例: 期間限定20%オフ、送料無料、30日間返品保証" />
                    </div>
                    <Button className="w-full mt-2" variant="secondary">
                      <SparklesIcon className="mr-2 h-4 w-4" />
                      AIにレスポンシブ広告を生成させる
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-2">生成された見出し（複数）</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="headline-1" defaultChecked />
                      <Label htmlFor="headline-1" className="text-sm">
                        高性能ノートPC XYZ-2000 | 最新CPU搭載
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="headline-2" defaultChecked />
                      <Label htmlFor="headline-2" className="text-sm">
                        20時間バッテリー搭載 | 軽量1.2kg
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="headline-3" defaultChecked />
                      <Label htmlFor="headline-3" className="text-sm">
                        期間限定20%オフ | 送料無料
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="headline-4" defaultChecked />
                      <Label htmlFor="headline-4" className="text-sm">
                        ビジネスマン・学生向け | 高性能PC
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="headline-5" defaultChecked />
                      <Label htmlFor="headline-5" className="text-sm">
                        16GB RAM & 1TB SSD | 快適動作
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <PlusIcon className="mr-2 h-3 w-3" />
                      見出しを追加
                    </Button>
                  </div>

                  <h3 className="text-sm font-medium mb-2 mt-4">生成された説明文（複数）</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="desc-1" defaultChecked />
                      <Label htmlFor="desc-1" className="text-sm">
                        最新CPU、16GB RAM、1TB SSDを搭載した高性能ノートPC。ビジネスマンや学生に最適。
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="desc-2" defaultChecked />
                      <Label htmlFor="desc-2" className="text-sm">
                        20時間のバッテリー寿命と軽量1.2kgで持ち運びも安心。30日間返品保証付き。
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="desc-3" defaultChecked />
                      <Label htmlFor="desc-3" className="text-sm">
                        期間限定20%オフキャンペーン実施中。送料無料でお届けします。
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="desc-4" defaultChecked />
                      <Label htmlFor="desc-4" className="text-sm">
                        公式サイト限定の特典付き。今すぐチェックしてください。
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <PlusIcon className="mr-2 h-3 w-3" />
                      説明文を追加
                    </Button>
                  </div>

                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="resp-displayUrl">表示URL</Label>
                    <Input id="resp-displayUrl" value="example.com/xyz-2000" />
                  </div>
                  <div className="grid gap-2 mt-2">
                    <Label htmlFor="resp-finalUrl">最終URL</Label>
                    <Input id="resp-finalUrl" value="https://example.com/products/xyz-2000" />
                  </div>
                </div>

                <div className="rounded-md border p-4 bg-muted/30">
                  <h3 className="text-sm font-medium mb-2">プレビュー例</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    レスポンシブ広告は、選択した見出しと説明文の組み合わせから最適なものが表示されます。以下は表示例です。
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">
                      高性能ノートPC XYZ-2000 | 最新CPU搭載 | 期間限定20%オフ | 送料無料
                    </div>
                    <div className="text-sm text-green-700">example.com/xyz-2000</div>
                    <div className="text-sm">
                      最新CPU、16GB RAM、1TB SSDを搭載した高性能ノートPC。ビジネスマンや学生に最適。
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">画像生成情報</h3>
                    <p className="text-xs text-muted-foreground">
                      以下の情報を入力すると、AIが広告用の画像を生成します。
                    </p>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="image-product-name">商品・サービス名</Label>
                      <Input id="image-product-name" placeholder="例: 高性能ノートパソコン XYZ-2000" />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="image-description">画像の詳細説明</Label>
                      <Textarea
                        id="image-description"
                        placeholder="例: モダンなデザインのノートパソコン。シルバーのアルミボディ。デスクの上に置かれている。背景はシンプルで明るい。"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="image-style">画像スタイル</Label>
                      <Select defaultValue="photorealistic">
                        <SelectTrigger id="image-style">
                          <SelectValue placeholder="スタイルを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="photorealistic">写真風リアル</SelectItem>
                          <SelectItem value="3d-render">3Dレンダリング</SelectItem>
                          <SelectItem value="flat-design">フラットデザイン</SelectItem>
                          <SelectItem value="minimalist">ミニマリスト</SelectItem>
                          <SelectItem value="artistic">アーティスティック</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="image-size">画像サイズ</Label>
                      <Select defaultValue="1200x628">
                        <SelectTrigger id="image-size">
                          <SelectValue placeholder="サイズを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1200x628">1200x628 (ソーシャルメディア)</SelectItem>
                          <SelectItem value="300x250">300x250 (ディスプレイ広告 中)</SelectItem>
                          <SelectItem value="336x280">336x280 (ディスプレイ広告 大)</SelectItem>
                          <SelectItem value="728x90">728x90 (リーダーボード)</SelectItem>
                          <SelectItem value="320x100">320x100 (モバイルバナー)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full mt-2" variant="secondary">
                      <SparklesIcon className="mr-2 h-4 w-4" />
                      AIに広告画像を生成させる
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-2">生成された画像</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="aspect-[1200/628] bg-muted rounded-md overflow-hidden">
                        <img
                          src="/placeholder.svg?height=628&width=1200"
                          alt="生成された広告画像"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm">
                          <CheckIcon className="mr-2 h-4 w-4" />
                          この画像を選択
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="aspect-[1200/628] bg-muted rounded-md overflow-hidden">
                        <img
                          src="/placeholder.svg?height=628&width=1200"
                          alt="生成された広告画像の別バージョン"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm">
                          <CheckIcon className="mr-2 h-4 w-4" />
                          この画像を選択
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <RefreshCwIcon className="mr-2 h-4 w-4" />
                    別のバリエーションを生成
                  </Button>

                  <div className="space-y-4 mt-6">
                    <div className="grid gap-2">
                      <Label htmlFor="image-ad-headline">広告見出し</Label>
                      <Input id="image-ad-headline" value="高性能ノートPC XYZ-2000 | 期間限定20%オフ" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image-ad-description">広告説明文</Label>
                      <Textarea
                        id="image-ad-description"
                        value="最新CPU搭載、20時間バッテリー、軽量1.2kg。ビジネスマンや学生に最適な高性能ノートPC。"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image-ad-finalUrl">最終URL</Label>
                      <Input id="image-ad-finalUrl" value="https://example.com/products/xyz-2000" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAdDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setNewAdDialogOpen(false)}>作成</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 広告編集ダイアログ */}
      <Dialog open={editAdDialogOpen} onOpenChange={setEditAdDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>広告の編集</DialogTitle>
            <DialogDescription>広告の内容を編集します。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-headline1">見出し1</Label>
              <Input
                id="edit-headline1"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.headline1 : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-headline2">見出し2</Label>
              <Input
                id="edit-headline2"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.headline2 : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-headline3">見出し3</Label>
              <Input
                id="edit-headline3"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.headline3 : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description1">説明文1</Label>
              <Textarea
                id="edit-description1"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.description1 : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description2">説明文2</Label>
              <Textarea
                id="edit-description2"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.description2 : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-displayUrl">表示URL</Label>
              <Input
                id="edit-displayUrl"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.displayUrl : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-finalUrl">最終URL</Label>
              <Input
                id="edit-finalUrl"
                defaultValue={selectedAd ? ads.find((ad) => ad.id === selectedAd)?.finalUrl : ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAdDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setEditAdDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
