"use client";

import {
  MoreHorizontalIcon,
  PencilIcon,
  PlayIcon,
  StopCircleIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecentCampaignsProps {
  className?: string;
}

export function RecentCampaigns({ className }: RecentCampaignsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>最近のキャンペーン</CardTitle>
        <CardDescription>最近作成または更新されたキャンペーン</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border p-3">
            <div>
              <div className="font-medium">春の新商品プロモーション</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  実行中
                </Badge>
                <span>予算: ¥30,000/日</span>
              </div>
            </div>
            <div className="text-right text-sm">
              <div>CTR: 4.2%</div>
              <div className="text-muted-foreground">コンバージョン: 42</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  編集
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StopCircleIcon className="mr-2 h-4 w-4" />
                  一時停止
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border p-3">
            <div>
              <div className="font-medium">新規顧客獲得キャンペーン</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  一時停止
                </Badge>
                <span>予算: ¥20,000/日</span>
              </div>
            </div>
            <div className="text-right text-sm">
              <div>CTR: 3.8%</div>
              <div className="text-muted-foreground">コンバージョン: 28</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  編集
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlayIcon className="mr-2 h-4 w-4" />
                  再開
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border p-3">
            <div>
              <div className="font-medium">ブランド認知度向上キャンペーン</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  実行中
                </Badge>
                <span>予算: ¥15,000/日</span>
              </div>
            </div>
            <div className="text-right text-sm">
              <div>CTR: 5.1%</div>
              <div className="text-muted-foreground">コンバージョン: 15</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  編集
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StopCircleIcon className="mr-2 h-4 w-4" />
                  一時停止
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="link" className="w-full">
            すべてのキャンペーンを見る
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
