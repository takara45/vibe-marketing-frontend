"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { AttributeLabels, AttributeColors, type AgeGroupPerformance, type GenderPerformance, type DevicePerformance, type CrossAnalysisData } from "@/lib/types/user-attributes"

interface AudienceInsightsTabProps {
  campaignId: string
}

export function AudienceInsightsTab({ campaignId }: AudienceInsightsTabProps) {
  const [selectedMetric, setSelectedMetric] = useState<'ctr' | 'conversionRate' | 'cpa' | 'roas'>('conversionRate')

  // サンプル年齢層データ
  const ageGroupData: AgeGroupPerformance[] = [
    {
      attribute: '25-34',
      attributeType: 'age',
      impressions: 15420,
      clicks: 680,
      conversions: 42,
      cost: 98000,
      ctr: 4.41,
      conversionRate: 6.18,
      cpc: 144,
      cpa: 2333,
      roas: 380
    },
    {
      attribute: '35-44',
      attributeType: 'age',
      impressions: 12850,
      clicks: 520,
      conversions: 35,
      cost: 78000,
      ctr: 4.05,
      conversionRate: 6.73,
      cpc: 150,
      cpa: 2229,
      roas: 420
    },
    {
      attribute: '18-24',
      attributeType: 'age',
      impressions: 8930,
      clicks: 385,
      conversions: 18,
      cost: 52000,
      ctr: 4.31,
      conversionRate: 4.68,
      cpc: 135,
      cpa: 2889,
      roas: 280
    },
    {
      attribute: '45-54',
      attributeType: 'age',
      impressions: 6200,
      clicks: 240,
      conversions: 16,
      cost: 38000,
      ctr: 3.87,
      conversionRate: 6.67,
      cpc: 158,
      cpa: 2375,
      roas: 350
    },
    {
      attribute: '55-64',
      attributeType: 'age',
      impressions: 3800,
      clicks: 152,
      conversions: 8,
      cost: 25000,
      ctr: 4.00,
      conversionRate: 5.26,
      cpc: 164,
      cpa: 3125,
      roas: 240
    },
    {
      attribute: '65+',
      attributeType: 'age',
      impressions: 2100,
      clicks: 89,
      conversions: 4,
      cost: 15000,
      ctr: 4.24,
      conversionRate: 4.49,
      cpc: 169,
      cpa: 3750,
      roas: 200
    }
  ]

  // サンプル性別データ
  const genderData: GenderPerformance[] = [
    {
      attribute: 'female',
      attributeType: 'gender',
      impressions: 24500,
      clicks: 1050,
      conversions: 68,
      cost: 158000,
      ctr: 4.29,
      conversionRate: 6.48,
      cpc: 150,
      cpa: 2324,
      roas: 380
    },
    {
      attribute: 'male',
      attributeType: 'gender',
      impressions: 20800,
      clicks: 890,
      conversions: 55,
      cost: 132000,
      ctr: 4.28,
      conversionRate: 6.18,
      cpc: 148,
      cpa: 2400,
      roas: 340
    },
    {
      attribute: 'unknown',
      attributeType: 'gender',
      impressions: 4000,
      clicks: 180,
      conversions: 8,
      cost: 28000,
      ctr: 4.50,
      conversionRate: 4.44,
      cpc: 156,
      cpa: 3500,
      roas: 220
    }
  ]

  // サンプルデバイス別データ
  const deviceData: DevicePerformance[] = [
    {
      attribute: 'mobile',
      attributeType: 'device',
      impressions: 28500,
      clicks: 1250,
      conversions: 75,
      cost: 185000,
      ctr: 4.39,
      conversionRate: 6.00,
      cpc: 148,
      cpa: 2467,
      roas: 350
    },
    {
      attribute: 'desktop',
      attributeType: 'device',
      impressions: 18200,
      clicks: 780,
      conversions: 52,
      cost: 118000,
      ctr: 4.29,
      conversionRate: 6.67,
      cpc: 151,
      cpa: 2269,
      roas: 390
    },
    {
      attribute: 'tablet',
      attributeType: 'device',
      impressions: 2600,
      clicks: 90,
      conversions: 4,
      cost: 15000,
      ctr: 3.46,
      conversionRate: 4.44,
      cpc: 167,
      cpa: 3750,
      roas: 200
    }
  ]

  // クロス分析サンプルデータ
  const crossAnalysisData: CrossAnalysisData[] = [
    {
      ageGroup: '25-34',
      gender: 'female',
      device: 'mobile',
      region: 'tokyo',
      impressions: 5200,
      clicks: 235,
      conversions: 18,
      cost: 34000,
      ctr: 4.52,
      conversionRate: 7.66,
      cpc: 145,
      cpa: 1889,
      roas: 450
    },
    {
      ageGroup: '35-44',
      gender: 'male',
      device: 'desktop',
      region: 'osaka',
      impressions: 3800,
      clicks: 165,
      conversions: 12,
      cost: 25000,
      ctr: 4.34,
      conversionRate: 7.27,
      cpc: 152,
      cpa: 2083,
      roas: 420
    }
  ]

  const formatMetricValue = (value: number, metric: string) => {
    switch (metric) {
      case 'ctr':
      case 'conversionRate':
        return `${value.toFixed(2)}%`
      case 'cpa':
      case 'cpc':
        return `¥${value.toLocaleString()}`
      case 'roas':
        return `${value}%`
      default:
        return value.toLocaleString()
    }
  }

  const getMetricValue = (item: any, metric: string) => {
    return item[metric] || 0
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DatePickerWithRange className="w-full md:w-auto" />
        <div className="flex gap-2">
          <Button variant="outline">比較期間</Button>
          <Button variant="outline">エクスポート</Button>
        </div>
      </div>

      <Tabs defaultValue="age-analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="age-analysis">年齢層分析</TabsTrigger>
          <TabsTrigger value="gender-analysis">性別分析</TabsTrigger>
          <TabsTrigger value="device-analysis">デバイス分析</TabsTrigger>
          <TabsTrigger value="cross-analysis">クロス分析</TabsTrigger>
        </TabsList>

        <TabsContent value="age-analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>年齢層別パフォーマンス</CardTitle>
                <CardDescription>各年齢層の主要指標</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    {(['ctr', 'conversionRate', 'cpa', 'roas'] as const).map((metric) => (
                      <Button
                        key={metric}
                        variant={selectedMetric === metric ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetric(metric)}
                      >
                        {metric === 'ctr' && 'CTR'}
                        {metric === 'conversionRate' && 'CV率'}
                        {metric === 'cpa' && 'CPA'}
                        {metric === 'roas' && 'ROAS'}
                      </Button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageGroupData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="attribute" 
                      tickFormatter={(value) => AttributeLabels.ageGroup[value as keyof typeof AttributeLabels.ageGroup]}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatMetricValue(value, selectedMetric), selectedMetric]}
                      labelFormatter={(label) => AttributeLabels.ageGroup[label as keyof typeof AttributeLabels.ageGroup]}
                    />
                    <Bar 
                      dataKey={selectedMetric} 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>年齢層別シェア</CardTitle>
                <CardDescription>インプレッション数による構成比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ageGroupData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="impressions"
                      label={({ attribute, percent }) => 
                        `${AttributeLabels.ageGroup[attribute as keyof typeof AttributeLabels.ageGroup]} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {ageGroupData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={AttributeColors.ageGroup[entry.attribute as keyof typeof AttributeColors.ageGroup]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'インプレッション']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>年齢層別詳細データ</CardTitle>
              <CardDescription>全指標の一覧表示</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">年齢層</th>
                      <th className="text-right p-2">インプレッション</th>
                      <th className="text-right p-2">クリック</th>
                      <th className="text-right p-2">CTR</th>
                      <th className="text-right p-2">コンバージョン</th>
                      <th className="text-right p-2">CV率</th>
                      <th className="text-right p-2">CPA</th>
                      <th className="text-right p-2">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ageGroupData.map((row) => (
                      <tr key={row.attribute} className="border-b">
                        <td className="p-2">
                          <Badge variant="outline" style={{ backgroundColor: `${AttributeColors.ageGroup[row.attribute as keyof typeof AttributeColors.ageGroup]}20` }}>
                            {AttributeLabels.ageGroup[row.attribute as keyof typeof AttributeLabels.ageGroup]}
                          </Badge>
                        </td>
                        <td className="text-right p-2">{row.impressions.toLocaleString()}</td>
                        <td className="text-right p-2">{row.clicks.toLocaleString()}</td>
                        <td className="text-right p-2">{row.ctr.toFixed(2)}%</td>
                        <td className="text-right p-2">{row.conversions}</td>
                        <td className="text-right p-2">{row.conversionRate.toFixed(2)}%</td>
                        <td className="text-right p-2">¥{row.cpa.toLocaleString()}</td>
                        <td className="text-right p-2">{row.roas}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gender-analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>性別パフォーマンス</CardTitle>
                <CardDescription>性別による主要指標の比較</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    {(['ctr', 'conversionRate', 'cpa', 'roas'] as const).map((metric) => (
                      <Button
                        key={metric}
                        variant={selectedMetric === metric ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetric(metric)}
                      >
                        {metric === 'ctr' && 'CTR'}
                        {metric === 'conversionRate' && 'CV率'}
                        {metric === 'cpa' && 'CPA'}
                        {metric === 'roas' && 'ROAS'}
                      </Button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={genderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="attribute" 
                      tickFormatter={(value) => AttributeLabels.gender[value as keyof typeof AttributeLabels.gender]}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatMetricValue(value, selectedMetric), selectedMetric]}
                      labelFormatter={(label) => AttributeLabels.gender[label as keyof typeof AttributeLabels.gender]}
                    />
                    <Bar 
                      dataKey={selectedMetric}
                      radius={[4, 4, 0, 0]}
                    >
                      {genderData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={AttributeColors.gender[entry.attribute as keyof typeof AttributeColors.gender]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性別シェア</CardTitle>
                <CardDescription>インプレッション数による構成比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="impressions"
                      label={({ attribute, percent }) => 
                        `${AttributeLabels.gender[attribute as keyof typeof AttributeLabels.gender]} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {genderData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={AttributeColors.gender[entry.attribute as keyof typeof AttributeColors.gender]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'インプレッション']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="device-analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>デバイス別パフォーマンス</CardTitle>
                <CardDescription>デバイスタイプによる主要指標</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    {(['ctr', 'conversionRate', 'cpa', 'roas'] as const).map((metric) => (
                      <Button
                        key={metric}
                        variant={selectedMetric === metric ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetric(metric)}
                      >
                        {metric === 'ctr' && 'CTR'}
                        {metric === 'conversionRate' && 'CV率'}
                        {metric === 'cpa' && 'CPA'}
                        {metric === 'roas' && 'ROAS'}
                      </Button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={deviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="attribute" 
                      tickFormatter={(value) => AttributeLabels.device[value as keyof typeof AttributeLabels.device]}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [formatMetricValue(value, selectedMetric), selectedMetric]}
                      labelFormatter={(label) => AttributeLabels.device[label as keyof typeof AttributeLabels.device]}
                    />
                    <Bar 
                      dataKey={selectedMetric}
                      radius={[4, 4, 0, 0]}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={AttributeColors.device[entry.attribute as keyof typeof AttributeColors.device]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>デバイス別シェア</CardTitle>
                <CardDescription>インプレッション数による構成比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="impressions"
                      label={({ attribute, percent }) => 
                        `${AttributeLabels.device[attribute as keyof typeof AttributeLabels.device]} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {deviceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={AttributeColors.device[entry.attribute as keyof typeof AttributeColors.device]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'インプレッション']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cross-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>クロス分析</CardTitle>
              <CardDescription>属性を組み合わせた詳細分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  最も効果的な属性組み合わせを表示しています
                </div>
                <div className="grid gap-4">
                  {crossAnalysisData.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" style={{ backgroundColor: `${AttributeColors.ageGroup[item.ageGroup]}20` }}>
                          {AttributeLabels.ageGroup[item.ageGroup]}
                        </Badge>
                        <Badge variant="outline" style={{ backgroundColor: `${AttributeColors.gender[item.gender]}20` }}>
                          {AttributeLabels.gender[item.gender]}
                        </Badge>
                        <Badge variant="outline" style={{ backgroundColor: `${AttributeColors.device[item.device]}20` }}>
                          {AttributeLabels.device[item.device]}
                        </Badge>
                        <Badge variant="outline">
                          {AttributeLabels.region[item.region]}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">インプレッション</div>
                          <div className="font-medium">{item.impressions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">CTR</div>
                          <div className="font-medium">{item.ctr.toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">CV率</div>
                          <div className="font-medium">{item.conversionRate.toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">ROAS</div>
                          <div className="font-medium">{item.roas}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}