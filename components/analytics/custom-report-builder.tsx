"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  TableIcon,
  PlusIcon,
  SaveIcon,
  DownloadIcon,
  Share2Icon,
  CalendarIcon,
  XIcon,
  EyeIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define types
interface Metric {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Dimension {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Filter {
  id: string;
  dimension: string;
  operator: string;
  value: string;
}

interface ReportConfig {
  name: string;
  description: string;
  metrics: string[];
  dimensions: string[];
  filters: Filter[];
  chartType: string;
  dateRange: DateRange | undefined;
}

// Sample metrics and dimensions
const availableMetrics: Metric[] = [
  {
    id: "impressions",
    name: "インプレッション",
    category: "パフォーマンス",
    description: "広告が表示された回数",
  },
  {
    id: "clicks",
    name: "クリック数",
    category: "パフォーマンス",
    description: "広告がクリックされた回数",
  },
  {
    id: "ctr",
    name: "クリック率 (CTR)",
    category: "パフォーマンス",
    description: "インプレッションに対するクリック数の割合",
  },
  {
    id: "cost",
    name: "費用",
    category: "費用",
    description: "広告にかかった費用",
  },
  {
    id: "conversions",
    name: "コンバージョン数",
    category: "コンバージョン",
    description: "広告からのコンバージョン数",
  },
  {
    id: "revenue",
    name: "売上",
    category: "収益",
    description: "広告からの売上",
  },
];

const availableDimensions: Dimension[] = [
  { id: "date", name: "日付", category: "時間", description: "データの日付" },
  {
    id: "campaign",
    name: "キャンペーン",
    category: "広告構造",
    description: "広告キャンペーン",
  },
  {
    id: "adGroup",
    name: "広告グループ",
    category: "広告構造",
    description: "広告グループ",
  },
  {
    id: "device",
    name: "デバイス",
    category: "ユーザー",
    description: "ユーザーのデバイス",
  },
  {
    id: "location",
    name: "地域",
    category: "ユーザー",
    description: "ユーザーの地域",
  },
];

// Sample saved reports
const savedReports = [
  {
    id: "1",
    name: "キャンペーン別パフォーマンス",
    description: "キャンペーン別のパフォーマンス指標",
    lastModified: "2024年3月21日",
  },
  {
    id: "2",
    name: "デバイス別コンバージョン",
    description: "デバイス別のコンバージョン指標",
    lastModified: "2024年3月20日",
  },
  {
    id: "3",
    name: "地域別ROI分析",
    description: "地域別のROI指標",
    lastModified: "2024年3月19日",
  },
];

export function CustomReportBuilder() {
  const [selectedTab, setSelectedTab] = useState("builder");
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: "",
    description: "",
    metrics: [],
    dimensions: [],
    filters: [],
    chartType: "bar",
    dateRange: undefined,
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [newFilter, setNewFilter] = useState<Filter>({
    id: "",
    dimension: "",
    operator: "equals",
    value: "",
  });

  // Handle adding a metric
  const handleAddMetric = (metricId: string) => {
    if (!reportConfig.metrics.includes(metricId)) {
      setReportConfig({
        ...reportConfig,
        metrics: [...reportConfig.metrics, metricId],
      });
    }
  };

  // Handle removing a metric
  const handleRemoveMetric = (metricId: string) => {
    setReportConfig({
      ...reportConfig,
      metrics: reportConfig.metrics.filter((id) => id !== metricId),
    });
  };

  // Handle adding a dimension
  const handleAddDimension = (dimensionId: string) => {
    if (!reportConfig.dimensions.includes(dimensionId)) {
      setReportConfig({
        ...reportConfig,
        dimensions: [...reportConfig.dimensions, dimensionId],
      });
    }
  };

  // Handle removing a dimension
  const handleRemoveDimension = (dimensionId: string) => {
    setReportConfig({
      ...reportConfig,
      dimensions: reportConfig.dimensions.filter((id) => id !== dimensionId),
    });
  };

  // Handle adding a new filter
  const handleAddFilter = () => {
    if (newFilter.dimension && newFilter.operator && newFilter.value) {
      const filter = {
        ...newFilter,
        id: `filter-${Date.now()}`,
      };
      setReportConfig({
        ...reportConfig,
        filters: [...reportConfig.filters, filter],
      });
      setNewFilter({
        id: "",
        dimension: "",
        operator: "equals",
        value: "",
      });
      setFilterDialogOpen(false);
    }
  };

  // Handle removing a filter
  const handleRemoveFilter = (filterId: string) => {
    setReportConfig({
      ...reportConfig,
      filters: reportConfig.filters.filter((filter) => filter.id !== filterId),
    });
  };

  // Get metric or dimension by ID
  const getMetricById = (id: string) =>
    availableMetrics.find((metric) => metric.id === id);
  const getDimensionById = (id: string) =>
    availableDimensions.find((dimension) => dimension.id === id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          カスタムレポートビルダー
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewDialogOpen(true)}>
            <EyeIcon className="mr-2 h-4 w-4" />
            プレビュー
          </Button>
          <Button onClick={() => setSaveDialogOpen(true)}>
            <SaveIcon className="mr-2 h-4 w-4" />
            保存
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">レポートビルダー</TabsTrigger>
          <TabsTrigger value="saved">保存済みレポート</TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>レポート設定</CardTitle>
              <CardDescription>レポートの基本情報を設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">レポート名</Label>
                  <Input
                    id="report-name"
                    placeholder="例: キャンペーン別パフォーマンス"
                    value={reportConfig.name}
                    onChange={(e) =>
                      setReportConfig({ ...reportConfig, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chart-type">グラフタイプ</Label>
                  <Select
                    value={reportConfig.chartType}
                    onValueChange={(value) =>
                      setReportConfig({ ...reportConfig, chartType: value })
                    }
                  >
                    <SelectTrigger id="chart-type">
                      <SelectValue placeholder="グラフタイプを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">棒グラフ</SelectItem>
                      <SelectItem value="line">折れ線グラフ</SelectItem>
                      <SelectItem value="pie">円グラフ</SelectItem>
                      <SelectItem value="table">テーブル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-description">説明</Label>
                <Input
                  id="report-description"
                  placeholder="レポートの説明"
                  value={reportConfig.description}
                  onChange={(e) =>
                    setReportConfig({
                      ...reportConfig,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>期間</Label>
                <DatePickerWithRange
                  className="w-full"
                  onChange={(range) =>
                    setReportConfig({ ...reportConfig, dateRange: range })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>指標</CardTitle>
                <CardDescription>
                  レポートに含める指標を選択してください
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>選択した指標</Label>
                    <div className="min-h-[100px] border rounded-md p-2 mt-2">
                      {reportConfig.metrics.length === 0 ? (
                        <div className="flex items-center justify-center h-[100px] text-sm text-muted-foreground">
                          指標が選択されていません
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {reportConfig.metrics.map((metricId) => {
                            const metric = getMetricById(metricId);
                            return metric ? (
                              <div
                                key={metric.id}
                                className="flex items-center justify-between p-2 bg-muted rounded-md"
                              >
                                <div>
                                  <p className="font-medium">{metric.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {metric.description}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveMetric(metric.id)}
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label>利用可能な指標</Label>
                    <div className="max-h-[300px] overflow-y-auto border rounded-md p-2 mt-2">
                      {availableMetrics.map((metric) => (
                        <div
                          key={metric.id}
                          className="flex items-center justify-between p-2 mb-2 bg-background border rounded-md cursor-pointer hover:bg-muted"
                          onClick={() => handleAddMetric(metric.id)}
                        >
                          <div>
                            <p className="font-medium">{metric.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {metric.description}
                            </p>
                          </div>
                          <Badge variant="outline">{metric.category}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ディメンション</CardTitle>
                <CardDescription>
                  レポートに含めるディメンションを選択してください
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>選択したディメンション</Label>
                    <div className="min-h-[100px] border rounded-md p-2 mt-2">
                      {reportConfig.dimensions.length === 0 ? (
                        <div className="flex items-center justify-center h-[100px] text-sm text-muted-foreground">
                          ディメンションが選択されていません
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {reportConfig.dimensions.map((dimensionId) => {
                            const dimension = getDimensionById(dimensionId);
                            return dimension ? (
                              <div
                                key={dimension.id}
                                className="flex items-center justify-between p-2 bg-muted rounded-md"
                              >
                                <div>
                                  <p className="font-medium">
                                    {dimension.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {dimension.description}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRemoveDimension(dimension.id)
                                  }
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label>利用可能なディメンション</Label>
                    <div className="max-h-[300px] overflow-y-auto border rounded-md p-2 mt-2">
                      {availableDimensions.map((dimension) => (
                        <div
                          key={dimension.id}
                          className="flex items-center justify-between p-2 mb-2 bg-background border rounded-md cursor-pointer hover:bg-muted"
                          onClick={() => handleAddDimension(dimension.id)}
                        >
                          <div>
                            <p className="font-medium">{dimension.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {dimension.description}
                            </p>
                          </div>
                          <Badge variant="outline">{dimension.category}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>フィルター</CardTitle>
                <CardDescription>
                  データをフィルタリングする条件を設定します
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterDialogOpen(true)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                フィルター追加
              </Button>
            </CardHeader>
            <CardContent>
              {reportConfig.filters.length === 0 ? (
                <div className="flex items-center justify-center h-[100px] text-sm text-muted-foreground border rounded-md">
                  フィルターが設定されていません
                </div>
              ) : (
                <div className="space-y-2">
                  {reportConfig.filters.map((filter) => {
                    const dimension = getDimensionById(filter.dimension);
                    return (
                      <div
                        key={filter.id}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {dimension?.name || filter.dimension}
                          </Badge>
                          <span>
                            {filter.operator === "equals"
                              ? "="
                              : filter.operator === "contains"
                              ? "含む"
                              : filter.operator === "startsWith"
                              ? "で始まる"
                              : filter.operator}
                          </span>
                          <Badge>{filter.value}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFilter(filter.id)}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>保存済みレポート</CardTitle>
              <CardDescription>
                以前に作成したレポートを表示します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        最終更新: {report.lastModified}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-4 w-4 mr-2" />
                        表示
                      </Button>
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        エクスポート
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2Icon className="h-4 w-4 mr-2" />
                        共有
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Report Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>レポートを保存</DialogTitle>
            <DialogDescription>
              このレポート設定を保存します。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="save-name">レポート名</Label>
              <Input
                id="save-name"
                value={reportConfig.name}
                onChange={(e) =>
                  setReportConfig({ ...reportConfig, name: e.target.value })
                }
                placeholder="例: キャンペーン別パフォーマンス"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="save-description">説明</Label>
              <Input
                id="save-description"
                value={reportConfig.description}
                onChange={(e) =>
                  setReportConfig({
                    ...reportConfig,
                    description: e.target.value,
                  })
                }
                placeholder="レポートの説明"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="schedule" />
                <Label htmlFor="schedule" className="font-normal">
                  定期的に実行する
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setSaveDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>フィルターを追加</DialogTitle>
            <DialogDescription>
              データをフィルタリングする条件を設定します。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="filter-dimension">ディメンション</Label>
              <Select
                value={newFilter.dimension}
                onValueChange={(value) =>
                  setNewFilter({ ...newFilter, dimension: value })
                }
              >
                <SelectTrigger id="filter-dimension">
                  <SelectValue placeholder="ディメンションを選択" />
                </SelectTrigger>
                <SelectContent>
                  {availableDimensions.map((dimension) => (
                    <SelectItem key={dimension.id} value={dimension.id}>
                      {dimension.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="filter-operator">演算子</Label>
              <Select
                value={newFilter.operator}
                onValueChange={(value) =>
                  setNewFilter({ ...newFilter, operator: value })
                }
              >
                <SelectTrigger id="filter-operator">
                  <SelectValue placeholder="演算子を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">等しい (=)</SelectItem>
                  <SelectItem value="notEquals">等しくない (!=)</SelectItem>
                  <SelectItem value="contains">含む</SelectItem>
                  <SelectItem value="startsWith">で始まる</SelectItem>
                  <SelectItem value="endsWith">で終わる</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="filter-value">値</Label>
              <Input
                id="filter-value"
                value={newFilter.value}
                onChange={(e) =>
                  setNewFilter({ ...newFilter, value: e.target.value })
                }
                placeholder="フィルター値"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFilterDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button onClick={handleAddFilter}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>レポートプレビュー</DialogTitle>
            <DialogDescription>
              {reportConfig.name || "無題のレポート"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="h-[400px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <div className="mb-4">
                  {reportConfig.chartType === "bar" && (
                    <BarChart3Icon className="h-16 w-16 mx-auto text-muted-foreground" />
                  )}
                  {reportConfig.chartType === "line" && (
                    <LineChartIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                  )}
                  {reportConfig.chartType === "pie" && (
                    <PieChartIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                  )}
                  {reportConfig.chartType === "table" && (
                    <TableIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  {reportConfig.metrics.length === 0 ||
                  reportConfig.dimensions.length === 0
                    ? "指標とディメンションを選択してレポートを作成してください"
                    : "レポートプレビューはここに表示されます"}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPreviewDialogOpen(false)}
            >
              閉じる
            </Button>
            <Button onClick={() => setPreviewDialogOpen(false)}>
              レポートを生成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
