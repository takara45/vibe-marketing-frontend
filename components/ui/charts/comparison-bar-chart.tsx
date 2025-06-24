"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import { ComparisonBarChartProps, ChartColorSchemes } from '@/lib/types/charts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export function ComparisonBarChart({
  data,
  orientation = 'vertical',
  showComparison = false,
  maxValue,
  formatValue,
  thresholds,
  className,
  showTooltip = true,
  showLegend = false,
  isLoading = false,
  error,
  height = 300,
}: ComparisonBarChartProps) {
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
        <CardContent className="p-4">
          <Skeleton className={`h-[${height}px] w-full`} />
        </CardContent>
      </Card>
    )
  }

  // データが空の場合
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardContent className={`flex items-center justify-center h-[${height}px]`}>
          <p className="text-muted-foreground">データがありません</p>
        </CardContent>
      </Card>
    )
  }

  // バーの色を決定する関数
  const getBarColor = (value: number, index: number): string => {
    if (thresholds) {
      if (value >= thresholds.good) {
        return ChartColorSchemes.performance[0] // 緑
      } else if (value >= thresholds.warning) {
        return ChartColorSchemes.performance[1] // 黄
      } else {
        return ChartColorSchemes.performance[2] // 赤
      }
    }
    return data[index]?.color || ChartColorSchemes.default[index % ChartColorSchemes.default.length]
  }

  // 値フォーマット関数
  const formatTickValue = (value: number): string => {
    if (formatValue) {
      return formatValue(value)
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // チャート設定
  const chartConfig = {
    value: {
      label: '値',
      color: ChartColorSchemes.default[0],
    },
    ...(showComparison && {
      comparison: {
        label: '比較',
        color: ChartColorSchemes.default[1],
      },
    }),
  }

  // カスタムツールチップ
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null

    const data = payload[0]?.payload
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <div className="grid gap-2">
          <div className="font-medium">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">{entry.name}</span>
              </div>
              <span className="font-mono font-medium">
                {formatValue ? formatValue(entry.value) : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
          {data?.label && (
            <div className="text-xs text-muted-foreground border-t pt-2">
              {data.label}
            </div>
          )}
        </div>
      </div>
    )
  }

  // 水平バーチャートの場合のマージン調整
  const chartMargin = orientation === 'horizontal'
    ? { top: 20, right: 30, left: 80, bottom: 5 }
    : { top: 20, right: 30, left: 20, bottom: 60 }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className={`h-[${height}px] w-full`}
        >
          <BarChart
            data={data}
            layout={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
            margin={chartMargin}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-muted" 
              {...(orientation === 'horizontal' && { horizontal: false })}
            />
            
            {orientation === 'vertical' ? (
              <>
                <XAxis
                  dataKey="category"
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tickFormatter={formatTickValue}
                  className="text-xs"
                  domain={maxValue ? [0, maxValue] : [0, 'dataMax']}
                />
              </>
            ) : (
              <>
                <XAxis
                  type="number"
                  tickFormatter={formatTickValue}
                  className="text-xs"
                  domain={maxValue ? [0, maxValue] : [0, 'dataMax']}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  className="text-xs"
                />
              </>
            )}

            {showTooltip && (
              <ChartTooltip content={<CustomTooltipContent />} />
            )}

            {/* メインバー */}
            <Bar dataKey="value" name="値" radius={4}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value, index)} />
              ))}
            </Bar>

            {/* 比較バー */}
            {showComparison && (
              <Bar
                dataKey="comparison"
                name="比較"
                fill={ChartColorSchemes.default[1]}
                fillOpacity={0.7}
                radius={4}
              />
            )}

            {showLegend && (
              <ChartLegend content={<ChartLegendContent />} />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// パフォーマンス閾値に基づくバーチャートのプリセット
export function PerformanceBarChart(props: Omit<ComparisonBarChartProps, 'thresholds'>) {
  return (
    <ComparisonBarChart
      {...props}
      thresholds={{
        good: 70,
        warning: 40,
        poor: 0,
      }}
    />
  )
}

// CPC専用バーチャート
export function CPCBarChart(props: ComparisonBarChartProps) {
  return (
    <ComparisonBarChart
      {...props}
      formatValue={(value) => `¥${value.toLocaleString()}`}
    />
  )
}