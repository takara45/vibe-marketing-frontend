import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CampaignDetailsProps {
  id: string
}

export function CampaignDetails({ id }: CampaignDetailsProps) {
  // 実際のアプリケーションでは、このIDを使用してキャンペーン情報を取得します
  // ここではサンプルデータを使用します
  const campaign = {
    id: "1",
    name: "春の新商品プロモーション",
    type: "search",
    typeName: "検索広告",
    status: "active",
    budget: 30000,
    spent: 320000,
    remaining: 130000,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    impressions: 45230,
    clicks: 1520,
    ctr: 3.36,
    conversions: 78,
    convRate: 5.13,
    cpa: 4102.56,
    roas: 350,
    description:
      "春の新商品ラインナップのプロモーションキャンペーン。主に検索広告を使用して、新商品に関心のあるユーザーにリーチします。",
    goal: "sales",
    goalName: "売上",
    targetAudience: "25-45歳の男女、テクノロジーに関心がある",
    locations: "全国（日本）",
    languages: "日本語",
    devices: "すべてのデバイス",
    adSchedule: "毎日 0:00-23:59",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>キャンペーン概要</CardTitle>
          <CardDescription>キャンペーンの基本情報</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ステータス</p>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    実行中
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">キャンペーンタイプ</p>
                <div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {campaign.typeName}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">キャンペーン目標</p>
              <p>{campaign.goalName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">期間</p>
              <p>
                {campaign.startDate} 〜 {campaign.endDate}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">説明</p>
              <p className="text-sm">{campaign.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>予算と支出</CardTitle>
          <CardDescription>キャンペーンの予算と支出状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">1日の予算</p>
                <p className="font-medium">¥{campaign.budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">総予算</p>
                <p className="font-medium">¥{(campaign.budget * 31).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>使用額: ¥{campaign.spent.toLocaleString()}</span>
                <span>残り: ¥{campaign.remaining.toLocaleString()}</span>
              </div>
              <Progress value={(campaign.spent / (campaign.spent + campaign.remaining)) * 100} className="h-2" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">ターゲットオーディエンス</p>
              <p className="text-sm">{campaign.targetAudience}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">地域</p>
                <p className="text-sm">{campaign.locations}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">言語</p>
                <p className="text-sm">{campaign.languages}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">デバイス</p>
                <p className="text-sm">{campaign.devices}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">配信スケジュール</p>
                <p className="text-sm">{campaign.adSchedule}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
