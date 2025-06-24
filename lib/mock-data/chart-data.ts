/**
 * チャートコンポーネント用のモックデータ
 */

import { 
  TrendDataPoint, 
  ComparisonDataPoint, 
  DonutDataPoint, 
  MetricCardData 
} from '@/lib/types/charts'

// トレンドラインチャート用データ
export const mockTrendData: TrendDataPoint[] = [
  { date: '2024-01-01', value: 1200, category: 'CPC' },
  { date: '2024-01-02', value: 1350, category: 'CPC' },
  { date: '2024-01-03', value: 1100, category: 'CPC' },
  { date: '2024-01-04', value: 1580, category: 'CPC' },
  { date: '2024-01-05', value: 1420, category: 'CPC' },
  { date: '2024-01-06', value: 1680, category: 'CPC' },
  { date: '2024-01-07', value: 1750, category: 'CPC' },
  { date: '2024-01-08', value: 1320, category: 'CPC' },
  { date: '2024-01-09', value: 1490, category: 'CPC' },
  { date: '2024-01-10', value: 1630, category: 'CPC' },
  { date: '2024-01-11', value: 1820, category: 'CPC' },
  { date: '2024-01-12', value: 1560, category: 'CPC' },
  { date: '2024-01-13', value: 1710, category: 'CPC' },
  { date: '2024-01-14', value: 1890, category: 'CPC' },
]

// CPC推移データ（比較用）
export const mockCPCTrendData: TrendDataPoint[] = [
  { date: '2024-01-01', value: 85, category: 'CPC' },
  { date: '2024-01-02', value: 92, category: 'CPC' },
  { date: '2024-01-03', value: 78, category: 'CPC' },
  { date: '2024-01-04', value: 105, category: 'CPC' },
  { date: '2024-01-05', value: 98, category: 'CPC' },
  { date: '2024-01-06', value: 115, category: 'CPC' },
  { date: '2024-01-07', value: 125, category: 'CPC' },
  { date: '2024-01-08', value: 88, category: 'CPC' },
  { date: '2024-01-09', value: 102, category: 'CPC' },
  { date: '2024-01-10', value: 118, category: 'CPC' },
  { date: '2024-01-11', value: 135, category: 'CPC' },
  { date: '2024-01-12', value: 95, category: 'CPC' },
  { date: '2024-01-13', value: 108, category: 'CPC' },
  { date: '2024-01-14', value: 142, category: 'CPC' },
]

// 比較バーチャート用データ（年齢層別パフォーマンス）
export const mockAgeGroupData: ComparisonDataPoint[] = [
  { category: '18-24', value: 3.2, comparison: 2.8, label: '若年層 - 高いエンゲージメント率' },
  { category: '25-34', value: 4.1, comparison: 3.5, label: 'メイン層 - 最高のCVR' },
  { category: '35-44', value: 3.8, comparison: 3.2, label: 'ミドル層 - 安定したパフォーマンス' },
  { category: '45-54', value: 2.9, comparison: 2.4, label: 'シニア層 - 価格重視' },
  { category: '55-64', value: 2.1, comparison: 1.8, label: 'プレシニア層' },
  { category: '65+', value: 1.4, comparison: 1.2, label: 'シニア層 - 慎重な購買行動' },
]

// デバイス別CPCデータ
export const mockDeviceCPCData: ComparisonDataPoint[] = [
  { category: 'Mobile', value: 75, comparison: 68, label: 'モバイル - 最も競争が激しい', color: '#3b82f6' },
  { category: 'Desktop', value: 120, comparison: 115, label: 'デスクトップ - 高品質トラフィック', color: '#10b981' },
  { category: 'Tablet', value: 95, comparison: 88, label: 'タブレット - 中間的な位置', color: '#f59e0b' },
]

// ドーナツチャート用データ（性別分布）
export const mockGenderData: DonutDataPoint[] = [
  { name: 'male', value: 57000, percentage: 57.0, label: '男性' },
  { name: 'female', value: 40000, percentage: 40.0, label: '女性' },
  { name: 'unknown', value: 3000, percentage: 3.0, label: '不明' },
]

