"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium mb-3">ユーザー属性別パフォーマンス</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">最効果的年齢層</p>
                    <p className="text-lg font-bold">35-44歳</p>
                    <p className="text-xs text-muted-foreground">CV率: 6.73%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">最効果的性別</p>
                    <p className="text-lg font-bold">女性</p>
                    <p className="text-xs text-muted-foreground">CV率: 6.48%</p>
                  </div>
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
    </div>
  )
}
