import { DownloadIcon, FilterIcon, SortAscIcon } from "lucide-react"
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const budgetTrendData = [
  {
    date: "3/15",
    予算: 15000,
    支出: 12000,
  },
  {
    date: "3/16",
    予算: 15000,
    支出: 12500,
  },
  {
    date: "3/17",
    予算: 15000,
    支出: 12200,
  },
  {
    date: "3/18",
    予算: 15000,
    支出: 13000,
  },
  {
    date: "3/19",
    予算: 15000,
    支出: 13500,
  },
  {
    date: "3/20",
    予算: 15000,
    支出: 14000,
  },
  {
    date: "3/21",
    予算: 15000,
    支出: 14500,
  },
]

const campaignBudgetData = [
  { name: "春の新商品プロモーション", value: 45, color: "#0284c7" },
  { name: "新規顧客獲得キャンペーン", value: 30, color: "#0ea5e9" },
  { name: "ブランド認知度向上キャンペーン", value: 15, color: "#38bdf8" },
  { name: "リターゲティングキャンペーン", value: 10, color: "#7dd3fc" },
]

const roiData = [
  { name: "春の新商品プロモーション", ROI: 350 },
  { name: "新規顧客獲得キャンペーン", ROI: 280 },
  { name: "ブランド認知度向上キャンペーン", ROI: 220 },
  { name: "リターゲティングキャンペーン", ROI: 420 },
]

const campaignBudgetDetailData = [
  {
    id: "1",
    name: "春の新商品プロモーション",
    budget: 450000,
    spent: 320000,
    remaining: 130000,
    percentUsed: 71.1,
    roi: 350,
  },
  {
    id: "2",
    name: "新規顧客獲得キャンペーン",
    budget: 300000,
    spent: 210000,
    remaining: 90000,
    percentUsed: 70.0,
    roi: 280,
  },
  {
    id: "3",
    name: "ブランド認知度向上キャンペーン",
    budget: 200000,
    spent: 180000,
    remaining: 20000,
    percentUsed: 90.0,
    roi: 220,
  },
  {
    id: "4",
    name: "リターゲティングキャンペーン",
    budget: 170000,
    spent: 150000,
    remaining: 20000,
    percentUsed: 88.2,
    roi: 420,
  },
]

export function BudgetAnalytics() {
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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">総予算</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥1,120,000</div>
            <p className="text-xs text-muted-foreground">月間予算</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">総支出</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥902,870</div>
            <p className="text-xs text-muted-foreground">予算使用率: 80.6%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">残り予算</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥217,130</div>
            <p className="text-xs text-muted-foreground">残り日数: 10日</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320%</div>
            <p className="text-xs text-muted-foreground">前月比: +15%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>予算と支出の推移</CardTitle>
          <CardDescription>日別の予算と実際の支出の推移</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={budgetTrendData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="予算" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="支出" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>キャンペーン別予算配分</CardTitle>
            <CardDescription>キャンペーン別の予算配分割合</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={campaignBudgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {campaignBudgetData.map((entry, index) => (
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
            <CardTitle>キャンペーン別ROI</CardTitle>
            <CardDescription>キャンペーン別の投資収益率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="ROI" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キャンペーン別予算詳細</CardTitle>
          <CardDescription>キャンペーン別の予算使用状況と投資収益率</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>キャンペーン名</TableHead>
                <TableHead className="text-right">予算</TableHead>
                <TableHead className="text-right">支出</TableHead>
                <TableHead className="text-right">残り予算</TableHead>
                <TableHead>使用率</TableHead>
                <TableHead className="text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignBudgetDetailData.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="text-right">¥{campaign.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">¥{campaign.spent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">¥{campaign.remaining.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={campaign.percentUsed} className="h-2" />
                      <span className="text-xs">{campaign.percentUsed.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{campaign.roi}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>費用対効果分析</CardTitle>
            <CardDescription>支出と売上の関係</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily">
              <TabsList className="mb-4">
                <TabsTrigger value="daily">日別</TabsTrigger>
                <TabsTrigger value="weekly">週別</TabsTrigger>
                <TabsTrigger value="monthly">月別</TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">平均CPC</p>
                      <p className="text-2xl font-bold">¥235</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">平均CPA</p>
                      <p className="text-2xl font-bold">¥4,820</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">費用対効果 (ROAS)</p>
                      <p className="text-sm font-medium">320%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "64%" }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>目標: 300%</span>
                      <span>実績: 320%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="weekly">
                <div className="flex h-[200px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">週別データを読み込み中...</p>
                </div>
              </TabsContent>
              <TabsContent value="monthly">
                <div className="flex h-[200px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">月別データを読み込み中...</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>予算最適化提案</CardTitle>
            <CardDescription>AIによる予算最適化の提案</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="space-y-1">
                  <p className="font-medium">リターゲティングキャンペーンへの予算増加</p>
                  <p className="text-sm text-muted-foreground">
                    リターゲティングキャンペーンのROIが420%と高いため、予算を20%増加することで、全体のROIを向上させることができます。
                  </p>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="space-y-1">
                  <p className="font-medium">ブランド認知度向上キャンペーンの最適化</p>
                  <p className="text-sm text-muted-foreground">
                    ブランド認知度向上キャンペーンのROIが220%と低いため、広告クリエイティブの改善やターゲティングの見直しを行うことで、効率を向上させることができます。
                  </p>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="space-y-1">
                  <p className="font-medium">曜日・時間帯別の予算配分</p>
                  <p className="text-sm text-muted-foreground">
                    コンバージョン率が高い平日の15時〜21時に予算を重点的に配分することで、全体の効率を約15%向上させることができます。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
