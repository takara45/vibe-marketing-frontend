"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  MousePointerClickIcon,
  ShoppingCartIcon,
  RefreshCwIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";

// Define types for our data
interface DataPoint {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: string;
  timestamp: string;
}

interface DeviceData {
  name: string;
  value: number;
}

interface LocationData {
  name: string;
  value: number;
}

interface CampaignData {
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  budget: number;
}

// Mock real-time data
const generateMockData = (): DataPoint => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeLabel = `${hours}:${minutes}`;

  return {
    impressions: Math.floor(Math.random() * 500) + 1000,
    clicks: Math.floor(Math.random() * 50) + 100,
    conversions: Math.floor(Math.random() * 5) + 5,
    ctr: (Math.random() * 2 + 3).toFixed(2),
    timestamp: timeLabel,
  };
};

// Mock historical data for the last 24 hours
const generateHistoricalData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now);
    hour.setHours(now.getHours() - i);
    const hourLabel = `${hour.getHours().toString().padStart(2, "0")}:00`;

    data.push({
      impressions: Math.floor(Math.random() * 2000) + 8000,
      clicks: Math.floor(Math.random() * 200) + 400,
      conversions: Math.floor(Math.random() * 20) + 10,
      ctr: (Math.random() * 2 + 3).toFixed(2),
      timestamp: hourLabel,
    });
  }

  return data;
};

// Mock device data
const deviceData: DeviceData[] = [
  { name: "デスクトップ", value: 45 },
  { name: "モバイル", value: 40 },
  { name: "タブレット", value: 15 },
];

// Mock location data
const locationData: LocationData[] = [
  { name: "東京", value: 35 },
  { name: "大阪", value: 20 },
  { name: "名古屋", value: 15 },
  { name: "福岡", value: 10 },
  { name: "その他", value: 20 },
];

// Mock campaign data
const campaignData: CampaignData[] = [
  {
    name: "夏季セールキャンペーン",
    impressions: 5240,
    clicks: 210,
    conversions: 12,
    budget: 80,
  },
  {
    name: "新商品プロモーション",
    impressions: 3180,
    clicks: 145,
    conversions: 8,
    budget: 65,
  },
  {
    name: "ブランド認知度向上",
    impressions: 4320,
    clicks: 180,
    conversions: 5,
    budget: 70,
  },
];

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Custom label for pie chart
const renderCustomizedLabel = ({
  name,
  percent,
}: {
  name: string;
  percent: number;
}) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

