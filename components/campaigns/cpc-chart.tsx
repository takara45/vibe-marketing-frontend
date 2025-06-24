"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CPCChartProps {
  data?: Array<{date: string, cpc: number}>;
  title?: string;
  description?: string;
}

const generateMockData = (period: string) => {
  const days = period === "7" ? 7 : period === "30" ? 30 : 90;
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // 時系列でのCPCトレンド（基本値90円から±20円の変動）
    const baseValue = 90;
    const variation = Math.sin((days - i) / days * Math.PI * 2) * 20 + Math.random() * 10 - 5;
    const cpc = Math.max(50, baseValue + variation);
    
    data.push({
      date: date.toISOString().split("T")[0],
      cpc: parseFloat(cpc.toFixed(2)),
      formattedDate: date.toLocaleDateString("ja-JP", { 
        month: "short", 
        day: "numeric" 
      }),
    });
  }
  
  return data;
};

// 競合他社平均CPC のモックデータ
const generateCompetitorData = (period: string) => {
  const days = period === "7" ? 7 : period === "30" ? 30 : 90;
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // 競合他社はやや高めの設定（110円ベース）
    const baseValue = 110;
    const variation = Math.sin((days - i) / days * Math.PI * 1.5) * 15 + Math.random() * 8 - 4;
    const competitorCpc = Math.max(70, baseValue + variation);
    
    data.push({
      date: date.toISOString().split("T")[0],
      competitorCpc: parseFloat(competitorCpc.toFixed(2)),
    });
  }
  
  return data;
};

export function CPCChart({ 
  data, 
  title = "CPC推移", 
  description = "時系列でのクリック単価の推移"
}: CPCChartProps) {
  const [period, setPeriod] = useState("30");
  const [viewType, setViewType] = useState<"campaign" | "adgroup">("campaign");
  const [showCompetitor, setShowCompetitor] = useState(true);

  const chartData = data || generateMockData(period);
  const competitorData = generateCompetitorData(period);
  
  // データを結合
  const combinedData = chartData.map((item, index) => ({
    ...item,
    competitorCpc: competitorData[index]?.competitorCpc || 0,
  }));

  const averageCPC = chartData.reduce((sum, item) => sum + item.cpc, 0) / chartData.length;
  const previousPeriodAvg = chartData.slice(0, Math.floor(chartData.length / 2))
    .reduce((sum, item) => sum + item.cpc, 0) / Math.floor(chartData.length / 2);
  const currentPeriodAvg = chartData.slice(Math.floor(chartData.length / 2))
    .reduce((sum, item) => sum + item.cpc, 0) / Math.ceil(chartData.length / 2);
  
  const trendPercentage = ((currentPeriodAvg - previousPeriodAvg) / previousPeriodAvg * 100).toFixed(1);
  const trendDirection = currentPeriodAvg > previousPeriodAvg ? "増加" : "減少";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={viewType} onValueChange={(value) => setViewType(value as "campaign" | "adgroup")}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign">キャンペーン別</SelectItem>
                <SelectItem value="adgroup">広告グループ別</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7日</SelectItem>
                <SelectItem value="30">30日</SelectItem>
                <SelectItem value="90">90日</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 統計情報 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold">¥{averageCPC.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">平均CPC</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${currentPeriodAvg > previousPeriodAvg ? 'text-red-600' : 'text-green-600'}`}>
              {trendDirection} {Math.abs(parseFloat(trendPercentage))}%
            </div>
            <div className="text-sm text-muted-foreground">前期比トレンド</div>
          </div>
          <div className="text-center">
            <Button 
              variant={showCompetitor ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCompetitor(!showCompetitor)}
            >
              競合比較
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={['dataMin - 10', 'dataMax + 10']}
                label={{ value: 'CPC (¥)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                labelFormatter={(label) => `日付: ${label}`}
                formatter={(value, name) => {
                  const formattedValue = `¥${Number(value).toFixed(2)}`;
                  const labelName = name === 'cpc' ? '自社CPC' : '競合平均CPC';
                  return [formattedValue, labelName];
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cpc"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                name="自社CPC"
              />
              {showCompetitor && (
                <Line
                  type="monotone"
                  dataKey="competitorCpc"
                  stroke="#dc2626"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#dc2626", strokeWidth: 2, r: 3 }}
                  name="競合平均CPC"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* インサイト */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">インサイト</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• 過去{period}日間のCPCは{trendDirection}傾向にあります</p>
            {showCompetitor && (
              <p>• 競合他社と比較して{averageCPC < competitorData.reduce((sum, item) => sum + item.competitorCpc, 0) / competitorData.length ? '低い' : '高い'}CPCで運用されています</p>
            )}
            <p>• {viewType === "campaign" ? "キャンペーン" : "広告グループ"}レベルでのCPC最適化が可能です</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}