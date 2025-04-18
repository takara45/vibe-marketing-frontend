"use client";

import {
  Bar,
  BarChart,
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

const data = [
  {
    name: "デスクトップ",
    クリック数: 1420,
    コンバージョン: 89,
  },
  {
    name: "モバイル",
    クリック数: 1980,
    コンバージョン: 78,
  },
  {
    name: "タブレット",
    クリック数: 442,
    コンバージョン: 20,
  },
];

interface PerformanceByDeviceProps {
  className?: string;
}

export function PerformanceByDevice({ className }: PerformanceByDeviceProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>デバイス別パフォーマンス</CardTitle>
        <CardDescription>
          デバイスタイプ別のクリック数とコンバージョン
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#0284c7" />
            <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
            <Tooltip />
            <Bar
              yAxisId="left"
              dataKey="クリック数"
              fill="#0284c7"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="コンバージョン"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
