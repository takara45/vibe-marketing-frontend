"use client"

import { useState } from "react"
import { CopyIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface KeywordsTabProps {
  campaignId: string
}

export function KeywordsTab({ campaignId }: KeywordsTabProps) {
  const [newKeywordDialogOpen, setNewKeywordDialogOpen] = useState(false)
  const [selectedAdGroup, setSelectedAdGroup] = useState<string | null>(null)

  // サンプルデータ
  const adGroups = [
    { id: "1", name: "商品A - 検索広告" },
    { id: "2", name: "商品B - 検索広告" },
    { id: "3", name: "ブランドキーワード" },
  ]

  const keywords = [
    {
      id: "1",
      adGroupId: "1",
      keyword: "オンラインショップ 開設",
      matchType: "phrase",
      status: "active",
      impressions: 5240,
      clicks: 210,
      ctr: 4.01,
      conversions: 12,
      convRate: 5.71,
      cost: 42000,
      cpa: 3500.0,
      position: 2.3,
    },
    {
      id: "2",
      adGroupId: "1",
      keyword: "ECサイト 構築",
      matchType: "exact",
      status: "active",
      impressions: 4850,
      clicks: 195,
      ctr: 4.02,
      conversions: 10,
      convRate: 5.13,
      cost: 39000,
      cpa: 3900.0,
      position: 1.8,
    },
    {
      id: "3",
      adGroupId: "2",
      keyword: "ネットショップ 作り方",
      matchType: "broad",
      status: "active",
      impressions: 6320,
      clicks: 180,
      ctr: 2.85,
      conversions: 8,
      convRate: 4.44,
      cost: 36000,
      cpa: 4500.0,
      position: 3.2,
    },
    {
      id: "4",
      adGroupId: "3",
      keyword: "[ブランド名]",
      matchType: "exact",
      status: "active",
      impressions: 3250,
      clicks: 280,
      ctr: 8.62,
      conversions: 18,
      convRate: 6.43,
      cost: 28000,
      cpa: 1555.56,
      position: 1.1,
    },
    {
      id: "5",
      adGroupId: "2",
      keyword: "オンラインショップ プラットフォーム",
      matchType: "phrase",
      status: "active",
      impressions: 4120,
      clicks: 165,
      ctr: 4.0,
      conversions: 9,
      convRate: 5.45,
      cost: 33000,
      cpa: 3666.67,
      position: 2.5,
    },
  ]

  const filteredKeywords = selectedAdGroup
    ? keywords.filter((keyword) => keyword.adGroupId === selectedAdGroup)
    : keywords

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select onValueChange={(value) => setSelectedAdGroup(value === "all" ? null : value)}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="すべての広告グループ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての広告グループ</SelectItem>
              {adGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setNewKeywordDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          キーワードを追加
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>キーワード一覧</CardTitle>
          <CardDescription>キャンペーンのキーワードとそのパフォーマンスを表示します</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>キーワード</TableHead>
                <TableHead>マッチタイプ</TableHead>
                <TableHead>広告グループ</TableHead>
                <TableHead className="text-right">インプレッション</TableHead>
                <TableHead className="text-right">クリック</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">コンバージョン</TableHead>
                <TableHead className="text-right">費用</TableHead>
                <TableHead className="text-right">平均掲載順位</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeywords.map((keyword) => (
                <TableRow key={keyword.id}>
                  <TableCell className="font-medium">{keyword.keyword}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {keyword.matchType === "exact" && "完全一致"}
                      {keyword.matchType === "phrase" && "フレーズ一致"}
                      {keyword.matchType === "broad" && "部分一致"}
                    </Badge>
                  </TableCell>
                  <TableCell>{adGroups.find((group) => group.id === keyword.adGroupId)?.name}</TableCell>
                  <TableCell className="text-right">{keyword.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{keyword.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{keyword.ctr.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{keyword.conversions}</TableCell>
                  <TableCell className="text-right">¥{keyword.cost.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{keyword.position}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">アクション</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          <span>編集</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CopyIcon className="mr-2 h-4 w-4" />
                          <span>複製</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <TrashIcon className="mr-2 h-4 w-4" />
                          <span>削除</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={newKeywordDialogOpen} onOpenChange={setNewKeywordDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>キーワードの追加</DialogTitle>
            <DialogDescription>新しいキーワードを追加します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="adGroup">広告グループ</Label>
              <Select>
                <SelectTrigger id="adGroup">
                  <SelectValue placeholder="広告グループを選択" />
                </SelectTrigger>
                <SelectContent>
                  {adGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keywords">キーワード</Label>
              <Textarea id="keywords" placeholder="1行に1つのキーワードを入力してください" className="min-h-[100px]" />
              <p className="text-xs text-muted-foreground">
                複数のキーワードを追加する場合は、1行に1つのキーワードを入力してください。
              </p>
            </div>
            <div className="grid gap-2">
              <Label>マッチタイプ</Label>
              <RadioGroup defaultValue="broad">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="broad" id="broad" />
                  <Label htmlFor="broad" className="font-normal">
                    部分一致
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phrase" id="phrase" />
                  <Label htmlFor="phrase" className="font-normal">
                    フレーズ一致
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exact" id="exact" />
                  <Label htmlFor="exact" className="font-normal">
                    完全一致
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewKeywordDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => setNewKeywordDialogOpen(false)}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
