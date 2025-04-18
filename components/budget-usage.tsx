"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const data = [
  { name: "検索広告", value: 45000, color: "#0284c7" },
  { name: "ディスプレイ広告", value: 30000, color: "#0ea5e9" },
  { name: "ショッピング広告", value: 15000, color: "#38bdf8" },
  { name: "動画広告", value: 10000, color: "#7dd3fc" },
];

interface BudgetUsageProps {
  className?: string;
}

export function BudgetUsage({ className }: BudgetUsageProps) {
  const totalBudget = 120000;
  const usedBudget = data.reduce((acc, item) => acc + item.value, 0);
  const percentUsed = Math.round((usedBudget / totalBudget) * 100);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>予算使用状況</CardTitle>
        <CardDescription>
          今月の予算使用状況と広告タイプ別の内訳
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                ¥{usedBudget.toLocaleString()} / ¥{totalBudget.toLocaleString()}
              </div>
              <div className="text-sm font-medium">{percentUsed}%</div>
            </div>
            <Progress value={percentUsed} />
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
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
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `¥${Number(value).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
