"use client";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  EyeIcon,
  MousePointerClickIcon,
  PercentIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            インプレッション
          </CardTitle>
          <EyeIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">125,430</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +12.5%
            </span>{" "}
            前週比
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">クリック数</CardTitle>
          <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,842</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +7.2%
            </span>{" "}
            前週比
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">コンバージョン</CardTitle>
          <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">187</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              <ArrowDownIcon className="mr-1 h-4 w-4" />
              -3.1%
            </span>{" "}
            前週比
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            費用対効果 (ROAS)
          </CardTitle>
          <PercentIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">320%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              +14.3%
            </span>{" "}
            前週比
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
