"use client"

import { useState } from "react"
import { ClipboardCopyIcon, EyeIcon, EyeOffIcon, PlusIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export function ApiSettings() {
  const [showKey, setShowKey] = useState(false)
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "本番環境",
      key: "sk_live_51NxXXXXXXXXXXXXXXXXXXXXXX",
      created: "2024年2月15日",
      lastUsed: "2024年3月21日",
    },
    {
      id: "2",
      name: "開発環境",
      key: "sk_test_51NxXXXXXXXXXXXXXXXXXXXXXX",
      created: "2024年3月1日",
      lastUsed: "2024年3月20日",
    },
  ])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "APIキーをコピーしました",
      description: "クリップボードにAPIキーがコピーされました。",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API設定</CardTitle>
          <CardDescription>APIキーを管理し、外部サービスとの連携を設定します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="api-key">APIキー</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="api-key"
                    value={showKey ? apiKeys[0].key : "••••••••••••••••••••••••••••••"}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                    {showKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(apiKeys[0].key)}>
                    <ClipboardCopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>作成日</TableHead>
                <TableHead>最終使用日</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>
                    <div className="font-medium">{apiKey.name}</div>
                    <div className="text-sm text-muted-foreground font-mono">{apiKey.key.substring(0, 8)}...</div>
                  </TableCell>
                  <TableCell>{apiKey.created}</TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(apiKey.key)}>
                        <ClipboardCopyIcon className="mr-2 h-4 w-4" />
                        コピー
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        再生成
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
                APIキーを作成
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しいAPIキーを作成</DialogTitle>
                <DialogDescription>
                  新しいAPIキーの名前を入力してください。キーは作成後に一度だけ表示されます。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="api-key-name">APIキー名</Label>
                  <Input id="api-key-name" placeholder="例: 開発環境" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">キャンセル</Button>
                <Button>作成</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Webhook設定</CardTitle>
          <CardDescription>イベント発生時に通知を受け取るWebhookを設定します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://example.com/webhook" />
            </div>
            <div className="space-y-2">
              <Label>通知するイベント</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  キャンペーン作成
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  キャンペーン更新
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  予算消化
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  コンバージョン発生
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  AI最適化
                </Badge>
                <Badge variant="outline">+ イベントを追加</Badge>
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
