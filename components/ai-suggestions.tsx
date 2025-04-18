"use client";

import { LightbulbIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AiSuggestionsProps {
  className?: string;
}

export function AiSuggestions({ className }: AiSuggestionsProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-primary" />
        <div>
          <CardTitle>Gemini AI 最適化提案</CardTitle>
          <CardDescription>
            AIによる広告パフォーマンス向上のための提案
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <LightbulbIcon className="mt-0.5 h-5 w-5 text-amber-500" />
            <div className="space-y-1">
              <p className="font-medium">キーワード最適化</p>
              <p className="text-sm text-muted-foreground">
                「オンラインショップ」キーワードのパフォーマンスが低下しています。「ECサイト構築」「ネットショップ開設」などの代替キーワードを追加することで、コンバージョン率が15%向上する可能性があります。
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                提案を適用
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <TrendingUpIcon className="mt-0.5 h-5 w-5 text-emerald-500" />
            <div className="space-y-1">
              <p className="font-medium">入札戦略の改善</p>
              <p className="text-sm text-muted-foreground">
                コンバージョン価値の最大化を目標とした自動入札に切り替えることで、ROASが20%向上する可能性があります。過去30日間のデータに基づく予測です。
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                提案を適用
              </Button>
            </div>
          </div>
        </div>
        <Button variant="link" className="w-full">
          すべての提案を見る
        </Button>
      </CardContent>
    </Card>
  );
}
