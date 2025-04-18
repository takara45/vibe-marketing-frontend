"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  {
    name: "3/14",
    クリック数: 240,
    インプレッション: 5400,
  },
  {
    name: "3/15",
    クリック数: 300,
    インプレッション: 6200,
  },
  {
    name: "3/16",
    クリック数: 280,
    インプレッション: 5800,
  },
  {
    name: "3/17",
    クリック数: 278,
    インプレッション: 5900,
  },
  {
    name: "3/18",
    クリック数: 310,
    インプレッション: 6300,
  },
  {
    name: "3/19",
    クリック数: 350,
    インプレッション: 7100,
  },
  {
    name: "3/20",
    クリック数: 380,
    インプレッション: 7800,
  },
];

interface CampaignPerformanceProps {
  className?: string;
}

export function CampaignPerformance({ className }: CampaignPerformanceProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>キャンペーンパフォーマンス</CardTitle>
        <CardDescription>
          過去7日間のキャンペーンパフォーマンスの推移
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clicks">
          <TabsList className="mb-4">
            <TabsTrigger value="clicks">クリック数</TabsTrigger>
            <TabsTrigger value="impressions">インプレッション</TabsTrigger>
            <TabsTrigger value="conversions">コンバージョン</TabsTrigger>
          </TabsList>
          <TabsContent value="clicks">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="クリック数"
                  stroke="#0284c7"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="impressions">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="インプレッション"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="conversions">
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-muted-foreground">
                コンバージョンデータを読み込み中...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
