"use client"

import { ArrowRightIcon, LightbulbIcon, SparklesIcon, TrendingUpIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AiSuggestionsTabProps {
  campaignId: string
}

export function AiSuggestionsTab({ campaignId }: AiSuggestionsTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Gemini AI 最適化提案</CardTitle>
            <CardDescription>AIによるキャンペーン最適化の提案</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="suggestions">
            <TabsList className="mb-4">
              <TabsTrigger value="suggestions">最適化提案</TabsTrigger>
              <TabsTrigger value="keywords">キーワード提案</TabsTrigger>
              <TabsTrigger value="ads">広告文提案</TabsTrigger>
            </TabsList>
            <TabsContent value="suggestions" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">入札戦略の最適化</p>
                    <p className="text-sm text-muted-foreground">
                      コンバージョン価値の最大化を目標とした自動入札に切り替えることで、ROASが20%向上する可能性があります。過去30日間のデータに基づく予測です。
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
                    <p className="font-medium">広告スケジュールの最適化</p>
                    <p className="text-sm text-muted-foreground">
                      コンバージョン率が高い時間帯（15時〜21時）に予算を重点的に配分するよう広告スケジュールを最適化することで、全体のコンバージョン率が8%向上する可能性があります。
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      提案を適用
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">デバイス別入札調整</p>
                    <p className="text-sm text-muted-foreground">
                      モバイルデバイスでのコンバージョン率がデスクトップより15%低いため、モバイルの入札単価を10%下げ、デスクトップの入札単価を15%上げることで、全体のROIを向上させることができます。
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
            <TabsContent value="keywords" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">追加キーワード提案</p>
                    <p className="text-sm text-muted-foreground">
                      以下のキーワードを追加することで、より多くの潜在顧客にリーチできる可能性があります：
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>「ECサイト 構築 費用」</li>
                      <li>「ネットショップ 初心者 開設方法」</li>
                      <li>「オンラインショップ 簡単 構築」</li>
                      <li>「ECサイト プラットフォーム 比較」</li>
                      <li>「ネットショップ 作り方 無料」</li>
                    </ul>
                    <Button variant="outline" size="sm" className="mt-2">
                      すべて追加
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-medium">低パフォーマンスキーワードの最適化</p>
                    <p className="text-sm text-muted-foreground">
                      以下のキーワードのパフォーマンスが低いため、一時停止または入札単価の見直しを検討してください：
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>「ネットショップ 作り方」（CTR: 2.85%、コンバージョン率: 4.44%）</li>
                      <li>「オンラインストア 構築」（CTR: 2.65%、コンバージョン率: 3.85%）</li>
                    </ul>
                    <Button variant="outline" size="sm" className="mt-2">
                      最適化を適用
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">除外キーワード提案</p>
                    <p className="text-sm text-muted-foreground">
                      以下のキーワードを除外キーワードとして追加することで、無関係なクリックを減らし、広告費用を最適化できます：
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>「無料」</li>
                      <li>「テンプレート ダウンロード」</li>
                      <li>「自作」</li>
                    </ul>
                    <Button variant="outline" size="sm" className="mt-2">
                      すべて追加
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ads" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">広告文の最適化提案</p>
                    <p className="text-sm text-muted-foreground">
                      以下の広告文要素を追加することで、CTRとコンバージョン率を向上させることができます：
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>「30日間無料トライアル」という特典を強調</li>
                      <li>「24時間サポート」という安心感を提供</li>
                      <li>「5分で簡単設定」という手軽さを訴求</li>
                    </ul>
                    <Button variant="outline" size="sm" className="mt-2">
                      広告文を生成
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-medium">新しい広告文の提案</p>
                    <p className="text-sm text-muted-foreground">
                      AIが生成した以下の広告文を追加することで、パフォーマンスを向上させることができます：
                    </p>
                    <div className="mt-2 space-y-4">
                      <div className="rounded-md border p-3">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-blue-600">
                            ECサイト構築 | 30日間無料トライアル | 24時間サポート
                          </div>
                          <div className="text-sm text-green-700">example.com/ec-site</div>
                          <div className="text-sm">5分で簡単設定。初心者でも安心のECサイト構築サービス。</div>
                          <div className="text-sm">30日間無料トライアル実施中。24時間サポート対応。</div>
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-blue-600">
                            ネットショップ開設 | 初期費用0円 | 売上アップ保証
                          </div>
                          <div className="text-sm text-green-700">example.com/netshop</div>
                          <div className="text-sm">初期費用0円でネットショップを今すぐ開設。簡単操作で売上アップ。</div>
                          <div className="text-sm">満足度98%の実績。売上アップ保証付き。今なら特典あり。</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      広告文を追加
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">レスポンシブ検索広告への移行</p>
                    <p className="text-sm text-muted-foreground">
                      標準的なテキスト広告からレスポンシブ検索広告に移行することで、より多くの広告バリエーションをテストでき、CTRが平均15%向上する可能性があります。
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      レスポンシブ広告を作成
                    </Button>
                  </div>
                </div>
              </div>
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
                  <p className="font-medium">キャンペーンパフォーマンス分析</p>
                  <p className="text-sm text-muted-foreground">
                    このキャンペーンの詳細なパフォーマンス分析と改善提案が含まれています。
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
                    業界内の競合他社の広告戦略とパフォーマンスを分析したレポートです。
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
                    今後30日間のパフォーマンス予測と最適な予算配分を分析したレポートです。
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
            <CardTitle>自動生成コンテンツ</CardTitle>
            <CardDescription>AIによる自動生成コンテンツ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <p className="font-medium">広告文生成</p>
                  <p className="text-sm text-muted-foreground">
                    Gemini AIを使用して、高パフォーマンスな広告文を自動生成します。
                  </p>
                  <Button variant="outline" size="sm">
                    広告文を生成
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <p className="font-medium">キーワード生成</p>
                  <p className="text-sm text-muted-foreground">
                    Gemini AIを使用して、関連性の高いキーワードを自動生成します。
                  </p>
                  <Button variant="outline" size="sm">
                    キーワードを生成
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <p className="font-medium">広告画像生成</p>
                  <p className="text-sm text-muted-foreground">Imagen AIを使用して、広告用の画像を自動生成します。</p>
                  <Button variant="outline" size="sm">
                    画像を生成
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
