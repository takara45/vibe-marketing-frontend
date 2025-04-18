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
    name: "0-4",
    クリック数: 120,
  },
  {
    name: "4-8",
    クリック数: 220,
  },
  {
    name: "8-12",
    クリック数: 780,
  },
  {
    name: "12-16",
    クリック数: 890,
  },
  {
    name: "16-20",
    クリック数: 1100,
  },
  {
    name: "20-24",
    クリック数: 732,
  },
];

interface PerformanceByTimeProps {
  className?: string;
}

export function PerformanceByTime({ className }: PerformanceByTimeProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>時間帯別パフォーマンス</CardTitle>
        <CardDescription>時間帯別のクリック数の分布</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="クリック数" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
