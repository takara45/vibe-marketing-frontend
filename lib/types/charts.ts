/**
 * 共通チャートコンポーネント用の型定義
 */

// 基本チャートプロパティ
export interface BaseChartProps {
  data: any[];
  width?: number;
  height?: number;
  className?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  colorScheme?: string[];
  isLoading?: boolean;
  error?: string;
}

// パフォーマンスデータ
export interface PerformanceData {
  period: string;
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category?: string;
}

// トレンドラインチャート用データ
export interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
  category?: string;
}

export interface TrendLineChartProps extends BaseChartProps {
  data: TrendDataPoint[];
  xAxisKey?: string;
  yAxisKey?: string;
  lines?: Array<{
    dataKey: string;
    stroke?: string;
    strokeWidth?: number;
    name?: string;
  }>;
  showComparison?: boolean;
  comparisonData?: TrendDataPoint[];
  dateRange?: {
    start: Date;
    end: Date;
    preset?: '7d' | '30d' | '90d' | 'custom';
  };
}

// 比較バーチャート用データ
export interface ComparisonDataPoint {
  category: string;
  value: number;
  comparison?: number;
  label?: string;
  color?: string;
}

export interface ComparisonBarChartProps extends BaseChartProps {
  data: ComparisonDataPoint[];
  orientation?: 'horizontal' | 'vertical';
  showComparison?: boolean;
  maxValue?: number;
  formatValue?: (value: number) => string;
  thresholds?: {
    good: number;
    warning: number;
    poor: number;
  };
}

// ドーナツチャート用データ
export interface DonutDataPoint {
  name: string;
  value: number;
  percentage: number;
  color?: string;
  label?: string;
}

export interface DonutChartProps extends BaseChartProps {
  data: DonutDataPoint[];
  centerValue?: number | string;
  centerLabel?: string;
  innerRadius?: number;
  outerRadius?: number;
  showPercentage?: boolean;
  animationDuration?: number;
}

// メトリクスカード用データ
export interface MetricCardData {
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  formatValue?: (value: number | string) => string;
  subMetrics?: Array<{
    label: string;
    value: number | string;
  }>;
  threshold?: {
    good: number;
    warning: number;
    poor: number;
  };
}

export interface MetricCardProps {
  data: MetricCardData;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showTrend?: boolean;
  onClick?: () => void;
}

// フィルタオプション
export interface FilterOptions {
  dateRange: {
    start: Date;
    end: Date;
    preset?: '7d' | '30d' | '90d' | 'custom';
  };
  demographics: {
    ageGroups: string[];
    genders: string[];
    devices: string[];
  };
  metrics: string[];
}

// 色スキーム
export const ChartColorSchemes = {
  default: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'],
  performance: ['#10b981', '#f59e0b', '#ef4444'], // 良い、普通、悪い
  demographics: ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'],
  devices: ['#3b82f6', '#10b981', '#f59e0b'], // Desktop, Mobile, Tablet
} as const;

// チャート設定
export interface ChartConfig {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  animation?: boolean;
  animationDuration?: number;
  tooltip?: {
    enabled: boolean;
    format?: (value: any, name: string, props: any) => React.ReactNode;
  };
  legend?: {
    enabled: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
}

// エクスポート用オプション
export interface ExportOptions {
  format: 'csv' | 'png' | 'pdf';
  filename?: string;
  includeHeader?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}