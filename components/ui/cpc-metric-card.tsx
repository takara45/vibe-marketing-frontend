"use client"

import { TrendingDownIcon, TrendingUpIcon, MinusIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CPCMetricCardProps {
  title: string;
  currentCPC: number;
  previousCPC: number;
  trend: 'up' | 'down' | 'stable';
  category: 'high' | 'medium' | 'low';
  description?: string;
  currency?: string;
}

export function CPCMetricCard({
  title,
  currentCPC,
  previousCPC,
  trend,
  category,
  description,
  currency = "¥",
}: CPCMetricCardProps) {
  const trendPercentage = previousCPC > 0 
    ? ((currentCPC - previousCPC) / previousCPC * 100).toFixed(1)
    : "0.0";

  const getCategoryColor = (category: 'high' | 'medium' | 'low') => {
    switch (category) {
      case 'high':
        return "bg-red-50 text-red-700 border-red-200";
      case 'medium':
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'low':
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getCategoryLabel = (category: 'high' | 'medium' | 'low') => {
    switch (category) {
      case 'high':
        return "高";
      case 'medium':
        return "中";
      case 'low':
        return "低";
      default:
        return "不明";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="h-4 w-4 text-red-600" />;
      case 'down':
        return <TrendingDownIcon className="h-4 w-4 text-green-600" />;
      case 'stable':
        return <MinusIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return "text-red-600";
      case 'down':
        return "text-green-600";
      case 'stable':
        return "text-gray-600";
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge variant="outline" className={getCategoryColor(category)}>
          {getCategoryLabel(category)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currency}{currentCPC.toFixed(2)}
        </div>
        {description && (
          <CardDescription className="text-xs text-muted-foreground mt-1">
            {description}
          </CardDescription>
        )}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
          {getTrendIcon()}
          <span className={getTrendColor()}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(parseFloat(trendPercentage))}%
          </span>
          <span>前期比</span>
        </div>
      </CardContent>
    </Card>
  );
}