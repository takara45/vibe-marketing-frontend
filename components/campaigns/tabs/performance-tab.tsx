"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CPCChart } from "@/components/campaigns/cpc-chart"
import { CPCMetricCard } from "@/components/ui/cpc-metric-card"

interface PerformanceTabProps {
  campaignId: string
}

export function PerformanceTab({ campaignId }: PerformanceTabProps) {
  // サンプルデータ
  const performanceData = [
    {
      date: "3/15",
      インプレッション: 5400,
      クリック: 180,
      コンバージョン: 9,
      費用: 36000,
    },
    {
      date: "3/16",
      インプレッション: 5800,
      クリック: 195,
      コンバージョン: 10,
      費用: 39000,
    },
    {
      date: "3/17",
      インプレッション: 5600,
      クリック: 190,
      コンバージョン: 9,
      費用: 38000,
    },
    {
      date: "3/18",
      インプレッション: 6100,
      クリック: 210,
      コンバージョン: 11,
      費用: 42000,
    },
    {
      date: "3/19",
      インプレッション: 6500,
      クリック: 230,
      コンバージョン: 12,
      費用: 46000,
    },
    {
      date: "3/20",
      インプレッション: 7200,
      クリック: 250,
      コンバージョン: 13,
      費用: 50000,
    },
    {
      date: "3/21",
      インプレッション: 7800,
      クリック: 265,
      コンバージョン: 14,
      費用: 53000,
    },
  ]

  // CPC分析データ
  const deviceCPCData = [
    { device: "mobile", cpc: 95.2, share: 58, color: "#3b82f6" },
    { device: "desktop", cpc: 86.7, share: 35, color: "#10b981" },
    { device: "tablet", cpc: 92.1, share: 7, color: "#f59e0b" },
  ]

  const locationCPCData = [
    { location: "東京", cpc: 102.3, volume: 45000 },
    { location: "大阪", cpc: 87.9, volume: 28000 },
    { location: "名古屋", cpc: 79.5, volume: 18000 },
    { location: "福岡", cpc: 71.2, volume: 12000 },
    { location: "その他", cpc: 85.8, volume: 22000 },
  ]

  const hourlyData = [
    { hour: "0-6", cpc: 65.2, competition: "低" },
    { hour: "6-12", cpc: 108.7, competition: "高" },
    { hour: "12-18", cpc: 118.9, competition: "高" },
    { hour: "18-24", cpc: 92.5, competition: "中" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DatePickerWithRange className="w-full md:w-auto" />
        <div className="flex gap-2">
          <Button variant="outline">前週比</Button>
          <Button variant="outline">前月比</Button>
          <Button variant="outline">エクスポート</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">インプレッション</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,230</div>
            <p className="text-xs text-muted-foreground">前週比: +12.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">クリック数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,520</div>
            <p className="text-xs text-muted-foreground">前週比: +7.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">コンバージョン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">前週比: +5.4%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">費用</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥320,000</div>
            <p className="text-xs text-muted-foreground">前週比: +8.1%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>パフォーマンス推移</CardTitle>
          <CardDescription>期間内の主要指標の推移</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="impressions">
            <TabsList className="mb-4">
              <TabsTrigger value="impressions">インプレッション</TabsTrigger>
              <TabsTrigger value="clicks">クリック</TabsTrigger>
              <TabsTrigger value="conversions">コンバージョン</TabsTrigger>
              <TabsTrigger value="cost">費用</TabsTrigger>
            </TabsList>
            <TabsContent value="impressions">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="インプレッション"
                    stroke="#0284c7"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="clicks">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="クリック" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="conversions">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="コンバージョン"
                    stroke="#22c55e"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="cost">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="費用" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>主要指標サマリー</CardTitle>
            <CardDescription>期間内の主要指標の概要</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">クリック率 (CTR)</p>
                  <p className="text-2xl font-bold">3.36%</p>
                  <p className="text-xs text-muted-foreground">前週比: +0.2%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">コンバージョン率</p>
                  <p className="text-2xl font-bold">5.13%</p>
                  <p className="text-xs text-muted-foreground">前週比: -0.1%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">平均クリック単価 (CPC)</p>
                  <p className="text-2xl font-bold">¥211</p>
                  <p className="text-xs text-muted-foreground">前週比: +¥5</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">コンバージョン単価 (CPA)</p>
                  <p className="text-2xl font-bold">¥4,103</p>
                  <p className="text-xs text-muted-foreground">前週比: +¥120</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>目標達成状況</CardTitle>
            <CardDescription>設定した目標に対する達成状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">インプレッション</p>
                  <p className="text-sm font-medium">90.5%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: "90.5%" }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 50,000</span>
                  <span>実績: 45,230</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">コンバージョン</p>
                  <p className="text-sm font-medium">97.5%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: "97.5%" }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 80</span>
                  <span>実績: 78</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">費用対効果 (ROAS)</p>
                  <p className="text-sm font-medium">116.7%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: "116.7%" }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 300%</span>
                  <span>実績: 350%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CPC分析セクション */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">CPC分析</h2>
          <Button variant="outline" size="sm">詳細レポート</Button>
        </div>

        {/* CPC推移チャート */}
        <CPCChart />

        {/* デバイス別CPC分析 */}
        <Card>
          <CardHeader>
            <CardTitle>デバイス別CPC分析</CardTitle>
            <CardDescription>デバイスタイプ別のクリック単価と配信量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {deviceCPCData.map((device) => (
                <CPCMetricCard
                  key={device.device}
                  title={`${device.device}デバイス`}
                  currentCPC={device.cpc}
                  previousCPC={device.cpc * 0.95} // 5%増加のモック
                  trend="up"
                  category={device.cpc > 90 ? "high" : device.cpc > 80 ? "medium" : "low"}
                  description={`配信シェア: ${device.share}%`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 地域別CPC分析 */}
        <Card>
          <CardHeader>
            <CardTitle>地域別CPC分析</CardTitle>
            <CardDescription>配信地域別のクリック単価とボリューム</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {locationCPCData.map((location) => (
                <div key={location.location} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{location.location}</div>
                    <div className="text-sm text-muted-foreground">
                      {location.volume.toLocaleString()} インプレッション
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold">¥{location.cpc.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">CPC</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      location.cpc > 95 ? 'bg-red-100 text-red-700' :
                      location.cpc > 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {location.cpc > 95 ? '高' : location.cpc > 80 ? '中' : '低'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 時間帯別CPC分析 */}
        <Card>
          <CardHeader>
            <CardTitle>時間帯別CPC分析</CardTitle>
            <CardDescription>時間帯別のクリック単価と競合状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {hourlyData.map((time) => (
                <div key={time.hour} className="p-4 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">{time.hour}時</div>
                  <div className="text-2xl font-bold mt-1">¥{time.cpc.toFixed(2)}</div>
                  <div className={`text-xs mt-2 px-2 py-1 rounded inline-block ${
                    time.competition === '高' ? 'bg-red-100 text-red-700' :
                    time.competition === '中' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    競合度: {time.competition}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CPC最適化提案 */}
        <Card>
          <CardHeader>
            <CardTitle>CPC最適化提案</CardTitle>
            <CardDescription>データに基づく最適化の推奨事項</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-900">デバイス配信の最適化</div>
                <div className="text-sm text-blue-700 mt-1">
                  デスクトップデバイスはCPCが低く効率的です。モバイル配信予算の一部をデスクトップに移行することを検討してください。
                </div>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-900">地域配信の最適化</div>
                <div className="text-sm text-green-700 mt-1">
                  福岡と名古屋はCPCが低く効率的な地域です。予算配分を増やすことでROASの改善が期待できます。
                </div>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-yellow-900">時間帯配信の最適化</div>
                <div className="text-sm text-yellow-700 mt-1">
                  0-6時は競合度が低くCPCが安価です。早朝配信の増強を検討し、競合の激しい12-18時は入札調整を行ってください。
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
