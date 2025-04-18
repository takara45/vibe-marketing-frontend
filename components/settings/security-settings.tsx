"use client"

import { useState } from "react"
import { ShieldIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SecuritySettings() {
  const [loginSessions, setLoginSessions] = useState([
    {
      id: "1",
      device: "MacBook Pro",
      location: "東京, 日本",
      ip: "192.168.1.1",
      lastActive: "現在アクティブ",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 13",
      location: "東京, 日本",
      ip: "192.168.1.2",
      lastActive: "2024年3月20日 18:30",
      current: false,
    },
    {
      id: "3",
      device: "Windows PC",
      location: "大阪, 日本",
      ip: "192.168.1.3",
      lastActive: "2024年3月19日 10:15",
      current: false,
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
          <CardDescription>アカウントのパスワードを変更します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">現在のパスワード</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">新しいパスワード</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">新しいパスワード（確認）</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>パスワードを変更</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>二段階認証</CardTitle>
          <CardDescription>アカウントのセキュリティを強化するために二段階認証を設定します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">二段階認証を有効化</Label>
              <p className="text-sm text-muted-foreground">
                ログイン時にSMSまたは認証アプリによる確認コードの入力が必要になります。
              </p>
            </div>
            <Switch id="2fa" />
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <ShieldIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-medium">二段階認証が無効です</h3>
                <p className="text-sm text-muted-foreground">
                  アカウントのセキュリティを強化するために、二段階認証の設定をお勧めします。
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  設定を開始
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ログインセッション</CardTitle>
          <CardDescription>現在アクティブなログインセッションを管理します。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>デバイス</TableHead>
                <TableHead>場所</TableHead>
                <TableHead>IPアドレス</TableHead>
                <TableHead>最終アクティブ</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="font-medium">{session.device}</div>
                    {session.current && <div className="text-xs text-emerald-500">現在のセッション</div>}
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.ip}</TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell className="text-right">
                    {!session.current && (
                      <Button variant="ghost" size="sm">
                        終了
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline">他のすべてのセッションを終了</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>APIアクセス制限</CardTitle>
          <CardDescription>APIへのアクセスを制限し、セキュリティを強化します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ip-restriction">IPアドレス制限</Label>
              <p className="text-sm text-muted-foreground">特定のIPアドレスからのみAPIアクセスを許可します。</p>
            </div>
            <Switch id="ip-restriction" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="allowed-ips">許可するIPアドレス</Label>
            <Input id="allowed-ips" placeholder="例: 192.168.1.1, 192.168.1.2" />
            <p className="text-xs text-muted-foreground">カンマ区切りで複数のIPアドレスを入力できます。</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rate-limiting">レート制限</Label>
              <p className="text-sm text-muted-foreground">APIリクエストの回数を制限します。</p>
            </div>
            <Switch id="rate-limiting" defaultChecked />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rate-limit">1分あたりの最大リクエスト数</Label>
            <Input id="rate-limit" type="number" defaultValue="100" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>設定を保存</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
