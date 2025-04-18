"use client"

import { useState } from "react"
import { ChromeIcon as GoogleIcon, LinkIcon, PlusIcon, UnlinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export function GoogleAdsSettings() {
  const [accounts, setAccounts] = useState([
    {
      id: "123-456-7890",
      name: "Acme Inc - メイン",
      status: "connected",
      lastSync: "2024年3月21日 7:30",
      autoSync: true,
    },
    {
      id: "234-567-8901",
      name: "Acme Inc - テスト",
      status: "connected",
      lastSync: "2024年3月20日 15:45",
      autoSync: false,
    },
  ])

  const handleToggleAutoSync = (id: string) => {
    setAccounts(accounts.map((account) => (account.id === id ? { ...account, autoSync: !account.autoSync } : account)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Google広告アカウント連携</CardTitle>
          <CardDescription>Google広告アカウントを連携して、キャンペーンデータを同期します。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>アカウント</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>最終同期</TableHead>
                <TableHead>自動同期</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-muted-foreground">{account.id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {account.status === "connected" ? "連携済み" : "未連携"}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.lastSync}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`auto-sync-${account.id}`}
                        checked={account.autoSync}
                        onCheckedChange={() => handleToggleAutoSync(account.id)}
                      />
                      <Label htmlFor={`auto-sync-${account.id}`}>{account.autoSync ? "有効" : "無効"}</Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        同期
                      </Button>
                      <Button variant="outline" size="sm">
                        <UnlinkIcon className="mr-2 h-4 w-4" />
                        連携解除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                アカウントを追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Google広告アカウントを追加</DialogTitle>
                <DialogDescription>連携するGoogle広告アカウントの情報を入力してください。</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="account-id">アカウントID</Label>
                  <Input id="account-id" placeholder="例: 123-456-7890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-name">アカウント名</Label>
                  <Input id="account-name" placeholder="例: メインアカウント" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">キャンセル</Button>
                <Button>
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Googleで認証
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>同期設定</CardTitle>
          <CardDescription>Google広告データの同期頻度と範囲を設定します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="sync-frequency">同期頻度</Label>
            <Select defaultValue="hourly">
              <SelectTrigger id="sync-frequency">
                <SelectValue placeholder="同期頻度を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">リアルタイム</SelectItem>
                <SelectItem value="hourly">1時間ごと</SelectItem>
                <SelectItem value="daily">1日1回</SelectItem>
                <SelectItem value="manual">手動のみ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sync-data">同期データ</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="sync-campaigns" defaultChecked />
                <Label htmlFor="sync-campaigns">キャンペーン</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sync-adgroups" defaultChecked />
                <Label htmlFor="sync-adgroups">広告グループ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sync-ads" defaultChecked />
                <Label htmlFor="sync-ads">広告</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sync-keywords" defaultChecked />
                <Label htmlFor="sync-keywords">キーワード</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sync-performance" defaultChecked />
                <Label htmlFor="sync-performance">パフォーマンスデータ</Label>
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
