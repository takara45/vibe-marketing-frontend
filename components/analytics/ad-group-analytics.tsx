import { DownloadIcon, FilterIcon, SearchIcon, SortAscIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const adGroupData = [
  {
    id: "1",
    name: "商品A - 検索広告",
    campaign: "春の新商品プロモーション",
    impressions: 18450,
    clicks: 620,
    ctr: 3.36,
    conversions: 32,
    convRate: 5.16,
    cost: 130000,
    cpa: 4062.5,
  },
  {
    id: "2",
    name: "商品B - 検索広告",
    campaign: "春の新商品プロモーション",
    impressions: 15780,
    clicks: 540,
    ctr: 3.42,
    conversions: 28,
    convRate: 5.19,
    cost: 115000,
    cpa: 4107.14,
  },
  {
    id: "3",
    name: "リマーケティング - ディスプレイ",
    campaign: "新規顧客獲得キャンペーン",
    impressions: 22450,
    clicks: 580,
    ctr: 2.58,
    conversions: 25,
    convRate: 4.31,
    cost: 120000,
    cpa: 4800.0,
  },
  {
    id: "4",
    name: "類似ユーザー - ディスプレイ",
    campaign: "新規顧客獲得キャンペーン",
    impressions: 10000,
    clicks: 400,
    ctr: 4.0,
    conversions: 20,
    convRate: 5.0,
    cost: 90000,
    cpa: 4500.0,
  },
  {
    id: "5",
    name: "ブランドキーワード",
    campaign: "ブランド認知度向上キャンペーン",
    impressions: 12750,
    clicks: 480,
    ctr: 3.76,
    conversions: 22,
    convRate: 4.58,
    cost: 95000,
    cpa: 4318.18,
  },
]

const adGroupPerformanceData = [
  { name: "商品A - 検索広告", コンバージョン: 32, 費用: 130000 },
  { name: "商品B - 検索広告", コンバージョン: 28, 費用: 115000 },
  { name: "リマーケティング - ディスプレイ", コンバージョン: 25, 費用: 120000 },
  { name: "類似ユーザー - ディスプレイ", コンバージョン: 20, 費用: 90000 },
  { name: "ブランドキーワード", コンバージョン: 22, 費用: 95000 },
]

export function AdGroupAnalytics() {
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

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="キャンペーンを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのキャンペーン</SelectItem>
              <SelectItem value="1">春の新商品プロモーション</SelectItem>
              <SelectItem value="2">新規顧客獲得キャンペーン</SelectItem>
              <SelectItem value="3">ブランド認知度向上キャンペーン</SelectItem>
              <SelectItem value="4">リターゲティングキャンペーン</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="広告グループ名で検索" className="w-full md:w-auto" />
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>広告グループ別コンバージョン</CardTitle>
            <CardDescription>広告グループ別のコンバージョン数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adGroupPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Bar dataKey="コンバージョン" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>広告グループ別費用</CardTitle>
            <CardDescription>広告グループ別の広告費用</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adGroupPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                  <Bar dataKey="費用" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>広告グループパフォーマンス</CardTitle>
          <CardDescription>すべての広告グループの詳細パフォーマンス指標</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>広告グループ名</TableHead>
                <TableHead>キャンペーン</TableHead>
                <TableHead className="text-right">インプレッション</TableHead>
                <TableHead className="text-right">クリック</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">コンバージョン</TableHead>
                <TableHead className="text-right">コンバージョン率</TableHead>
                <TableHead className="text-right">費用</TableHead>
                <TableHead className="text-right">CPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adGroupData.map((adGroup) => (
                <TableRow key={adGroup.id}>
                  <TableCell className="font-medium">{adGroup.name}</TableCell>
                  <TableCell>{adGroup.campaign}</TableCell>
                  <TableCell className="text-right">{adGroup.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{adGroup.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{adGroup.ctr.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{adGroup.conversions}</TableCell>
                  <TableCell className="text-right">{adGroup.convRate.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">¥{adGroup.cost.toLocaleString()}</TableCell>
                  <TableCell className="text-right">¥{adGroup.cpa.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>広告グループ比較</CardTitle>
            <CardDescription>主要指標の広告グループ間比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">クリック率 (CTR)</p>
                </div>
                {adGroupData.map((adGroup) => (
                  <div key={`ctr-${adGroup.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{adGroup.name}</span>
                      <span>{adGroup.ctr.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(adGroup.ctr / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>広告グループ効率</CardTitle>
            <CardDescription>コンバージョン率の比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">コンバージョン率</p>
                </div>
                {adGroupData.map((adGroup) => (
                  <div key={`conv-${adGroup.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{adGroup.name}</span>
                      <span>{adGroup.convRate.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(adGroup.convRate / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
