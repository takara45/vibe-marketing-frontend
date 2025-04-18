"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上で入力してください",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  company: z.string().optional(),
  bio: z.string().max(160).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "佐藤健太",
  email: "sato@example.com",
  company: "株式会社サンプル",
  bio: "中小企業のマーケティング担当者。ウェブサイトの集客やオンラインでの売上向上を担当しています。",
}

export function AccountSettings() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "プロフィールを更新しました",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>プロフィール</CardTitle>
          <CardDescription>アカウント情報を管理します。この情報は公開されません。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="プロフィール画像" />
              <AvatarFallback>佐藤</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="picture">プロフィール画像</Label>
              <div className="flex items-center gap-2">
                <Input id="picture" type="file" className="w-auto" />
                <Button variant="outline" size="sm">
                  アップロード
                </Button>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名前</FormLabel>
                      <FormControl>
                        <Input placeholder="名前を入力" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input placeholder="メールアドレスを入力" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>会社名</FormLabel>
                    <FormControl>
                      <Input placeholder="会社名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>自己紹介</FormLabel>
                    <FormControl>
                      <Textarea placeholder="自己紹介を入力" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>最大160文字まで入力できます。</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">変更を保存</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>アカウント削除</CardTitle>
          <CardDescription>
            アカウントを削除すると、すべてのデータが完全に削除されます。この操作は元に戻せません。
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive">アカウントを削除</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
