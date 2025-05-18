"use client";

import { useState, useEffect } from "react";
import {
  BarChart3Icon,
  BrainCircuitIcon,
  LineChartIcon,
  RefreshCwIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { generateResponsePartAds } from "@/lib/gemini-api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useGoogleAdsAIStore } from "@/lib/store/useGoogleAdsAIStore";
import { Progress } from "@/components/ui/progress";

interface GoogleAdsAITabProps {
  campaignId: string;
}

export function GoogleAdsAITab({ campaignId }: GoogleAdsAITabProps) {
  const [activeTab, setActiveTab] = useState("bidding");
  const [bidStrategy, setBidStrategy] = useState("maximize_conversions");
  const [targetCPA, setTargetCPA] = useState(2000);
  const [targetROAS, setTargetROAS] = useState(300);

  // Use the Google Ads AI store
  const {
    settings,
    optimizationSuggestions,
    audienceInsights,
    isLoading,
    error,
    fetchSettings,
    updateSettings,
    fetchOptimizationSuggestions,
    applyOptimizationSuggestion,
    fetchAudienceInsights,
    addAudience,
    removeAudience,
  } = useGoogleAdsAIStore();

  // Destructure settings for easier access
  const {
    isAIBiddingEnabled,
    isAIOptimizationEnabled,
    isAIAudienceEnabled,
    optimizationScore,
  } = settings;

  // Fetch data on component mount
  useEffect(() => {
    fetchSettings(campaignId);
    fetchOptimizationSuggestions(campaignId);
    fetchAudienceInsights(campaignId);
  }, [
    campaignId,
    fetchSettings,
    fetchOptimizationSuggestions,
    fetchAudienceInsights,
  ]);

  // Update settings when toggles are changed
  const handleToggleAIBidding = (enabled: boolean) => {
    updateSettings({ isAIBiddingEnabled: enabled });
  };

  const handleToggleAIOptimization = (enabled: boolean) => {
    updateSettings({ isAIOptimizationEnabled: enabled });
  };

  const handleToggleAIAudience = (enabled: boolean) => {
    updateSettings({ isAIAudienceEnabled: enabled });
  };

  const handleApplyOptimization = (id: string) => {
    applyOptimizationSuggestion(id);
  };

  const handleAddAudience = (id: string) => {
    addAudience(id);
  };

  const handleRemoveAudience = (id: string) => {
    removeAudience(id);
  };

  const handleRefreshInsights = () => {
    fetchOptimizationSuggestions(campaignId);
    fetchAudienceInsights(campaignId);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Google広告 AI機能</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                const result = await generateResponsePartAds(
                  "Google広告キャンペーン",
                  "広告主",
                  { tone: "プロフェッショナル" }
                );
                alert(`レスポンス部広告の例:\n${result.join("\n")}`);
              } catch (err) {
                console.error("Failed to generate response part ads", err);
                alert("レスポンス部広告の生成に失敗しました");
              }
            }}
          >
            レスポンス部広告を生成
          </Button>
        </div>
        <Button
          onClick={handleRefreshInsights}
          disabled={isLoading}
          size="sm"
          className="sm:size-default w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">更新中...</span>
              <span className="sm:hidden">更新中</span>
            </>
          ) : (
            <>
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">インサイトを更新</span>
              <span className="sm:hidden">更新</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="bidding"
            className="flex items-center justify-center"
          >
            <BrainCircuitIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">自動入札</span>
            <span className="sm:hidden">入札</span>
          </TabsTrigger>
          <TabsTrigger
            value="optimization"
            className="flex items-center justify-center"
          >
            <BarChart3Icon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">パフォーマンス最適化</span>
            <span className="sm:hidden">最適化</span>
          </TabsTrigger>
          <TabsTrigger
            value="audience"
            className="flex items-center justify-center"
          >
            <UsersIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">
              オーディエンスターゲティング
            </span>
            <span className="sm:hidden">ターゲット</span>
          </TabsTrigger>
        </TabsList>

        {/* 自動入札タブ */}
        <TabsContent value="bidding" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>スマート入札戦略</CardTitle>
                  <CardDescription>
                    Google AIを活用した自動入札戦略を設定します。
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-bidding"
                    checked={isAIBiddingEnabled}
                    onCheckedChange={handleToggleAIBidding}
                  />
                  <Label htmlFor="ai-bidding">
                    {isAIBiddingEnabled ? "有効" : "無効"}
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bid-strategy">入札戦略</Label>
                <Select
                  value={bidStrategy}
                  onValueChange={setBidStrategy}
                  disabled={!isAIBiddingEnabled}
                >
                  <SelectTrigger id="bid-strategy">
                    <SelectValue placeholder="入札戦略を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maximize_conversions">
                      コンバージョン数の最大化
                    </SelectItem>
                    <SelectItem value="target_cpa">
                      目標コンバージョン単価（tCPA）
                    </SelectItem>
                    <SelectItem value="maximize_conversion_value">
                      コンバージョン価値の最大化
                    </SelectItem>
                    <SelectItem value="target_roas">
                      目標広告費用対効果（tROAS）
                    </SelectItem>
                    <SelectItem value="maximize_clicks">
                      クリック数の最大化
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {bidStrategy === "target_cpa" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="target-cpa">
                      目標コンバージョン単価: ¥{targetCPA.toLocaleString()}
                    </Label>
                  </div>
                  <Slider
                    id="target-cpa"
                    value={[targetCPA]}
                    min={500}
                    max={10000}
                    step={100}
                    onValueChange={(value) => setTargetCPA(value[0])}
                    disabled={!isAIBiddingEnabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    過去30日間の平均コンバージョン単価: ¥2,350
                  </p>
                </div>
              )}

              {bidStrategy === "target_roas" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="target-roas">目標ROAS: {targetROAS}%</Label>
                  </div>
                  <Slider
                    id="target-roas"
                    value={[targetROAS]}
                    min={100}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setTargetROAS(value[0])}
                    disabled={!isAIBiddingEnabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    過去30日間の平均ROAS: 280%
                  </p>
                </div>
              )}

              <div className="rounded-md bg-blue-50 p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <BrainCircuitIcon className="h-5 w-5 text-blue-700 hidden sm:block" />
                  <div className="sm:ml-3">
                    <h3 className="text-sm font-medium text-blue-700 flex items-center">
                      <BrainCircuitIcon className="h-4 w-4 mr-1 sm:hidden text-blue-700" />
                      AIによる入札最適化の予測
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        選択した入札戦略を適用すると、以下の効果が期待できます：
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>コンバージョン数: 約15%増加</li>
                        <li>平均CPC: 約5%削減</li>
                        <li>CTR: 約8%向上</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!isAIBiddingEnabled}
                onClick={() => {
                  updateSettings({
                    biddingStrategy: {
                      type: bidStrategy as any,
                      targetCPA:
                        bidStrategy === "target_cpa" ? targetCPA : undefined,
                      targetROAS:
                        bidStrategy === "target_roas" ? targetROAS : undefined,
                      adjustments: settings.biddingStrategy.adjustments,
                    },
                  });
                }}
              >
                入札戦略を適用
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>詳細設定</CardTitle>
              <CardDescription>入札戦略の詳細設定を行います。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="device-adjustment">デバイス別入札調整</Label>
                  <Switch
                    id="device-adjustment"
                    checked={settings.biddingStrategy.adjustments.device}
                    onCheckedChange={(checked) => {
                      updateSettings({
                        biddingStrategy: {
                          ...settings.biddingStrategy,
                          adjustments: {
                            ...settings.biddingStrategy.adjustments,
                            device: checked,
                          },
                        },
                      });
                    }}
                    disabled={!isAIBiddingEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  デバイスごとに異なる入札調整を適用します。
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location-adjustment">地域別入札調整</Label>
                  <Switch
                    id="location-adjustment"
                    checked={settings.biddingStrategy.adjustments.location}
                    onCheckedChange={(checked) => {
                      updateSettings({
                        biddingStrategy: {
                          ...settings.biddingStrategy,
                          adjustments: {
                            ...settings.biddingStrategy.adjustments,
                            location: checked,
                          },
                        },
                      });
                    }}
                    disabled={!isAIBiddingEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  地域ごとに異なる入札調整を適用します。
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="audience-adjustment">
                    オーディエンス別入札調整
                  </Label>
                  <Switch
                    id="audience-adjustment"
                    checked={settings.biddingStrategy.adjustments.audience}
                    onCheckedChange={(checked) => {
                      updateSettings({
                        biddingStrategy: {
                          ...settings.biddingStrategy,
                          adjustments: {
                            ...settings.biddingStrategy.adjustments,
                            audience: checked,
                          },
                        },
                      });
                    }}
                    disabled={!isAIBiddingEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  オーディエンスごとに異なる入札調整を適用します。
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-adjustment">時間帯別入札調整</Label>
                  <Switch
                    id="time-adjustment"
                    checked={settings.biddingStrategy.adjustments.time}
                    onCheckedChange={(checked) => {
                      updateSettings({
                        biddingStrategy: {
                          ...settings.biddingStrategy,
                          adjustments: {
                            ...settings.biddingStrategy.adjustments,
                            time: checked,
                          },
                        },
                      });
                    }}
                    disabled={!isAIBiddingEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  時間帯ごとに異なる入札調整を適用します。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* パフォーマンス最適化タブ */}
        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>パフォーマンス最適化</CardTitle>
                  <CardDescription>
                    Google AIを活用したパフォーマンス最適化を行います。
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-optimization"
                    checked={isAIOptimizationEnabled}
                    onCheckedChange={handleToggleAIOptimization}
                  />
                  <Label htmlFor="ai-optimization">
                    {isAIOptimizationEnabled ? "有効" : "無効"}
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>最適化スコア</Label>
                  <Badge
                    variant="outline"
                    className={
                      optimizationScore >= 80
                        ? "bg-green-50 text-green-700"
                        : optimizationScore >= 60
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }
                  >
                    {optimizationScore}%
                  </Badge>
                </div>
                <Progress value={optimizationScore} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  最適化スコアが高いほど、キャンペーンのパフォーマンスが向上します。
                </p>
              </div>

              <div className="space-y-2">
                <Label>最適化提案</Label>
                <div className="space-y-3">
                  {optimizationSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="rounded-md border p-3 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <div className="flex items-center justify-between sm:justify-start">
                            <h4 className="font-medium">{suggestion.title}</h4>
                            <Badge
                              variant="outline"
                              className={`ml-2 sm:ml-3 sm:hidden ${
                                suggestion.impact === "high"
                                  ? "bg-green-50 text-green-700"
                                  : suggestion.impact === "medium"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              影響度:{" "}
                              {suggestion.impact === "high"
                                ? "高"
                                : suggestion.impact === "medium"
                                ? "中"
                                : "低"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {suggestion.description}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`hidden sm:inline-flex ${
                            suggestion.impact === "high"
                              ? "bg-green-50 text-green-700"
                              : suggestion.impact === "medium"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          影響度:{" "}
                          {suggestion.impact === "high"
                            ? "高"
                            : suggestion.impact === "medium"
                            ? "中"
                            : "低"}
                        </Badge>
                      </div>
                      <div className="flex justify-end">
                        {suggestion.status === "applied" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            適用済み
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApplyOptimization(suggestion.id)
                            }
                            disabled={!isAIOptimizationEnabled}
                          >
                            適用する
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!isAIOptimizationEnabled}
                onClick={() => {
                  optimizationSuggestions
                    .filter((s) => s.status === "pending")
                    .forEach((s) => applyOptimizationSuggestion(s.id));
                }}
              >
                すべての提案を適用
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>自動最適化設定</CardTitle>
              <CardDescription>自動最適化の設定を行います。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-apply">自動適用</Label>
                  <Switch
                    id="auto-apply"
                    checked={settings.autoApplyOptimizations}
                    onCheckedChange={(checked) => {
                      updateSettings({ autoApplyOptimizations: checked });
                    }}
                    disabled={!isAIOptimizationEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  影響度が「高」の最適化提案を自動的に適用します。
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification">最適化通知</Label>
                  <Switch
                    id="notification"
                    checked={settings.optimizationNotifications}
                    onCheckedChange={(checked) => {
                      updateSettings({ optimizationNotifications: checked });
                    }}
                    disabled={!isAIOptimizationEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  新しい最適化提案があった場合に通知を受け取ります。
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-report">週次レポート</Label>
                  <Switch
                    id="weekly-report"
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => {
                      updateSettings({ weeklyReports: checked });
                    }}
                    disabled={!isAIOptimizationEnabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  週次の最適化レポートを受け取ります。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* オーディエンスターゲティングタブ */}
        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AIオーディエンスターゲティング</CardTitle>
                  <CardDescription>
                    Google AIを活用したオーディエンスターゲティングを行います。
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-audience"
                    checked={isAIAudienceEnabled}
                    onCheckedChange={handleToggleAIAudience}
                  />
                  <Label htmlFor="ai-audience">
                    {isAIAudienceEnabled ? "有効" : "無効"}
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>オーディエンスインサイト</Label>
                <div className="space-y-3">
                  {audienceInsights.map((audience) => (
                    <div
                      key={audience.id}
                      className="rounded-md border p-3 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <div className="flex items-center justify-between sm:justify-start">
                            <h4 className="font-medium">{audience.name}</h4>
                            <Badge
                              variant="outline"
                              className={`ml-2 sm:hidden ${
                                audience.status === "active"
                                  ? "bg-green-50 text-green-700"
                                  : audience.status === "recommended"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              {audience.status === "active"
                                ? "アクティブ"
                                : audience.status === "recommended"
                                ? "推奨"
                                : "非アクティブ"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {audience.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              サイズ:{" "}
                              {audience.size === "small"
                                ? "小"
                                : audience.size === "medium"
                                ? "中"
                                : "大"}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                audience.performance === "high"
                                  ? "bg-green-50 text-green-700"
                                  : audience.performance === "medium"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-red-50 text-red-700"
                              }
                            >
                              パフォーマンス:{" "}
                              {audience.performance === "high"
                                ? "高"
                                : audience.performance === "medium"
                                ? "中"
                                : "低"}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`hidden sm:inline-flex ${
                            audience.status === "active"
                              ? "bg-green-50 text-green-700"
                              : audience.status === "recommended"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {audience.status === "active"
                            ? "アクティブ"
                            : audience.status === "recommended"
                            ? "推奨"
                            : "非アクティブ"}
                        </Badge>
                      </div>
                      <div className="flex justify-end">
                        {audience.status === "active" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveAudience(audience.id)}
                            disabled={!isAIAudienceEnabled}
                            className="w-full sm:w-auto"
                          >
                            <span className="hidden sm:inline">削除</span>
                            <span className="sm:hidden">削除</span>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleAddAudience(audience.id)}
                            disabled={!isAIAudienceEnabled}
                            className="w-full sm:w-auto"
                          >
                            <span className="hidden sm:inline">追加する</span>
                            <span className="sm:hidden">追加</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!isAIAudienceEnabled}
                onClick={() => {
                  audienceInsights
                    .filter((a) => a.status === "recommended")
                    .forEach((a) => addAudience(a.id));
                }}
                className="w-full sm:w-auto"
              >
                <span className="hidden sm:inline">
                  すべての推奨オーディエンスを追加
                </span>
                <span className="sm:hidden">すべて追加</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>類似オーディエンス作成</CardTitle>
              <CardDescription>
                既存のオーディエンスに基づいて類似オーディエンスを作成します。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-audience">ソースオーディエンス</Label>
                <Select disabled={!isAIAudienceEnabled}>
                  <SelectTrigger id="source-audience">
                    <SelectValue placeholder="ソースオーディエンスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="converters">
                      コンバージョン完了ユーザー
                    </SelectItem>
                    <SelectItem value="cart_abandoners">
                      カート放棄ユーザー
                    </SelectItem>
                    <SelectItem value="high_value">高価値顧客</SelectItem>
                    <SelectItem value="repeat_customers">
                      リピート顧客
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="similarity-level">類似度</Label>
                  <span className="text-sm">5</span>
                </div>
                <Slider
                  id="similarity-level"
                  defaultValue={[5]}
                  min={1}
                  max={10}
                  step={1}
                  disabled={!isAIAudienceEnabled}
                />
                <p className="text-xs text-muted-foreground">
                  類似度が高いほど、ソースオーディエンスに近いユーザーが含まれます。
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience-size">オーディエンスサイズ</Label>
                <Select disabled={!isAIAudienceEnabled}>
                  <SelectTrigger id="audience-size">
                    <SelectValue placeholder="オーディエンスサイズを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">小 (1-3%)</SelectItem>
                    <SelectItem value="medium">中 (3-7%)</SelectItem>
                    <SelectItem value="large">大 (7-10%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!isAIAudienceEnabled}
                className="w-full sm:w-auto"
              >
                <span className="hidden sm:inline">
                  類似オーディエンスを作成
                </span>
                <span className="sm:hidden">作成</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
