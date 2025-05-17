"use client";

import { useState } from "react";
import {
  CopyIcon,
  ImageIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  TextIcon,
  TrashIcon,
} from "lucide-react";
import { generateAdImage } from "@/lib/imagen-api";
import { generateAdText } from "@/lib/gemini-api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdsTabProps {
  campaignId: string;
}

export function AdsTab({ campaignId }: AdsTabProps) {
  const [newAdDialogOpen, setNewAdDialogOpen] = useState(false);
  const [selectedAdGroup, setSelectedAdGroup] = useState<string | null>(null);

  // Image generation states
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImagePrompt, setSelectedImagePrompt] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);

  // Text generation states
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [generatedAdText, setGeneratedAdText] = useState<{
    headlines?: string[];
    descriptions?: string[];
  }>({});
  const [textProductInfo, setTextProductInfo] = useState("");
  const [textTargetAudience, setTextTargetAudience] = useState(
    "デジタル広告に興味のある25-45歳の消費者"
  );
  const [textError, setTextError] = useState<string | null>(null);

  // サンプルデータ
  const adGroups = [
    { id: "1", name: "商品A - 検索広告" },
    { id: "2", name: "商品B - 検索広告" },
    { id: "3", name: "ブランドキーワード" },
  ];

  const ads = [
    {
      id: "1",
      adGroupId: "1",
      type: "text",
      status: "active",
      headline1: "高品質な商品A | 今だけ特別価格",
      headline2: "公式サイトで安心購入",
      headline3: "送料無料・即日発送",
      description1:
        "高品質な商品Aを特別価格でご提供。公式サイトなら安心の保証付き。",
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
      description1:
        "最新モデルの商品Aが入荷しました。公式サイト限定の特典付き。",
      description2:
        "安心の品質保証と24時間サポート対応。今なら送料無料でお届け。",
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
      description1:
        "[ブランド名]の公式サイト。安心の正規品を全国送料無料でお届け。",
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
  ];

  const filteredAds = selectedAdGroup
    ? ads.filter((ad) => ad.adGroupId === selectedAdGroup)
    : ads;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select
            onValueChange={(value) =>
              setSelectedAdGroup(value === "all" ? null : value)
            }
          >
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
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
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
                        {
                          adGroups.find((group) => group.id === ad.adGroupId)
                            ?.name
                        }
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
                    <div className="text-sm text-green-700">
                      {ad.displayUrl}
                    </div>
                    <div className="text-sm">{ad.description1}</div>
                    <div className="text-sm">{ad.description2}</div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        インプレッション
                      </span>
                      <span className="font-medium">
                        {ad.impressions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">クリック数</span>
                      <span className="font-medium">
                        {ad.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CTR</span>
                      <span className="font-medium">{ad.ctr.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        コンバージョン
                      </span>
                      <span className="font-medium">{ad.conversions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        コンバージョン率
                      </span>
                      <span className="font-medium">
                        {ad.convRate.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">費用</span>
                      <span className="font-medium">
                        ¥{ad.cost.toLocaleString()}
                      </span>
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
            <DialogDescription>
              新しい広告を作成します。広告タイプを選択してください。
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">テキスト広告</TabsTrigger>
              <TabsTrigger value="responsive">レスポンシブ広告</TabsTrigger>
              <TabsTrigger value="image">画像広告</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">テキスト広告</p>
                  <p className="text-sm text-muted-foreground">
                    検索結果に表示される標準的なテキスト広告です。見出し、説明文、URLを設定できます。
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">AIで広告テキストを生成</p>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="text-product-info"
                        className="text-sm font-medium"
                      >
                        商品・サービス情報
                      </label>
                      <textarea
                        id="text-product-info"
                        className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="例: 高品質な有機コーヒー豆、エチオピア産、深煎り"
                        value={textProductInfo}
                        onChange={(e) => setTextProductInfo(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label
                        htmlFor="text-target-audience"
                        className="text-sm font-medium"
                      >
                        ターゲットオーディエンス
                      </label>
                      <textarea
                        id="text-target-audience"
                        className="min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="例: デジタル広告に興味のある25-45歳の消費者"
                        value={textTargetAudience}
                        onChange={(e) => setTextTargetAudience(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setTextProductInfo(
                            "高品質な有機コーヒー豆、エチオピア産、深煎り"
                          )
                        }
                      >
                        コーヒー
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setTextProductInfo(
                            "プレミアムスキンケア製品、自然由来成分、敏感肌向け"
                          )
                        }
                      >
                        スキンケア
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setTextProductInfo(
                            "高性能ワイヤレスイヤホン、ノイズキャンセリング機能付き"
                          )
                        }
                      >
                        イヤホン
                      </Button>
                    </div>

                    <Button
                      onClick={async () => {
                        if (!textProductInfo) return;

                        setIsGeneratingText(true);
                        setTextError(null);

                        try {
                          const adText = await generateAdText(
                            textProductInfo,
                            textTargetAudience,
                            "both"
                          );
                          setGeneratedAdText(adText);
                        } catch (error) {
                          console.error("Text generation error:", error);
                          setTextError(
                            "広告テキストの生成中にエラーが発生しました。後でもう一度お試しください。"
                          );
                        } finally {
                          setIsGeneratingText(false);
                        }
                      }}
                      disabled={isGeneratingText || !textProductInfo}
                    >
                      {isGeneratingText ? (
                        <>
                          <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <TextIcon className="mr-2 h-4 w-4" />
                          広告テキストを生成
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {textError && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                    {textError}
                  </div>
                )}

                {/* 生成された見出しと説明文の表示 */}
                {generatedAdText.headlines &&
                  generatedAdText.headlines.length > 0 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">生成された見出し</p>
                        <div className="grid gap-2">
                          {generatedAdText.headlines.map((headline, index) => (
                            <div
                              key={`headline-${index}`}
                              className="rounded-md border p-3"
                            >
                              <div className="flex justify-between items-center">
                                <div className="text-sm font-medium text-blue-600">
                                  {headline}
                                </div>
                                <Button variant="ghost" size="sm">
                                  <CopyIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {generatedAdText.descriptions &&
                        generatedAdText.descriptions.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">
                              生成された説明文
                            </p>
                            <div className="grid gap-2">
                              {generatedAdText.descriptions.map(
                                (description, index) => (
                                  <div
                                    key={`description-${index}`}
                                    className="rounded-md border p-3"
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="text-sm">
                                        {description}
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <CopyIcon className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                {/* プレビューセクション - 常に表示 */}
                <div className="rounded-md border p-4 mt-4 bg-white">
                  <p className="text-sm font-medium mb-2">プレビュー</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">
                      {generatedAdText.headlines &&
                      generatedAdText.headlines.length > 0
                        ? generatedAdText.headlines.slice(0, 3).join(" | ")
                        : "見出し1 | 見出し2 | 見出し3"}
                    </div>
                    <div className="text-sm text-green-700">example.com</div>
                    <div className="text-sm">
                      {generatedAdText.descriptions &&
                      generatedAdText.descriptions.length > 0
                        ? generatedAdText.descriptions[0]
                        : "説明文1がここに表示されます。"}
                    </div>
                    <div className="text-sm">
                      {generatedAdText.descriptions &&
                      generatedAdText.descriptions.length > 1
                        ? generatedAdText.descriptions[1]
                        : "説明文2がここに表示されます。"}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="responsive" className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">レスポンシブ検索広告</p>
                <p className="text-sm text-muted-foreground">
                  複数の見出しと説明文を設定し、Google
                  AIが最適な組み合わせを自動的に表示します。
                </p>
                <div className="rounded-md border p-4 mt-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-600">
                      見出し例1 | 見出し例2 | 見出し例3
                    </div>
                    <div className="text-sm text-green-700">example.com</div>
                    <div className="text-sm">
                      説明文例1がここに表示されます。
                    </div>
                    <div className="text-sm">
                      説明文例2がここに表示されます。
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="image" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">画像広告</p>
                  <p className="text-sm text-muted-foreground">
                    ディスプレイネットワークに表示される画像広告です。AIを使って画像を生成するか、自分で画像をアップロードできます。
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">AIで画像を生成</p>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="product-info"
                        className="text-sm font-medium"
                      >
                        商品・サービス情報
                      </label>
                      <textarea
                        id="product-info"
                        className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="例: 高品質な有機コーヒー豆、エチオピア産、深煎り"
                        value={selectedImagePrompt}
                        onChange={(e) => setSelectedImagePrompt(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedImagePrompt(
                            "高品質な有機コーヒー豆、エチオピア産、深煎り"
                          )
                        }
                      >
                        コーヒー
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedImagePrompt(
                            "プレミアムスキンケア製品、自然由来成分、敏感肌向け"
                          )
                        }
                      >
                        スキンケア
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedImagePrompt(
                            "高性能ワイヤレスイヤホン、ノイズキャンセリング機能付き"
                          )
                        }
                      >
                        イヤホン
                      </Button>
                    </div>

                    <Button
                      onClick={async () => {
                        if (!selectedImagePrompt) return;

                        setIsGeneratingImage(true);
                        setImageError(null);

                        try {
                          const images = await generateAdImage(
                            selectedImagePrompt,
                            "デジタル広告に興味のある25-45歳の消費者",
                            "square"
                          );
                          setGeneratedImages(images);
                        } catch (error) {
                          console.error("Image generation error:", error);
                          setImageError(
                            "画像の生成中にエラーが発生しました。後でもう一度お試しください。"
                          );
                        } finally {
                          setIsGeneratingImage(false);
                        }
                      }}
                      disabled={isGeneratingImage || !selectedImagePrompt}
                    >
                      {isGeneratingImage ? (
                        <>
                          <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          画像を生成
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {imageError && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                    {imageError}
                  </div>
                )}

                {generatedImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">生成された画像</p>
                    <div className="grid grid-cols-2 gap-4">
                      {generatedImages.map((image, index) => (
                        <div key={index} className="rounded-md border p-2">
                          <img
                            src={`data:image/png;base64,${image}`}
                            alt={`Generated ad image ${index + 1}`}
                            className="w-full h-auto rounded"
                          />
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm">
                              選択
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!generatedImages.length && !isGeneratingImage && (
                  <div className="rounded-md border p-4 mt-2 flex justify-center">
                    <div className="w-[300px] h-[250px] bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">
                          AIで画像を生成するか、画像をアップロードしてください
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
  );
}
