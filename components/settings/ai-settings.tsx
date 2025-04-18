"use client"

import { SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function AiSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-primary" />
            <CardTitle>Gemini AI 設定</CardTitle>
          </div>
          <CardDescription>AIによる広告最適化と提案の設定を管理します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">広告テキスト生成</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="text-generation">テキスト生成を有効化</Label>
                  <p className="text-sm text-muted-foreground">
                    Gemini AIによる広告見出しと説明文の自動生成を有効にします。
                  </p>
                </div>
                <Switch id="text-generation" defaultChecked />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="creativity-level">創造性レベル</Label>
                  <span className="text-sm text-muted-foreground">バランス</span>
                </div>
                <Slider id="creativity-level" defaultValue={[50]} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>保守的</span>
                  <span>バランス</span>
                  <span>創造的</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">トーン</Label>
                <Select defaultValue="professional">
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="トーンを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">プロフェッショナル</SelectItem>
                    <SelectItem value="friendly">フレンドリー</SelectItem>
                    <SelectItem value="casual">カジュアル</SelectItem>
                    <SelectItem value="enthusiastic">熱意的</SelectItem>
                    <SelectItem value="informative">情報提供的</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">画像生成 (Imagen)</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="image-generation">画像生成を有効化</Label>
                  <p className="text-sm text-muted-foreground">Imagen AIによる広告用画像の自動生成を有効にします。</p>
                </div>
                <Switch id="image-generation" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-style">画像スタイル</Label>
                <Select defaultValue="modern">
                  <SelectTrigger id="image-style">
                    <SelectValue placeholder="スタイルを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">モダン</SelectItem>
                    <SelectItem value="minimalist">ミニマリスト</SelectItem>
                    <SelectItem value="corporate">コーポレート</SelectItem>
                    <SelectItem value="vibrant">鮮やか</SelectItem>
                    <SelectItem value="artistic">アーティスティック</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">最適化提案</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="optimization-suggestions">最適化提案を有効化</Label>
                  <p className="text-sm text-muted-foreground">
                    Gemini AIによる広告パフォーマンス向上のための提案を有効にします。
                  </p>
                </div>
                <Switch id="optimization-suggestions" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggestion-frequency">提案頻度</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="suggestion-frequency">
                    <SelectValue placeholder="頻度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">リアルタイム</SelectItem>
                    <SelectItem value="daily">毎日</SelectItem>
                    <SelectItem value="weekly">毎週</SelectItem>
                    <SelectItem value="monthly">毎月</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-apply">提案の自動適用</Label>
                  <p className="text-sm text-muted-foreground">高信頼度の提案を自動的に適用します。</p>
                </div>
                <Switch id="auto-apply" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>設定を保存</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
