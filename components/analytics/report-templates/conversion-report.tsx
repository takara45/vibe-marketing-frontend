"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ConversionReportProps {
  campaignId?: string
}

export function ConversionReport({ campaignId }: ConversionReportProps) {
  // サンプルデータ
  const conversionTrendData = [
    {
      date: "3/15",
      コンバージョン: 25,
      コンバージョン率: 4.8,
    },
    {
      date: "3/16",
      コンバージョン: 28,
      コンバージョン率: 5.2,
    },
    {
      date: "3/17",
      コンバージョン: 26,
      コンバージョン率: 5.1,
    },
    {
      date: "3/18",
      コンバージョン: 30,
      コンバージョン率: 5.3,
    },
    {
      date: "3/19",
      コンバージョン: 32,
      コンバージョン率: 5.2,
    },
    {
      date: "3/20",
      コンバージョン: 35,
      コンバージョン率: 5.4,
    },
    {
      date: "3/21",
      コンバージョン: 38,
      コンバージョン率: 5.6,
    },
  ]

  const conversionTypeData = [
    { name: "購入", コンバージョン: 85, 売上: 1850000 },
    { name: "資料請求", コンバージョン: 45, 売上: 675000 },
    { name: "お問い合わせ", コンバージョン: 32, 売上: 320000 },
    { name: "無料トライアル", コンバージョン: 25, 売上: 250000 },
  ]

  const conversionPathData = [
    {
      id: "1",
      path: "検索広告 > ランディングページ > 商品ページ > カート > 購入",
      conversions: 42,
      convRate: 5.8,
      value: 840000,
      avgValue: 20000,
    },
    {
      id: "2",
      path: "検索広告 > ランディングページ > 資料請求",
      conversions: 35,
      convRate: 7.2,
      value: 525000,
      avgValue: 15000,
    },
    {
      id: "3",
      path: "ディスプレイ広告 > ランディングページ > 商品ページ > カート > 購入",
      conversions: 28,
      convRate: 4.5,
      value: 560000,
      avgValue: 20000,
    },
    {
      id: "4",
      path: "ディスプレイ広告 > ランディングページ > お問い合わせ",
      conversions: 22,
      convRate: 3.8,
      value: 220000,
      avgValue: 10000,
    },
    {
      id: "5",
      path: "検索広告 > ランディングページ > 無料トライアル",
      conversions: 18,
      convRate: 6.2,
      value: 180000,
      avgValue: 10000,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">総コンバージョン数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">目標達成率: 93.5%（目標: 200）</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">コンバージョン率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.87%</div>
            <p className="text-xs text-muted-foreground">前週比: -0.3%（前週: 5.17%）</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">コンバージョン単価 (CPA)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥4,820</div>
            <p className="text-xs text-muted-foreground">前週比: +¥320（前週: ¥4,500）</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">コンバージョン価値</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥2,889,184</div>
            <p className="text-xs text-muted-foreground">前週比: +¥245,320（前週: ¥2,643,864）</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>コンバージョン推移</CardTitle>
          <CardDescription>期間内のコンバージョン数とコンバージョン率の推移</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="count">
            <TabsList className="mb-4">
              <TabsTrigger value="count">コンバージョン数</TabsTrigger>
              <TabsTrigger value="rate">コンバージョン率</TabsTrigger>
            </TabsList>
            <TabsContent value="count">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={conversionTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
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
            <TabsContent value="rate">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={conversionTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Line
                    type="monotone"
                    dataKey="コンバージョン率"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>コンバージョンタイプ別数</CardTitle>
            <CardDescription>コンバージョンタイプ別の数</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionTypeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}`} />
                <Bar dataKey="コンバージョン" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>コンバージョンタイプ別売上</CardTitle>
            <CardDescription>コンバージョンタイプ別の売上</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionTypeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Bar dataKey="売上" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>コンバージョン経路分析</CardTitle>
          <CardDescription>ユーザーがコンバージョンに至るまでの経路</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>コンバージョン経路</TableHead>
                <TableHead className="text-right">コンバージョン数</TableHead>
                <TableHead className="text-right">コンバージョン率</TableHead>
                <TableHead className="text-right">コンバージョン価値</TableHead>
                <TableHead className="text-right">平均価値</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversionPathData.map((path) => (
                <TableRow key={path.id}>
                  <TableCell className="font-medium">{path.path}</TableCell>
                  <TableCell className="text-right">{path.conversions}</TableCell>
                  <TableCell className="text-right">{path.convRate.toFixed(1)}%</TableCell>
                  <TableCell className="text-right">¥{path.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">¥{path.avgValue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
