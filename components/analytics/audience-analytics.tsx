import { DownloadIcon, FilterIcon, SortAscIcon } from "lucide-react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ageData = [
  { name: "18-24", value: 15, color: "#0284c7" },
  { name: "25-34", value: 35, color: "#0ea5e9" },
  { name: "35-44", value: 25, color: "#38bdf8" },
  { name: "45-54", value: 15, color: "#7dd3fc" },
  { name: "55+", value: 10, color: "#bae6fd" },
]

const genderData = [
  { name: "男性", value: 55, color: "#0284c7" },
  { name: "女性", value: 45, color: "#0ea5e9" },
]

const deviceData = [
  { name: "モバイル", value: 65, color: "#0284c7" },
  { name: "デスクトップ", value: 30, color: "#0ea5e9" },
  { name: "タブレット", value: 5, color: "#38bdf8" },
]

const locationData = [
  { name: "東京", value: 35, color: "#0284c7" },
  { name: "大阪", value: 20, color: "#0ea5e9" },
  { name: "名古屋", value: 15, color: "#38bdf8" },
  { name: "福岡", value: 10, color: "#7dd3fc" },
  { name: "その他", value: 20, color: "#bae6fd" },
]

const interestData = [
  { name: "テクノロジー", コンバージョン: 45, クリック: 850 },
  { name: "ビジネス", コンバージョン: 38, クリック: 720 },
  { name: "ショッピング", コンバージョン: 32, クリック: 680 },
  { name: "旅行", コンバージョン: 28, クリック: 520 },
  { name: "エンターテイメント", コンバージョン: 25, クリック: 480 },
]

const devicePerformanceData = [
  { name: "モバイル", CTR: 3.2, コンバージョン率: 4.8 },
  { name: "デスクトップ", CTR: 4.1, コンバージョン率: 5.6 },
  { name: "タブレット", CTR: 3.5, コンバージョン率: 5.2 },
]

export function AudienceAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DatePickerWithRange className="w-full md:w-auto" />
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" />
            フィルター
          </Button>
          <Button variant="outline">
            <SortAscIcon className="mr-2 h-4 w-4" />
            並び替え
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>年齢層</CardTitle>
            <CardDescription>ユーザーの年齢層分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>性別</CardTitle>
            <CardDescription>ユーザーの性別分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>デバイス</CardTitle>
            <CardDescription>ユーザーのデバイス分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>地域</CardTitle>
            <CardDescription>ユーザーの地域分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>興味関心カテゴリ別パフォーマンス</CardTitle>
          <CardDescription>ユーザーの興味関心カテゴリ別のパフォーマンス</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="conversions">
            <TabsList className="mb-4">
              <TabsTrigger value="conversions">コンバージョン</TabsTrigger>
              <TabsTrigger value="clicks">クリック</TabsTrigger>
            </TabsList>
            <TabsContent value="conversions">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={interestData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}`} />
                    <Bar dataKey="コンバージョン" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="clicks">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={interestData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}`} />
                    <Bar dataKey="クリック" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>デバイス別パフォーマンス</CardTitle>
            <CardDescription>デバイスタイプ別のパフォーマンス指標</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={devicePerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="CTR" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="コンバージョン率" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ユーザー属性別分析</CardTitle>
            <CardDescription>ユーザー属性別のパフォーマンス比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">年齢層別コンバージョン率</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>18-24</span>
                    <span>3.8%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "38%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>25-34</span>
                    <span>5.2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "52%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>35-44</span>
                    <span>6.1%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "61%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>45-54</span>
                    <span>4.5%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>55+</span>
                    <span>3.2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "32%" }}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">性別別コンバージョン率</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>男性</span>
                    <span>4.8%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "48%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>女性</span>
                    <span>5.3%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "53%" }}></div>
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
