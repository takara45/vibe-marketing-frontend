"use client"

import React from 'react'
import { TrendLineChart, ComparisonBarChart, DonutChart } from '@/components/ui/charts'
import { MetricCard } from '@/components/ui/cards'
import { 
  mockTrendData,
  mockCPCTrendData,
  mockAgeGroupData,
  mockDeviceCPCData,
  mockGenderData,
  mockDeviceData,
  mockMetricCardsData
} from '@/lib/mock-data/chart-data'

export default function TestChartsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">データ可視化コンポーネントテスト</h1>
        <p className="text-muted-foreground">
          新しく作成したチャートコンポーネントの動作確認用ページです。
        </p>
      </div>

      {/* メトリクスカード */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">メトリクスカード</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {mockMetricCardsData.map((metric, index) => (
            <MetricCard
              key={index}
              data={metric}
              variant="default"
            />
          ))}
        </div>
      </section>

      {/* トレンドラインチャート */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">トレンドラインチャート</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">インプレッション推移</h3>
            <TrendLineChart
              data={mockTrendData}
              lines={[
                { dataKey: 'value', stroke: '#3b82f6', name: 'インプレッション' }
              ]}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">CPC推移（比較付き）</h3>
            <TrendLineChart
              data={mockCPCTrendData}
              comparisonData={mockCPCTrendData.map(item => ({
                ...item,
                value: item.value * 0.9 // 10%低い値で比較
              }))}
              showComparison={true}
              lines={[
                { dataKey: 'value', stroke: '#10b981', name: '現在のCPC' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 比較バーチャート */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">比較バーチャート</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">年齢層別CTR</h3>
            <ComparisonBarChart
              data={mockAgeGroupData}
              formatValue={(value) => `${value}%`}
              thresholds={{
                good: 3.5,
                warning: 2.5,
                poor: 0
              }}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">デバイス別CPC（水平）</h3>
            <ComparisonBarChart
              data={mockDeviceCPCData}
              orientation="horizontal"
              showComparison={true}
              formatValue={(value) => `¥${value}`}
            />
          </div>
        </div>
      </section>

      {/* ドーナツチャート */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ドーナツチャート</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">性別分布</h3>
            <DonutChart
              data={mockGenderData}
              centerValue={mockGenderData.reduce((sum, item) => sum + item.value, 0)}
              centerLabel="総ユーザー数"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">デバイス分布</h3>
            <DonutChart
              data={mockDeviceData}
              centerValue={mockDeviceData.reduce((sum, item) => sum + item.value, 0)}
              centerLabel="総セッション数"
              showPercentage={true}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">シンプル表示</h3>
            <DonutChart
              data={mockGenderData.slice(0, 2)} // 男性・女性のみ
              showLegend={false}
              innerRadius={80}
              outerRadius={120}
            />
          </div>
        </div>
      </section>

      {/* バリアント表示 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">メトリクスカードバリアント</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">コンパクト</h3>
            <MetricCard
              data={mockMetricCardsData[0]}
              variant="compact"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">デフォルト</h3>
            <MetricCard
              data={mockMetricCardsData[1]}
              variant="default"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">詳細</h3>
            <MetricCard
              data={mockMetricCardsData[2]}
              variant="detailed"
            />
          </div>
        </div>
      </section>

      {/* ローディング状態 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ローディング状態</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendLineChart
            data={[]}
            isLoading={true}
          />
          <ComparisonBarChart
            data={[]}
            isLoading={true}
          />
        </div>
      </section>

      {/* エラー状態 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">エラー状態</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendLineChart
            data={[]}
            error="データの取得に失敗しました"
          />
          <DonutChart
            data={[]}
            error="接続エラーが発生しました"
          />
        </div>
      </section>
    </div>
  )
}