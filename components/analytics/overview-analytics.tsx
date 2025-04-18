"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  MousePointerClickIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import {
  Line,
  LineChart,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const performanceData = [
  {
    date: "3/15",
    インプレッション: 15400,
    クリック: 520,
    コンバージョン: 25,
    費用: 12000,
  },
  {
    date: "3/16",
    インプレッション: 16200,
    クリック: 540,
    コンバージョン: 28,
    費用: 12500,
  },
  {
    date: "3/17",
    インプレッション: 15800,
    クリック: 510,
    コンバージョン: 26,
    費用: 12200,
  },
  {
    date: "3/18",
    インプレッション: 16500,
    クリック: 570,
    コンバージョン: 30,
    費用: 13000,
  },
  {
    date: "3/19",
    インプレッション: 17200,
    クリック: 610,
    コンバージョン: 32,
    費用: 13500,
  },
  {
    date: "3/20",
    インプレッション: 18100,
    クリック: 650,
    コンバージョン: 35,
    費用: 14000,
  },
  {
    date: "3/21",
    インプレッション: 18500,
    クリック: 680,
    コンバージョン: 38,
    費用: 14500,
  },
];

export function OverviewAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DatePickerWithRange className="w-full md:w-auto" />
        <div className="flex gap-2">
          <Button variant="outline">前週比</Button>
          <Button variant="outline">前月比</Button>
          <Button variant="outline">カスタム比較</Button>
          <Button variant="outline">エクスポート</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              インプレッション
            </CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125,430</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                  +12.5%
                </span>{" "}
                前週比
              </p>
              <p className="text-xs text-muted-foreground">目標: 120,000</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">クリック数</CardTitle>
            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                  +7.2%
                </span>{" "}
                前週比
              </p>
              <p className="text-xs text-muted-foreground">目標: 3,500</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              コンバージョン
            </CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 flex items-center">
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                  -3.1%
                </span>{" "}
                前週比
              </p>
              <p className="text-xs text-muted-foreground">目標: 200</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              費用対効果 (ROAS)
            </CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320%</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                  +14.3%
                </span>{" "}
                前週比
              </p>
              <p className="text-xs text-muted-foreground">目標: 300%</p>
            </div>
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
                  <Line
                    type="monotone"
                    dataKey="クリック"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
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
                  <Tooltip
                    formatter={(value) => `¥${value.toLocaleString()}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="費用"
                    stroke="#f59e0b"
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
            <CardTitle>主要指標サマリー</CardTitle>
            <CardDescription>期間内の主要指標の概要</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">クリック率 (CTR)</p>
                  <p className="text-2xl font-bold">3.06%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500">+0.2%</span> 前週比
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">コンバージョン率</p>
                  <p className="text-2xl font-bold">4.87%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-rose-500">-0.3%</span> 前週比
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">平均クリック単価 (CPC)</p>
                  <p className="text-2xl font-bold">¥235</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500">-¥12</span> 前週比
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    コンバージョン単価 (CPA)
                  </p>
                  <p className="text-2xl font-bold">¥4,820</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-rose-500">+¥320</span> 前週比
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">総費用</p>
                  <p className="text-2xl font-bold">¥902,870</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-rose-500">+¥52,450</span> 前週比
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">総売上</p>
                  <p className="text-2xl font-bold">¥2,889,184</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500">+¥245,320</span> 前週比
                  </p>
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
                  <p className="text-sm font-medium">104.5%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "104.5%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 120,000</span>
                  <span>実績: 125,430</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">クリック数</p>
                  <p className="text-sm font-medium">109.8%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "109.8%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 3,500</span>
                  <span>実績: 3,842</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">コンバージョン</p>
                  <p className="text-sm font-medium">93.5%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-amber-500"
                    style={{ width: "93.5%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 200</span>
                  <span>実績: 187</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">費用対効果 (ROAS)</p>
                  <p className="text-sm font-medium">106.7%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: "106.7%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>目標: 300%</span>
                  <span>実績: 320%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
