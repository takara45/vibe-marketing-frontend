"use client"

import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { MetricCardProps } from '@/lib/types/charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function MetricCard({
  data,
  className,
  variant = 'default',
  showTrend = true,
  onClick,
}: MetricCardProps) {
  const {
    title,
    value,
    change,
    trend,
    formatValue,
    subMetrics,
    threshold,
  } = data

  // 値のフォーマット
  const formattedValue = formatValue
    ? formatValue(value)
    : typeof value === 'number'
    ? value.toLocaleString()
    : value

  // 変化率の表示
  const getTrendIcon = () => {
    if (!trend || !showTrend) return null

    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  // 変化率の色
  const getTrendColor = () => {
    if (!change || !showTrend) return 'text-muted-foreground'

    if (change > 0) return 'text-green-500'
    if (change < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  // 閾値に基づく評価
  const getPerformanceVariant = (): 'default' | 'secondary' | 'destructive' => {
    if (!threshold || typeof value !== 'number') return 'default'

    if (value >= threshold.good) return 'default'
    if (value >= threshold.warning) return 'secondary'
    return 'destructive'
  }

  // 変化率のフォーマット
  const formatChange = (change: number): string => {
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  // コンパクトバリアント
  if (variant === 'compact') {
    return (
      <Card
        className={cn(
          'cursor-pointer transition-colors hover:bg-accent/50',
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{formattedValue}</p>
            </div>
            {showTrend && change !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={cn('text-sm font-medium', getTrendColor())}>
                  {formatChange(change)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // 詳細バリアント
  if (variant === 'detailed') {
    return (
      <Card
        className={cn(
          'cursor-pointer transition-colors hover:bg-accent/50',
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {threshold && (
              <Badge variant={getPerformanceVariant()}>
                {typeof value === 'number' && value >= threshold.good
                  ? '良好'
                  : typeof value === 'number' && value >= threshold.warning
                  ? '注意'
                  : '改善必要'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{formattedValue}</span>
              {showTrend && change !== undefined && (
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  <span className={cn('text-sm font-medium', getTrendColor())}>
                    {formatChange(change)}
                  </span>
                </div>
              )}
            </div>

            {/* サブメトリクス */}
            {subMetrics && subMetrics.length > 0 && (
              <div className="space-y-2">
                {subMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-medium">
                      {typeof metric.value === 'number'
                        ? metric.value.toLocaleString()
                        : metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // デフォルトバリアント
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors hover:bg-accent/50',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{formattedValue}</span>
          {showTrend && change !== undefined && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={cn('text-sm font-medium', getTrendColor())}>
                {formatChange(change)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ローディング状態のMetricCard
export function MetricCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'detailed' }) {
  if (variant === 'compact') {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-6 w-12" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'detailed') {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-12" />
        </div>
      </CardContent>
    </Card>
  )
}

// CPC専用MetricCard
export function CPCMetricCard(props: Omit<MetricCardProps, 'data'> & {
  data: Omit<MetricCardProps['data'], 'formatValue'>
}) {
  return (
    <MetricCard
      {...props}
      data={{
        ...props.data,
        formatValue: (value) => 
          typeof value === 'number' 
            ? `¥${value.toLocaleString()}` 
            : value.toString(),
      }}
    />
  )
}

// CTR専用MetricCard
export function CTRMetricCard(props: Omit<MetricCardProps, 'data'> & {
  data: Omit<MetricCardProps['data'], 'formatValue'>
}) {
  return (
    <MetricCard
      {...props}
      data={{
        ...props.data,
        formatValue: (value) => 
          typeof value === 'number' 
            ? `${value.toFixed(2)}%` 
            : value.toString(),
        threshold: {
          good: 3.0,
          warning: 1.5,
          poor: 0,
        },
      }}
    />
  )
}