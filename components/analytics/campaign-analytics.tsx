"use client";

import {
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  SortAscIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const campaignData = [
  {
    id: "1",
    name: "春の新商品プロモーション",
    status: "active",
    impressions: 45230,
    clicks: 1520,
    ctr: 3.36,
    conversions: 78,
    convRate: 5.13,
    cost: 320000,
    cpa: 4102.56,
    roas: 350,
  },
  {
    id: "2",
    name: "新規顧客獲得キャンペーン",
    status: "paused",
    impressions: 32450,
    clicks: 980,
    ctr: 3.02,
    conversions: 45,
    convRate: 4.59,
    cost: 210000,
    cpa: 4666.67,
    roas: 280,
  },
  {
    id: "3",
    name: "ブランド認知度向上キャンペーン",
    status: "active",
    impressions: 28750,
    clicks: 850,
    ctr: 2.96,
    conversions: 32,
    convRate: 3.76,
    cost: 180000,
    cpa: 5625.0,
    roas: 220,
  },
  {
    id: "4",
    name: "リターゲティングキャンペーン",
    status: "active",
    impressions: 19000,
    clicks: 720,
    ctr: 3.79,
    conversions: 42,
    convRate: 5.83,
    cost: 150000,
    cpa: 3571.43,
    roas: 420,
  },
];

const campaignTypeData = [
  { name: "検索広告", value: 45, color: "#0284c7" },
  { name: "ディスプレイ広告", value: 30, color: "#0ea5e9" },
  { name: "ショッピング広告", value: 15, color: "#38bdf8" },
  { name: "動画広告", value: 10, color: "#7dd3fc" },
];

const campaignPerformanceData = [
  { name: "春の新商品プロモーション", コンバージョン: 78, 費用: 320000 },
  { name: "新規顧客獲得キャンペーン", コンバージョン: 45, 費用: 210000 },
  { name: "ブランド認知度向上キャンペーン", コンバージョン: 32, 費用: 180000 },
  { name: "リターゲティングキャンペーン", コンバージョン: 42, 費用: 150000 },
];

export function CampaignAnalytics() {
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

      <div className="flex items-center gap-2">
        <Input placeholder="キャンペーン名で検索" className="max-w-sm" />
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>キャンペーンタイプ別割合</CardTitle>
            <CardDescription>
              広告費用のキャンペーンタイプ別内訳
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={campaignTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {campaignTypeData.map((entry, index) => (
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
            <CardTitle>キャンペーン別コンバージョン</CardTitle>
            <CardDescription>キャンペーン別のコンバージョン数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Bar
                    dataKey="コンバージョン"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>キャンペーン別費用</CardTitle>
            <CardDescription>キャンペーン別の広告費用</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `¥${value.toLocaleString()}`}
                  />
                  <Bar dataKey="費用" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キャンペーンパフォーマンス</CardTitle>
          <CardDescription>
            すべてのキャンペーンの詳細パフォーマンス指標
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>キャンペーン名</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">インプレッション</TableHead>
                <TableHead className="text-right">クリック</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">コンバージョン</TableHead>
                <TableHead className="text-right">コンバージョン率</TableHead>
                <TableHead className="text-right">費用</TableHead>
                <TableHead className="text-right">CPA</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignData.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        campaign.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }
                    >
                      {campaign.status === "active" ? "実行中" : "一時停止"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.impressions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.ctr.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.conversions}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.convRate.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ¥{campaign.cost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ¥{campaign.cpa.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">{campaign.roas}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>キャンペーン比較</CardTitle>
            <CardDescription>主要指標のキャンペーン間比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">クリック率 (CTR)</p>
                </div>
                {campaignData.map((campaign) => (
                  <div key={`ctr-${campaign.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{campaign.name}</span>
                      <span>{campaign.ctr.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(campaign.ctr / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">コンバージョン率</p>
                </div>
                {campaignData.map((campaign) => (
                  <div key={`conv-${campaign.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{campaign.name}</span>
                      <span>{campaign.convRate.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(campaign.convRate / 6) * 100}%` }}
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
            <CardTitle>キャンペーン効率</CardTitle>
            <CardDescription>費用対効果の比較</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    コンバージョン単価 (CPA)
                  </p>
                </div>
                {campaignData.map((campaign) => (
                  <div key={`cpa-${campaign.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{campaign.name}</span>
                      <span>¥{campaign.cpa.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${(6000 - campaign.cpa) / 60}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">費用対効果 (ROAS)</p>
                </div>
                {campaignData.map((campaign) => (
                  <div key={`roas-${campaign.id}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{campaign.name}</span>
                      <span>{campaign.roas}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${campaign.roas / 5}%` }}
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
  );
}
