"use client"

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { DonutChartProps, ChartColorSchemes } from '@/lib/types/charts'
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export function DonutChart({
  data,
  centerValue,
  centerLabel,
  innerRadius = 60,
  outerRadius = 100,
  showPercentage = true,
  animationDuration = 1000,
  className,
  showTooltip = true,
  showLegend = true,
  isLoading = false,
  error,
  height = 300,
}: DonutChartProps) {
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
          <div className="flex items-center justify-center">
            <Skeleton className={`h-[${height}px] w-[${height}px] rounded-full`} />
          </div>
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

  // 色を決定する関数
  const getColor = (index: number): string => {
    return data[index]?.color || ChartColorSchemes.default[index % ChartColorSchemes.default.length]
  }

  // チャート設定
  const chartConfig = data.reduce((config, item, index) => {
    config[item.name] = {
      label: item.label || item.name,
      color: getColor(index),
    }
    return config
  }, {} as any)

  // カスタムツールチップ
  const CustomTooltipContent = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null

    const data = payload[0]?.payload
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: data.color || payload[0].color }}
            />
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="grid gap-1 text-sm">
            <div className="flex justify-between">
              <span>値:</span>
              <span className="font-mono">{data.value.toLocaleString()}</span>
            </div>
            {showPercentage && (
              <div className="flex justify-between">
                <span>割合:</span>
                <span className="font-mono">{data.percentage.toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 中央のテキスト要素
  const CenterText = () => {
    if (!centerValue && !centerLabel) return null

    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground"
      >
        {centerValue && (
          <tspan x="50%" dy="-0.5em" className="text-2xl font-bold">
            {typeof centerValue === 'number' ? centerValue.toLocaleString() : centerValue}
          </tspan>
        )}
        {centerLabel && (
          <tspan x="50%" dy="1.2em" className="text-sm fill-muted-foreground">
            {centerLabel}
          </tspan>
        )}
      </text>
    )
  }

  // カスタムラベル（パーセンテージ表示）
  const renderLabel = (entry: any) => {
    if (!showPercentage) return null
    if (entry.percentage < 5) return null // 5%未満は表示しない

    return `${entry.percentage.toFixed(1)}%`
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className={`h-[${height}px] w-[${height}px]`}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={showPercentage ? renderLabel : false}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill="#8884d8"
                dataKey="value"
                animationDuration={animationDuration}
                animationBegin={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColor(index)}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              {showTooltip && (
                <ChartTooltip content={<CustomTooltipContent />} />
              )}

              {/* 中央のテキスト */}
              <CenterText />
            </PieChart>
          </ChartContainer>
        </div>

        {/* 凡例 */}
        {showLegend && (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getColor(index) }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.label || item.name}
                </span>
                <span className="text-sm font-medium">
                  {showPercentage ? `${item.percentage.toFixed(1)}%` : item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 性別分析用ドーナツチャート
export function GenderDonutChart(props: Omit<DonutChartProps, 'centerLabel'>) {
  const totalUsers = props.data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <DonutChart
      {...props}
      centerValue={totalUsers}
      centerLabel="総ユーザー数"
      colorScheme={['#3b82f6', '#ec4899', '#6b7280']} // 男性=青、女性=ピンク、不明=グレー
    />
  )
}

// デバイス分析用ドーナツチャート
export function DeviceDonutChart(props: Omit<DonutChartProps, 'centerLabel'>) {
  const totalSessions = props.data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <DonutChart
      {...props}
      centerValue={totalSessions}
      centerLabel="総セッション数"
      colorScheme={ChartColorSchemes.devices}
    />
  )
}