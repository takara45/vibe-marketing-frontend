"use client"

import { useState } from "react"
import { CalendarIcon, CheckIcon, ChevronRightIcon } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const campaignFormSchema = z.object({
  name: z.string().min(2, {
    message: "キャンペーン名は2文字以上で入力してください",
  }),
  type: z.enum(["search", "display", "shopping", "video"], {
    required_error: "キャンペーンタイプを選択してください",
  }),
  goal: z.enum(["sales", "leads", "website", "awareness"], {
    required_error: "キャンペーン目標を選択してください",
  }),
  budget: z.coerce.number().min(1000, {
    message: "予算は1,000円以上で入力してください",
  }),
  startDate: z.date({
    required_error: "開始日を選択してください",
  }),
  endDate: z
    .date({
      required_error: "終了日を選択してください",
    })
    .optional(),
  description: z.string().optional(),
})

type CampaignFormValues = z.infer<typeof campaignFormSchema>

const defaultValues: Partial<CampaignFormValues> = {
  type: "search",
  goal: "sales",
  budget: 10000,
  startDate: new Date(),
}

interface NewCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCampaignDialog({ open, onOpenChange }: NewCampaignDialogProps) {
  const [step, setStep] = useState(1)
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: CampaignFormValues) {
    console.log(data)
    onOpenChange(false)
    setStep(1)
    form.reset(defaultValues)
  }

  function handleNext() {
    if (step === 1) {
      form.trigger(["name", "type", "goal"]).then((valid) => {
        if (valid) setStep(2)
      })
    } else if (step === 2) {
      form.trigger(["budget", "startDate"]).then((valid) => {
        if (valid) setStep(3)
      })
    }
  }

  function handleBack() {
    setStep(step - 1)
  }

  function handleCancel() {
    onOpenChange(false)
    setStep(1)
    form.reset(defaultValues)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>新規キャンペーン作成</DialogTitle>
          <DialogDescription>
            新しいGoogle広告キャンペーンを作成します。必要な情報を入力してください。
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                step >= 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-muted text-muted-foreground",
              )}
            >
              {step > 1 ? <CheckIcon className="h-4 w-4" /> : "1"}
            </div>
            <div className="w-12 h-1 bg-muted">
              <div className={cn("h-1 bg-primary transition-all", step >= 2 ? "w-full" : "w-0")} />
            </div>
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                step >= 2
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-muted text-muted-foreground",
              )}
            >
              {step > 2 ? <CheckIcon className="h-4 w-4" /> : "2"}
            </div>
            <div className="w-12 h-1 bg-muted">
              <div className={cn("h-1 bg-primary transition-all", step >= 3 ? "w-full" : "w-0")} />
            </div>
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                step >= 3
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-muted text-muted-foreground",
              )}
            >
              3
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>キャンペーン名</FormLabel>
                      <FormControl>
                        <Input placeholder="例: 春の新商品プロモーション" {...field} />
                      </FormControl>
                      <FormDescription>キャンペーンを識別するための名前を入力してください。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>キャンペーンタイプ</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="search" />
                            </FormControl>
                            <FormLabel className="font-normal">検索広告</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="display" />
                            </FormControl>
                            <FormLabel className="font-normal">ディスプレイ広告</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="shopping" />
                            </FormControl>
                            <FormLabel className="font-normal">ショッピング広告</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="video" />
                            </FormControl>
                            <FormLabel className="font-normal">動画広告</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>キャンペーンのタイプを選択してください。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>キャンペーン目標</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="目標を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sales">売上</SelectItem>
                          <SelectItem value="leads">リード獲得</SelectItem>
                          <SelectItem value="website">ウェブサイトトラフィック</SelectItem>
                          <SelectItem value="awareness">ブランド認知度</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>キャンペーンの主な目標を選択してください。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1日の予算</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            ¥
                          </span>
                          <Input type="number" placeholder="10000" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        1日あたりの予算を入力してください。最低1,000円から設定可能です。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>開始日</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "yyyy年MM月dd日", { locale: ja })
                                ) : (
                                  <span>日付を選択</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                              locale={ja}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>キャンペーンを開始する日付を選択してください。</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>終了日（任意）</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "yyyy年MM月dd日", { locale: ja })
                                ) : (
                                  <span>日付を選択</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const startDate = form.getValues("startDate")
                                return startDate && date < startDate
                              }}
                              initialFocus
                              locale={ja}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          キャンペーンを終了する日付を選択してください。指定しない場合は手動で終了するまで継続します。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>キャンペーンの説明（任意）</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="キャンペーンの目的や特記事項を入力してください"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>キャンペーンに関する補足情報を入力してください。</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="rounded-md border p-4 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">キャンペーン設定の確認</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">キャンペーン名:</div>
                      <div>{form.watch("name") || "-"}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">キャンペーンタイプ:</div>
                      <div>
                        {form.watch("type") === "search" && "検索広告"}
                        {form.watch("type") === "display" && "ディスプレイ広告"}
                        {form.watch("type") === "shopping" && "ショッピング広告"}
                        {form.watch("type") === "video" && "動画広告"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">キャンペーン目標:</div>
                      <div>
                        {form.watch("goal") === "sales" && "売上"}
                        {form.watch("goal") === "leads" && "リード獲得"}
                        {form.watch("goal") === "website" && "ウェブサイトトラフィック"}
                        {form.watch("goal") === "awareness" && "ブランド認知度"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">1日の予算:</div>
                      <div>¥{form.watch("budget")?.toLocaleString() || "-"}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">開始日:</div>
                      <div>
                        {form.watch("startDate")
                          ? format(form.watch("startDate"), "yyyy年MM月dd日", { locale: ja })
                          : "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">終了日:</div>
                      <div>
                        {form.watch("endDate")
                          ? format(form.watch("endDate"), "yyyy年MM月dd日", { locale: ja })
                          : "指定なし"}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <DialogFooter className="flex justify-between">
              {step === 1 ? (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  キャンセル
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={handleBack}>
                  戻る
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  次へ
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">作成</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