// デバイス分布データ
export const mockDeviceData: DonutDataPoint[] = [
  { name: 'mobile', value: 65000, percentage: 65.0, label: 'モバイル' },
  { name: 'desktop', value: 25000, percentage: 25.0, label: 'デスクトップ' },
  { name: 'tablet', value: 10000, percentage: 10.0, label: 'タブレット' },
]

// 地域分布データ
export const mockLocationData: DonutDataPoint[] = [
  { name: 'tokyo', value: 35000, percentage: 35.0, label: '東京' },
  { name: 'osaka', value: 18000, percentage: 18.0, label: '大阪' },
  { name: 'nagoya', value: 12000, percentage: 12.0, label: '名古屋' },
  { name: 'fukuoka', value: 8000, percentage: 8.0, label: '福岡' },
  { name: 'sapporo', value: 7000, percentage: 7.0, label: '札幌' },
  { name: 'others', value: 20000, percentage: 20.0, label: 'その他' },
]

// メトリクスカード用データ
export const mockMetricCardsData: MetricCardData[] = [
  {
    title: '平均CPC',
    value: 125,
    change: +8.5,
    trend: 'up',
    formatValue: (value) => `¥${value}`,
    subMetrics: [
      { label: '先月', value: 115 },
      { label: '目標', value: 130 },
    ],
    threshold: {
      good: 100,
      warning: 150,
      poor: 200,
    },
  },
  {
    title: 'CTR',
    value: 3.24,
    change: +0.3,
    trend: 'up',
    formatValue: (value) => `${value}%`,
    subMetrics: [
      { label: '先月', value: '3.21%' },
      { label: '業界平均', value: '2.8%' },
    ],
    threshold: {
      good: 3.0,
      warning: 2.0,
      poor: 1.0,
    },
  },
  {
    title: 'CVR',
    value: 5.67,
    change: -1.2,
    trend: 'down',
    formatValue: (value) => `${value}%`,
    subMetrics: [
      { label: '先月', value: '5.74%' },
      { label: '目標', value: '6.0%' },
    ],
    threshold: {
      good: 6.0,
      warning: 4.0,
      poor: 2.0,
    },
  },
  {
    title: '総インプレッション',
    value: 2458692,
    change: +12.4,
    trend: 'up',
    formatValue: (value) => `${(Number(value) / 1000000).toFixed(1)}M`,
    subMetrics: [
      { label: '先月', value: '2.2M' },
      { label: '予算消化率', value: '78%' },
    ],
  },
  {
    title: 'ROAS',
    value: 4.2,
    change: 0,
    trend: 'stable',
    formatValue: (value) => `${value}x`,
    subMetrics: [
      { label: '先月', value: '4.2x' },
      { label: '目標', value: '4.5x' },
    ],
    threshold: {
      good: 4.0,
      warning: 3.0,
      poor: 2.0,
    },
  },
]

// キャンペーン別パフォーマンスデータ
export const mockCampaignPerformanceData: ComparisonDataPoint[] = [
  { category: 'ブランド認知', value: 1250, comparison: 1180, label: 'ブランドキーワード中心' },
  { category: '商品プロモ', value: 2100, comparison: 1950, label: '季節商品の販促' },
  { category: 'リターゲティング', value: 850, comparison: 920, label: '既存顧客向け' },
  { category: '競合対策', value: 1680, comparison: 1520, label: '競合ブランド対策' },
  { category: '新規獲得', value: 1950, comparison: 1800, label: '新規顧客獲得' },
]

// 時間帯別パフォーマンス
export const mockHourlyPerformance: TrendDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  date: `${i.toString().padStart(2, '0')}:00`,
  value: Math.floor(Math.random() * 100) + 50,
  category: 'hourly',
}))

// 週別トレンド（過去12週間）
export const mockWeeklyTrend: TrendDataPoint[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (11 - i) * 7)
  return {
    date: date.toISOString().split('T')[0],
    value: Math.floor(Math.random() * 500) + 800,
    category: 'weekly',
  }
})