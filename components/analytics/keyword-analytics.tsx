import { DownloadIcon, FilterIcon, SearchIcon, SortAscIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const keywordData = [
  {
    id: "1",
    keyword: "オンラインショップ 開設",
    matchType: "phrase",
    campaign: "新規顧客獲得キャンペーン",
    adGroup: "類似ユーザー - ディスプレイ",
    impressions: 5240,
    clicks: 210,
    ctr: 4.01,
    conversions: 12,
    convRate: 5.71,
    cost: 42000,
    cpa: 3500.0,
    position: 2.3,
  },
  {
    id: "2",
    keyword: "ECサイト 構築",
    matchType: "exact",
    campaign: "春の新商品プロモーション",
    adGroup: "商品A - 検索広告",
    impressions: 4850,
    clicks: 195,
    ctr: 4.02,
    conversions: 10,
    convRate: 5.13,
    cost: 39000,
    cpa: 3900.0,
    position: 1.8,
  },
  {
    id: "3",
    keyword: "ネットショップ 作り方",
    matchType: "broad",
    campaign: "春の新商品プロモーション",
    adGroup: "商品B - 検索広告",
    impressions: 6320,
    clicks: 180,
    ctr: 2.85,
    conversions: 8,
    convRate: 4.44,
    cost: 36000,
    cpa: 4500.0,
    position: 3.2,
  },
  {
    id: "4",
    keyword: "[ブランド名]",
    matchType: "exact",
    campaign: "ブランド認知度向上キャンペーン",
    adGroup: "ブランドキーワード",
    impressions: 3250,
    clicks: 280,
    ctr: 8.62,
    conversions: 18,
    convRate: 6.43,
    cost: 28000,
    cpa: 1555.56,
    position: 1.1,
  },
  {
    id: "5",
    keyword: "オンラインショップ プラットフォーム",
    matchType: "phrase",
    campaign: "新規顧客獲得キャンペーン",
    adGroup: "リマーケティング - ディスプレイ",
    impressions: 4120,
    clicks: 165,
    ctr: 4.0,
    conversions: 9,
    convRate: 5.45,
    cost: 33000,
    cpa: 3666.67,
    position: 2.5,
  },
]

const keywordPerformanceData = [
  { name: "オンラインショップ 開設", クリック: 210, コンバージョン: 12 },
  { name: "ECサイト 構築", クリック: 195, コンバージョン: 10 },
  { name: "ネットショップ 作り方", クリック: 180, コンバージョン: 8 },
  { name: "[ブランド名]", クリック: 280, コンバージョン: 18 },
  { name: "オンラインショップ プラットフォーム", クリック: 165, コンバージョン: 9 },
]

export function KeywordAnalytics() {
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
          <Input placeholder="キーワードで検索" className="w-full md:w-auto" />
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>キーワード別クリック数</CardTitle>
            <CardDescription>上位キーワードのクリック数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywordPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Bar dataKey="クリック" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>キーワード別コンバージョン</CardTitle>
            <CardDescription>上位キーワードのコンバージョン数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywordPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Bar dataKey="コンバージョン" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キーワードパフォーマンス</CardTitle>
          <CardDescription>すべてのキーワードの詳細パフォーマンス指標</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>キーワード</TableHead>
                <TableHead>マッチタイプ</TableHead>
                <TableHead>キャンペーン</TableHead>
                <TableHead className="text-right">インプレッション</TableHead>
                <TableHead className="text-right">クリック</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">コンバージョン</TableHead>
                <TableHead className="text-right">コンバージョン率</TableHead>
                <TableHead className="text-right">費用</TableHead>
                <TableHead className="text-right">CPA</TableHead>
                <TableHead className="text-right">平均掲載順位</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywordData.map((keyword) => (
                <TableRow key={keyword.id}>
                  <TableCell className="font-medium">{keyword.keyword}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {keyword.matchType === "exact" && "完全一致"}
                      {keyword.matchType === "phrase" && "フレーズ一致"}
                      {keyword.matchType === "broad" && "部分一致"}
                    </Badge>
                  </TableCell>
                  <TableCell>{keyword.campaign}</TableCell>
                  <TableCell className="text-right">{keyword.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{keyword.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{keyword.ctr.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{keyword.conversions}</TableCell>
                  <TableCell className="text-right">{keyword.convRate.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">¥{keyword.cost.toLocaleString()}</TableCell>
                  <TableCell className="text-right">¥{keyword.cpa.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{keyword.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>検索クエリレポート</CardTitle>
            <CardDescription>ユーザーが実際に検索したクエリ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>検索クエリ</TableHead>
                  <TableHead>マッチしたキーワード</TableHead>
                  <TableHead className="text-right">クリック</TableHead>
                  <TableHead className="text-right">コンバージョン</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>オンラインショップ 簡単 開設</TableCell>
                  <TableCell>オンラインショップ 開設</TableCell>
                  <TableCell className="text-right">45</TableCell>
                  <TableCell className="text-right">3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ECサイト 構築 費用</TableCell>
                  <TableCell>ECサイト 構築</TableCell>
                  <TableCell className="text-right">38</TableCell>
                  <TableCell className="text-right">2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ネットショップ 初心者 作り方</TableCell>
                  <TableCell>ネットショップ 作り方</TableCell>
                  <TableCell className="text-right">42</TableCell>
                  <TableCell className="text-right">2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>オンラインショップ プラットフォーム 比較</TableCell>
                  <TableCell>オンラインショップ プラットフォーム</TableCell>
                  <TableCell className="text-right">35</TableCell>
                  <TableCell className="text-right">2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>キーワード効率</CardTitle>
            <CardDescription>コンバージョン率とCPAの比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">コンバージョン率</p>
                </div>
                {keywordData.map((keyword) => (
                  <div key={`conv-${keyword.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{keyword.keyword}</span>
                      <span>{keyword.convRate.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(keyword.convRate / 7) * 100}%` }}
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
