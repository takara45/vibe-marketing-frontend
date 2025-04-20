"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3Icon,
  LayoutDashboardIcon,
  LineChartIcon,
  MenuIcon,
  PlusCircleIcon,
  SettingsIcon,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "ダッシュボード",
      icon: <LayoutDashboardIcon className="mr-2 h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/campaigns",
      label: "キャンペーン",
      icon: <BarChart3Icon className="mr-2 h-4 w-4" />,
      active: pathname === "/campaigns" || pathname.startsWith("/campaigns/"),
    },
    {
      href: "/analytics",
      label: "分析",
      icon: <LineChartIcon className="mr-2 h-4 w-4" />,
      active: pathname === "/analytics" || pathname.startsWith("/analytics/"),
    },
    {
      href: "/settings",
      label: "設定",
      icon: <SettingsIcon className="mr-2 h-4 w-4" />,
      active: pathname === "/settings" || pathname.startsWith("/settings/"),
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-2 py-4">
            <div className="flex items-center gap-2 font-bold">
              <span>AdGenius AI</span>
            </div>
            <Sheet>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">閉じる</span>
              </Button>
            </Sheet>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-2">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.active ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setOpen(false)}
                  asChild
                >
                  <Link href={route.href}>
                    {route.icon}
                    {route.label}
                  </Link>
                </Button>
              ))}
            </nav>
            <Separator className="my-4" />
            <div className="px-4">
              <Button className="w-full" onClick={() => setOpen(false)} asChild>
                <Link href="/campaigns/new">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  新規キャンペーン
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
