"use client"

import { useState } from "react"
import { FilterIcon, PlusIcon, SortAscIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NewCampaignDialog } from "@/components/campaigns/new-campaign-dialog"

export function CampaignActions() {
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false)

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <NewCampaignDialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog} />
      <div className="flex items-center gap-2">
        <Input placeholder="キャンペーン名で検索" className="h-9 w-full sm:w-[300px]" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <FilterIcon className="h-4 w-4" />
              <span className="sr-only">フィルター</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>フィルター</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>すべてのキャンペーン</DropdownMenuItem>
              <DropdownMenuItem>実行中のキャンペーン</DropdownMenuItem>
              <DropdownMenuItem>一時停止中のキャンペーン</DropdownMenuItem>
              <DropdownMenuItem>終了したキャンペーン</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>検索広告</DropdownMenuItem>
              <DropdownMenuItem>ディスプレイ広告</DropdownMenuItem>
              <DropdownMenuItem>ショッピング広告</DropdownMenuItem>
              <DropdownMenuItem>動画広告</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <SortAscIcon className="h-4 w-4" />
              <span className="sr-only">並び替え</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>並び替え</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>名前（昇順）</DropdownMenuItem>
            <DropdownMenuItem>名前（降順）</DropdownMenuItem>
            <DropdownMenuItem>作成日（新しい順）</DropdownMenuItem>
            <DropdownMenuItem>作成日（古い順）</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>予算（高い順）</DropdownMenuItem>
            <DropdownMenuItem>予算（低い順）</DropdownMenuItem>
            <DropdownMenuItem>クリック数（多い順）</DropdownMenuItem>
            <DropdownMenuItem>コンバージョン数（多い順）</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button onClick={() => setShowNewCampaignDialog(true)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        新規キャンペーン
      </Button>
    </div>
  )
}
