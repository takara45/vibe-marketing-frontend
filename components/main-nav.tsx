"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3Icon, LayoutDashboardIcon, LineChartIcon, SettingsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Button
        variant="ghost"
        className={cn("justify-start", pathname === "/" && "bg-accent text-accent-foreground")}
        asChild
      >
        <Link href="/">
          <LayoutDashboardIcon className="mr-2 h-4 w-4" />
          ダッシュボード
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn("justify-start", pathname === "/campaigns" && "bg-accent text-accent-foreground")}
        asChild
      >
        <Link href="/campaigns">
          <BarChart3Icon className="mr-2 h-4 w-4" />
          キャンペーン
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn("justify-start", pathname?.startsWith("/analytics") && "bg-accent text-accent-foreground")}
        asChild
      >
        <Link href="/analytics/reports">
          <LineChartIcon className="mr-2 h-4 w-4" />
          分析
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn("justify-start", pathname === "/settings" && "bg-accent text-accent-foreground")}
        asChild
      >
        <Link href="/settings">
          <SettingsIcon className="mr-2 h-4 w-4" />
          設定
        </Link>
      </Button>
    </nav>
  )
}
