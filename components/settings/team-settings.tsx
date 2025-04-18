"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TeamSettings() {
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "佐藤健太",
      email: "sato@example.com",
      role: "管理者",
      status: "active",
      lastActive: "2024年3月21日 8:15",
    },
    {
      id: "2",
      name: "田中美咲",
      email: "tanaka@example.com",
      role: "編集者",
      status: "active",
      lastActive: "2024年3月20日 17:30",
    },
    {
      id: "3",
      name: "鈴木一郎",
      email: "suzuki@example.com",
      role: "閲覧者",
      status: "pending",
      lastActive: "招待中",
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>チームメンバー</CardTitle>
          <CardDescription>チームメンバーを管理し、適切な権限を設定します。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>メンバー</TableHead>
                <TableHead>権限</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>最終アクティブ</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={member.role}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="権限を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="管理者">管理者</SelectItem>
                        <SelectItem value="編集者">編集者</SelectItem>
                        <SelectItem value="閲覧者">閲覧者</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        member.status === "active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                      }
                    >
                      {member.status === "active" ? "アクティブ" : "招待中"}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>詳細を表示</DropdownMenuItem>
                        <DropdownMenuItem>権限を編集</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">削除</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                メンバーを招待
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>チームメンバーを招待</DialogTitle>
                <DialogDescription>招待するメンバーのメールアドレスと権限を設定してください。</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" placeholder="例: user@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">権限</Label>
                  <Select defaultValue="閲覧者">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="権限を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="管理者">管理者</SelectItem>
                      <SelectItem value="編集者">編集者</SelectItem>
                      <SelectItem value="閲覧者">閲覧者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">キャンセル</Button>
                <Button>招待を送信</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>権限設定</CardTitle>
          <CardDescription>各権限レベルのアクセス範囲を設定します。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">管理者</h3>
              <p className="text-sm text-muted-foreground">
                すべての機能にアクセスでき、チームメンバーの管理や設定の変更が可能です。
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">編集者</h3>
              <p className="text-sm text-muted-foreground">
                広告キャンペーンの作成・編集・削除が可能ですが、チーム管理や請求設定へのアクセスはできません。
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">閲覧者</h3>
              <p className="text-sm text-muted-foreground">
                広告キャンペーンやレポートの閲覧のみ可能で、編集はできません。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
