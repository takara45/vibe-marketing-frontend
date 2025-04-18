"use client"

import { useState } from "react"
import { CalendarIcon, DownloadIcon, MailIcon, PlusIcon, Share2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/date-picker-with-range"

export function AnalyticsReport() {
  const [createReportDialogOpen, setCreateReportDialogOpen] = useState(false)
  const [scheduleReportDialogOpen, setScheduleReportDialogOpen] = useState(false)
  const [shareReportDialogOpen, setShareReportDialogOpen] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState("performance")
  const [selectedReportFormat, setSelectedReportFormat] = useState("dashboard")
  const [selectedDate, setSelectedDate] = useState<Date>()

  // サンプルレポートデータ
  const reports = [
    {
      id: "1",
      name: "週次パフォーマンスレポート",
      type: "performance",
      frequency: "weekly",
      lastGenerated: "2024年3月21日",
      recipients: ["team@example.com"],
    },
    {
      id: "2",
      name: "月次コンバージョンレポート",
      type: "conversion",
      frequency: "monthly",
      lastGenerated: "2024年3月1日",
      recipients: ["manager@example.com"],
    },
    {
      id: "3",
      name: "キャンペーン別ROIレポート",
      type: "roi",
      frequency: "monthly",
      lastGenerated: "2024年3月1日",
      recipients: ["director@example.com"],
    },
    {
      id: "4",
      name: "広告グループパフォーマンス",
      type: "adgroup",
      frequency: "weekly",
      lastGenerated: "2024年3月21日",
      recipients: ["team@example.com"],
    },
    {
      id: "5",
      name: "キーワード効率レポート",
      type: "keyword",
      frequency: "weekly",
      lastGenerated: "2024年3月21日",
      recipients: ["team@example.com"],
    },
  ]

  // レポートタイプに基づいて利用可能な指標を取得
  const getMetricsForReportType = (type: string) => {
    switch (type) {
      case "performance":
        return [
          { id: "impressions", label: "インプレッション" },
          { id: "clicks", label: "クリック数" },
          { id: "ctr", label: "クリック率 (CTR)" },
          { id: "cost", label: "費用" },
          { id: "avgCpc", label: "平均クリック単価 (CPC)" },
        ]
      case "conversion":
        return [
          { id: "conversions", label: "コンバージョン数" },
          { id: "convRate", label: "コンバージョン率" },
          { id: "cpa", label: "コンバージョン単価 (CPA)" },
          { id: "convValue", label: "コンバージョン価値" },
          { id: "roas", label: "広告費用対効果 (ROAS)" },
        ]
      case "roi":
        return [
          { id: "cost", label: "費用" },
          { id: "revenue", label: "売上" },
          { id: "profit", label: "利益" },
          { id: "roi", label: "投資収益率 (ROI)" },
          { id: "roas", label: "広告費用対効果 (ROAS)" },
        ]
      case "adgroup":
        return [
          { id: "impressions", label: "インプレッション" },
          { id: "clicks", label: "クリック数" },
          { id: "ctr", label: "クリック率 (CTR)" },
          { id: "conversions", label: "コンバージョン数" },
          { id: "cost", label: "費用" },
        ]
      case "keyword":
        return [
          { id: "impressions", label: "インプレッション" },
          { id: "clicks", label: "クリック数" },
          { id: "ctr", label: "クリック率 (CTR)" },
          { id: "conversions", label: "コンバージョン数" },
          { id: "position", label: "平均掲載順位" },
        ]
      default:
        return []
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">分析レポート</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCreateReportDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            新規レポート
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <DownloadIcon className="mr-2 h-4 w-4" />
                エクスポート
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF形式でダウンロード</DropdownMenuItem>
              <DropdownMenuItem>Excel形式でダウンロード</DropdownMenuItem>
              <DropdownMenuItem>CSV形式でダウンロード</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShareReportDialogOpen(true)}>
                <Share2Icon className="mr-2 h-4 w-4" />
                <span>共有</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScheduleReportDialogOpen(true)}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>定期配信を設定</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>レポートタイプ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start font-normal">
                  すべてのレポート
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  定期レポート
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  カスタムレポート
                </Button>
              </div>
              <div className="pt-2">
                <h4 className="mb-1 text-sm font-medium">レポートカテゴリ</h4>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    パフォーマンス
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    コンバージョン
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    ROI分析
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    広告グループ
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    キーワード
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>期間</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <DatePickerWithRange className="w-full" />
              <div className="pt-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start font-normal">
                  今日
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  昨日
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  過去7日間
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  過去30日間
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  今月
                </Button>
                <Button variant="ghost" className="w-full justify-start font-normal">
                  先月
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>保存済みレポート</CardTitle>
              <CardDescription>定期的に生成されるレポートや保存したカスタムレポート</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        <span>
                          {report.frequency === "weekly"
                            ? "週次"
                            : report.frequency === "monthly"
                              ? "月次"
                              : report.frequency === "daily"
                                ? "日次"
                                : "カスタム"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>最終更新: {report.lastGenerated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        表示
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>PDF形式でダウンロード</DropdownMenuItem>
                          <DropdownMenuItem>Excel形式でダウンロード</DropdownMenuItem>
                          <DropdownMenuItem>CSV形式でダウンロード</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setShareReportDialogOpen(true)}>
                            <Share2Icon className="mr-2 h-4 w-4" />
                            <span>共有</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>最近表示したレポート</CardTitle>
              <CardDescription>最近アクセスしたレポート</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">キャンペーンパフォーマンス概要</h4>
                    <div className="text-sm text-muted-foreground">
                      <span>カスタム</span>
                      <span className="mx-2">•</span>
                      <span>表示日: 2024年3月21日</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      表示
                    </Button>
                    <Button variant="ghost" size="sm">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">広告グループ別コンバージョン分析</h4>
                    <div className="text-sm text-muted-foreground">
                      <span>カスタム</span>
                      <span className="mx-2">•</span>
                      <span>表示日: 2024年3月20日</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      表示
                    </Button>
                    <Button variant="ghost" size="sm">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 新規レポート作成ダイアログ */}
      <Dialog open={createReportDialogOpen} onOpenChange={setCreateReportDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>新規レポートの作成</DialogTitle>
            <DialogDescription>
              新しいレポートを作成します。レポートの種類と表示する指標を選択してください。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="report-name">レポート名</Label>
              <Input id="report-name" placeholder="例: 週次パフォーマンスレポート" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-type">レポートタイプ</Label>
              <Select defaultValue={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="レポートタイプを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">パフォーマンスレポート</SelectItem>
                  <SelectItem value="conversion">コンバージョンレポート</SelectItem>
                  <SelectItem value="roi">ROI分析レポート</SelectItem>
                  <SelectItem value="adgroup">広告グループレポート</SelectItem>
                  <SelectItem value="keyword">キーワードレポート</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-format">レポート形式</Label>
              <Select defaultValue={selectedReportFormat} onValueChange={setSelectedReportFormat}>
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="レポート形式を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">ダッシュボード</SelectItem>
                  <SelectItem value="table">テーブル</SelectItem>
                  <SelectItem value="chart">グラフ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>表示する指標</Label>
              <div className="grid grid-cols-2 gap-2">
                {getMetricsForReportType(selectedReportType).map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox id={`metric-${metric.id}`} defaultChecked />
                    <Label htmlFor={`metric-${metric.id}`} className="font-normal">
                      {metric.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>比較オプション</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="compare-previous" />
                <Label htmlFor="compare-previous" className="font-normal">
                  前期間と比較
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="compare-year" />
                <Label htmlFor="compare-year" className="font-normal">
                  前年同期と比較
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateReportDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setCreateReportDialogOpen(false)}>レポートを作成</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* レポート定期配信設定ダイアログ */}
      <Dialog open={scheduleReportDialogOpen} onOpenChange={setScheduleReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>レポート定期配信の設定</DialogTitle>
            <DialogDescription>レポートの定期配信スケジュールを設定します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="schedule-frequency">配信頻度</Label>
              <Select defaultValue="weekly">
                <SelectTrigger id="schedule-frequency">
                  <SelectValue placeholder="配信頻度を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">毎日</SelectItem>
                  <SelectItem value="weekly">毎週</SelectItem>
                  <SelectItem value="monthly">毎月</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule-day">配信日</Label>
              <Select defaultValue="1">
                <SelectTrigger id="schedule-day">
                  <SelectValue placeholder="配信日を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">月曜日</SelectItem>
                  <SelectItem value="2">火曜日</SelectItem>
                  <SelectItem value="3">水曜日</SelectItem>
                  <SelectItem value="4">木曜日</SelectItem>
                  <SelectItem value="5">金曜日</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>配信時間</Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="9">
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="時" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>:</span>
                <Select defaultValue="0">
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="分" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 15, 30, 45].map((minute) => (
                      <SelectItem key={minute} value={minute.toString()}>
                        {minute.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recipients">受信者メールアドレス</Label>
              <Input id="recipients" placeholder="例: user@example.com, team@example.com" />
              <p className="text-xs text-muted-foreground">複数のメールアドレスはカンマで区切ってください。</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-format">レポート形式</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="レポート形式を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleReportDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setScheduleReportDialogOpen(false)}>スケジュールを設定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* レポート共有ダイアログ */}
      <Dialog open={shareReportDialogOpen} onOpenChange={setShareReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>レポートを共有</DialogTitle>
            <DialogDescription>レポートを他のユーザーと共有します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="share-email">メールアドレス</Label>
              <Input id="share-email" placeholder="例: user@example.com, team@example.com" />
              <p className="text-xs text-muted-foreground">複数のメールアドレスはカンマで区切ってください。</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="share-message">メッセージ（任意）</Label>
              <Input id="share-message" placeholder="例: 先週のパフォーマンスレポートです。" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="share-format">レポート形式</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="share-format">
                  <SelectValue placeholder="レポート形式を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareReportDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setShareReportDialogOpen(false)}>
              <MailIcon className="mr-2 h-4 w-4" />
              共有
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
