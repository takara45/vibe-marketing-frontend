"use client"

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import { format } from 'date-fns'
import { TrendLineChartProps, ChartColorSchemes } from '@/lib/types/charts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function TrendLineChart({
  data,
  xAxisKey = 'date',
  yAxisKey = 'value',
  lines = [{ dataKey: 'value', stroke: ChartColorSchemes.default[0], name: 'Value' }],
  showComparison = false,
  comparisonData,
  dateRange,
  className,
  showTooltip = true,
  showLegend = true,
  isLoading = false,
  error,
  width,
  height = 300,
}: TrendLineChartProps) {
  // エラー状態の表示
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // ローディング状態の表示
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  // データが空の場合
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">データがありません</p>
        </CardContent>
      </Card>
    )
  }

  // 比較データがある場合はマージ
  const chartData = showComparison && comparisonData
    ? data.map(item => {
        const comparisonItem = comparisonData.find(comp => comp.date === item.date)
        return {
          ...item,
          comparison: comparisonItem?.value || 0,
        }
      })
    : data

  // チャート設定
  const chartConfig = {
    [yAxisKey]: {
      label: lines[0]?.name || 'Value',
      color: lines[0]?.stroke || ChartColorSchemes.default[0],
    },
    ...(showComparison && {
      comparison: {
        label: '比較',
        color: ChartColorSchemes.default[1],
      },
    }),
  }

  // 日付フォーマット関数
  const formatXAxisTick = (tickItem: string) => {
    try {
      const date = new Date(tickItem)
      return format(date, 'MM/dd')
    } catch {
      return tickItem
    }
  }

  // 値フォーマット関数
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // カスタムツールチップコンテンツ
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null

    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {formatXAxisTick(label)}
            </span>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium">
                {entry.name}: {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey={xAxisKey}
              tickFormatter={formatXAxisTick}
              className="text-xs"
            />
            <YAxis
              tickFormatter={formatYAxisTick}
              className="text-xs"
            />
            
            {showTooltip && (
              <ChartTooltip
                content={<CustomTooltipContent />}
              />
            )}

            {/* メインライン */}
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke || ChartColorSchemes.default[index]}
                strokeWidth={line.strokeWidth || 2}
                dot={{ fill: line.stroke || ChartColorSchemes.default[index], strokeWidth: 0, r: 3 }}
                activeDot={{ r: 4, stroke: line.stroke || ChartColorSchemes.default[index], strokeWidth: 1 }}
                name={line.name || line.dataKey}
              />
            ))}

            {/* 比較ライン */}
            {showComparison && (
              <Line
                type="monotone"
                dataKey="comparison"
                stroke={ChartColorSchemes.default[1]}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: ChartColorSchemes.default[1], strokeWidth: 0, r: 3 }}
                activeDot={{ r: 4, stroke: ChartColorSchemes.default[1], strokeWidth: 1 }}
                name="比較"
              />
            )}

            {/* 参照線（平均値など） */}
            {data.length > 0 && (
              <ReferenceLine
                y={data.reduce((sum, item) => sum + item.value, 0) / data.length}
                stroke={ChartColorSchemes.default[2]}
                strokeDasharray="2 2"
                strokeOpacity={0.6}
              />
            )}

            {showLegend && (
              <ChartLegend content={<ChartLegendContent />} />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}