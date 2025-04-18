import { Badge } from "@/components/ui/badge"
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  LightbulbIcon,
  LineChartIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AiInsights() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Gemini AI 分析洞察</CardTitle>
            <CardDescription>AIによる広告パフォーマンスの分析と洞察</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance">
            <TabsList className="mb-4">
              <TabsTrigger value="performance">パフォーマンス分析</TabsTrigger>
              <TabsTrigger value="trends">トレンド分析</TabsTrigger>
              <TabsTrigger value="audience">オーディエンス分析</TabsTrigger>
              <TabsTrigger value="recommendations">改善提案</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LineChartIcon className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">パフォーマンス概要</p>
                    <p className="text-sm text-muted-foreground">
                      過去7日間のパフォーマンスは全体的に良好で、特にクリック数（+7.2%）とROAS（+14.3%）が前週比で向上しています。一方、コンバージョン数は目標に対して93.5%の達成率で、わずかに目標を下回っています。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-medium">キャンペーン別分析</p>
                    <p className="text-sm text-muted-foreground">
                      「リターゲティングキャンペーン」が最も高いROAS（420%）を示しており、効率的に機能しています。「春の新商品プロモーション」は最も多くのコンバージョン（78）を生成していますが、費用も最も高くなっています。「ブランド認知度向上キャンペーン」はROASが最も低く（220%）、最適化の余地があります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <BrainCircuitIcon className="mt-0.5 h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">キーワード効率分析</p>
                    <p className="text-sm text-muted-foreground">
                      ブランド名を含むキーワードが最も高いCTR（8.62%）とコンバージョン率（6.43%）を示しており、最も効率的です。「ECサイト
                      構築」と「オンラインショップ 開設」も良好なパフォーマンスを示していますが、「ネットショップ
                      作り方」はCTRが低く（2.85%）、最適化が必要です。
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="w-full">
                詳細な分析を見る
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
            <TabsContent value="trends" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">パフォーマンストレンド</p>
                    <p className="text-sm text-muted-foreground">
                      過去30日間のデータを分析すると、週末（土日）にクリック数が約15%減少する傾向がありますが、コンバージョン率は平日より約8%高くなっています。また、15時〜21時の時間帯にコンバージョン率が最も高くなる傾向があります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LineChartIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-medium">季節的要因</p>
                    <p className="text-sm text-muted-foreground">
                      春季（3月〜5月）は例年、ECサイト構築関連のキーワードの検索ボリュームが約20%増加する傾向があります。現在のキャンペーンはこの季節的トレンドを活かせています。来月は「ゴールデンウィーク」に向けた準備として、特別プロモーションの計画を検討することをお勧めします。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <BrainCircuitIcon className="mt-0.5 h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">競合分析</p>
                    <p className="text-sm text-muted-foreground">
                      業界全体では、モバイルでの広告表示が前年比で25%増加しており、モバイル最適化がますます重要になっています。競合他社と比較すると、当社のモバイルコンバージョン率（4.8%）は業界平均（4.2%）を上回っていますが、デスクトップでのパフォーマンス（5.6%）には及びません。
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="w-full">
                詳細なトレンド分析を見る
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
            <TabsContent value="audience" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LineChartIcon className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">オーディエンス洞察</p>
                    <p className="text-sm text-muted-foreground">
                      35-44歳の年齢層が最も高いコンバージョン率（6.1%）を示しており、この層へのターゲティングを強化することで効率を向上できる可能性があります。また、女性ユーザー（5.3%）は男性ユーザー（4.8%）よりもわずかに高いコンバージョン率を示しています。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-medium">興味関心カテゴリ分析</p>
                    <p className="text-sm text-muted-foreground">
                      「テクノロジー」と「ビジネス」カテゴリに興味を持つユーザーが最も多くのコンバージョンを生成しています。特に「テクノロジー」カテゴリのユーザーは、平均よりも30%高いコンバージョン価値を示しています。これらのカテゴリへのターゲティングを強化することで、ROIを向上させることができます。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <BrainCircuitIcon className="mt-0.5 h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">地域別分析</p>
                    <p className="text-sm text-muted-foreground">
                      東京（35%）と大阪（20%）からのトラフィックが最も多いですが、コンバージョン率は名古屋（6.2%）が最も高くなっています。名古屋地域へのターゲティングを強化することで、効率を向上させることができます。また、福岡地域は前月比でトラフィックが25%増加しており、成長市場として注目すべきです。
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="link" className="w-full">
                詳細なオーディエンス分析を見る
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
            <TabsContent value="recommendations" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">キーワード最適化</p>
                    <p className="text-sm text-muted-foreground">
                      「ネットショップ 作り方」キーワードのパフォーマンスが低下しています。より具体的な「ネットショップ
                      初心者 開設方法」や「ネットショップ 簡単
                      構築」などの長尾キーワードを追加することで、より意図の明確なユーザーを獲得できる可能性があります。また、「ECサイト
                      構築 費用」のような価格関連キーワードも追加することをお勧めします。
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      提案を適用
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-medium">予算最適化</p>
                    <p className="text-sm text-muted-foreground">
                      リターゲティングキャンペーンのROIが420%と非常に高いため、このキャンペーンの予算を20%増加させることをお勧めします。また、ブランド認知度向上キャンペーンのROIが220%と比較的低いため、広告クリエイティブの改善やターゲティングの見直しを行うことで、効率を向上させることができます。
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      提案を適用
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <BrainCircuitIcon className="mt-0.5 h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">オーディエンス最適化</p>
                    <p className="text-sm text-muted-foreground">
                      35-44歳の年齢層と「テクノロジー」「ビジネス」カテゴリに興味を持つユーザーへのターゲティングを強化することをお勧めします。また、名古屋地域のユーザーへのリーチを拡大することで、コンバージョン率を向上させることができます。デスクトップユーザーのパフォーマンスが高いため、デスクトップ向け広告のクリエイティブを最適化することも効果的です。
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      提案を適用
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="link" className="w-full">
                すべての提案を見る
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI分析レポート</CardTitle>
            <CardDescription>Gemini AIによる詳細な分析レポート</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <p className="font-medium">週次パフォーマンスレポート</p>
                  <p className="text-sm text-muted-foreground">
                    過去7日間のパフォーマンスを詳細に分析したレポートです。キャンペーン別、広告グループ別、キーワード別のパフォーマンスと改善提案が含まれています。
                  </p>
                  <Button variant="outline" size="sm">
                    レポートを表示
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <p className="font-medium">競合分析レポート</p>
                  <p className="text-sm text-muted-foreground">
                    業界内の競合他社の広告戦略とパフォーマンスを分析したレポートです。競合他社のキーワード、広告コピー、ポジショニングの分析が含まれています。
                  </p>
                  <Button variant="outline" size="sm">
                    レポートを表示
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <p className="font-medium">予測分析レポート</p>
                  <p className="text-sm text-muted-foreground">
                    今後30日間のパフォーマンス予測と最適な予算配分を分析したレポートです。季節的要因やトレンドを考慮した予測が含まれています。
                  </p>
                  <Button variant="outline" size="sm">
                    レポートを表示
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI最適化アクション</CardTitle>
            <CardDescription>Gemini AIによる自動最適化アクション</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">自動入札戦略の最適化</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      実行済み
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    コンバージョン価値の最大化を目標とした自動入札に切り替えました。過去7日間のデータに基づいて入札戦略を最適化しました。
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>実行日: 2024年3月20日</span>
                    <span>効果: ROAS +12%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">広告スケジュールの最適化</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      実行済み
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    コンバージョン率が高い時間帯（15時〜21時）に予算を重点的に配分するよう広告スケジュールを最適化しました。
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>実行日: 2024年3月18日</span>
                    <span>効果: コンバージョン率 +8%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">低パフォーマンスキーワードの一時停止</p>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      承認待ち
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ROIが低く、コンバージョンを生成していない5つのキーワードを一時停止することを提案しています。これにより、予算をより効率的なキーワードに再配分できます。
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      詳細を表示
                    </Button>
                    <Button size="sm">承認</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