export function RealTimeDashboard() {
  const [currentData, setCurrentData] = useState<DataPoint>(generateMockData());
  const [historicalData, setHistoricalData] = useState<DataPoint[]>(
    generateHistoricalData()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [alertVisible, setAlertVisible] = useState<boolean>(true);

  // Simulate real-time data updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const newData = generateMockData();
      setCurrentData(newData);

      // Add new data point to historical data
      setHistoricalData((prev) => {
        const newHistorical = [...prev];
        if (newHistorical.length > 23) {
          newHistorical.shift(); // Remove oldest data point
        }
        newHistorical.push(newData);
        return newHistorical;
      });

      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newData = generateMockData();
      setCurrentData(newData);

      // Add new data point to historical data
      setHistoricalData((prev) => {
        const newHistorical = [...prev];
        if (newHistorical.length > 23) {
          newHistorical.shift(); // Remove oldest data point
        }
        newHistorical.push(newData);
        return newHistorical;
      });

      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            リアルタイムダッシュボード
          </h2>
          <p className="text-muted-foreground">
            最終更新: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            onClick={toggleAutoRefresh}
          >
            {autoRefresh ? "自動更新中" : "自動更新オフ"}
          </Button>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCwIcon
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            更新
          </Button>
        </div>
      </div>

      {alertVisible && (
        <Alert className="bg-amber-50">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>注意</AlertTitle>
          <AlertDescription>
            このダッシュボードはデモ用のモックデータを表示しています。実際のデータはAPIと連携することで表示されます。
            <Button
              variant="link"
              className="p-0 h-auto ml-2"
              onClick={() => setAlertVisible(false)}
            >
              閉じる
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              リアルタイムインプレッション
            </CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData.impressions.toLocaleString()}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-4 w-4" />+
                  {Math.floor(Math.random() * 10) + 5}%
                </span>{" "}
                前時間比
              </p>
              <Badge variant="outline">直近1分</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              リアルタイムクリック
            </CardTitle>
            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData.clicks.toLocaleString()}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-4 w-4" />+
                  {Math.floor(Math.random() * 10) + 3}%
                </span>{" "}
                前時間比
              </p>
              <Badge variant="outline">直近1分</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              リアルタイムコンバージョン
            </CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.conversions}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    Math.random() > 0.5
                      ? "text-emerald-500 flex items-center"
                      : "text-rose-500 flex items-center"
                  }
                >
                  {Math.random() > 0.5 ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  )}
                  {Math.random() > 0.5 ? "+" : "-"}
                  {Math.floor(Math.random() * 10) + 1}%
                </span>{" "}
                前時間比
              </p>
              <Badge variant="outline">直近1分</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              リアルタイムCTR
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      i
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>クリック率 (Click-Through Rate)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.ctr}%</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    Math.random() > 0.5
                      ? "text-emerald-500 flex items-center"
                      : "text-rose-500 flex items-center"
                  }
                >
                  {Math.random() > 0.5 ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  )}
                  {Math.random() > 0.5 ? "+" : "-"}
                  {(Math.random() * 0.5).toFixed(2)}%
                </span>{" "}
                前時間比
              </p>
              <Badge variant="outline">直近1分</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>24時間のトレンド</CardTitle>
            <CardDescription>過去24時間の主要指標の推移</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="impressions">
              <TabsList className="mb-4">
                <TabsTrigger value="impressions">インプレッション</TabsTrigger>
                <TabsTrigger value="clicks">クリック</TabsTrigger>
                <TabsTrigger value="conversions">コンバージョン</TabsTrigger>
                <TabsTrigger value="ctr">CTR</TabsTrigger>
              </TabsList>
              <TabsContent value="impressions">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <RechartsTooltip
                      formatter={(value: number) => value.toLocaleString()}
                    />
                    <Area
                      type="monotone"
                      dataKey="impressions"
                      stroke="#0284c7"
                      fill="#0284c7"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="clicks">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <RechartsTooltip
                      formatter={(value: number) => value.toLocaleString()}
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stroke="#0ea5e9"
                      fill="#0ea5e9"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="conversions">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <RechartsTooltip
                      formatter={(value: number) => value.toLocaleString()}
                    />
                    <Area
                      type="monotone"
                      dataKey="conversions"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="ctr">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <RechartsTooltip
                      formatter={(value: string) => `${value}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="ctr"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>デバイス別トラフィック</CardTitle>
            <CardDescription>
              リアルタイムのデバイス別アクセス割合
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>地域別トラフィック</CardTitle>
            <CardDescription>リアルタイムの地域別アクセス割合</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={locationData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <RechartsTooltip formatter={(value: number) => `${value}%`} />
                  <Bar dataKey="value" fill="#8884d8">
                    {locationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
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
            リアルタイムのキャンペーン別パフォーマンス
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {campaignData.map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <div className="text-sm text-muted-foreground flex gap-4">
                      <span>表示: {campaign.impressions.toLocaleString()}</span>
                      <span>クリック: {campaign.clicks}</span>
                      <span>コンバージョン: {campaign.conversions}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      index === 0
                        ? "bg-green-100 text-green-800"
                        : index === 1
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }
                  >
                    {index === 0 ? "好調" : index === 1 ? "普通" : "要改善"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>予算消化率</span>
                    <span>{campaign.budget}%</span>
                  </div>
                  <Progress value={campaign.budget} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            すべてのキャンペーンを表示
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
