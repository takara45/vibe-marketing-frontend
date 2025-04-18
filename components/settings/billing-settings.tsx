"use client"

import { CreditCardIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>現在のプラン</CardTitle>
          <CardDescription>現在のサブスクリプションプランと使用状況を確認します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">ビジネスプラン</h3>
              <p className="text-sm text-muted-foreground">月額 ¥15,000（税抜）</p>
            </div>
            <Badge>現在のプラン</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>広告アカウント数</span>
              <span>3 / 5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>キャンペーン数</span>
              <span>12 / 無制限</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>AI生成クレジット</span>
              <span>450 / 1,000</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>チームメンバー</span>
              <span>3 / 10</span>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">次回請求日</h4>
                <p className="text-sm text-muted-foreground">2024年4月21日</p>
              </div>
              <Button variant="outline">プランを変更</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>支払い方法</CardTitle>
          <CardDescription>請求に使用する支払い方法を管理します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Visa •••• 4242</p>
                  <p className="text-sm text-muted-foreground">有効期限: 12/25</p>
                </div>
              </div>
              <Badge>デフォルト</Badge>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                支払い方法を追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>支払い方法を追加</DialogTitle>
                <DialogDescription>新しいクレジットカードまたはデビットカードを追加します。</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">カード番号</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">有効期限</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">セキュリティコード</Label>
                    <Input id="cvc" placeholder="CVC" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">カード名義</Label>
                  <Input id="name" placeholder="名義人の名前" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">キャンセル</Button>
                <Button>追加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>請求履歴</CardTitle>
          <CardDescription>過去の請求履歴を確認します。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>請求日</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024年3月21日</TableCell>
                <TableCell>¥15,000</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    支払い済み
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    領収書
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024年2月21日</TableCell>
                <TableCell>¥15,000</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    支払い済み
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    領収書
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024年1月21日</TableCell>
                <TableCell>¥15,000</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    支払い済み
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    領収書
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
