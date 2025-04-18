import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { SparklesIcon } from "lucide-react";
import { PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google広告作成・最適化サービス",
  description: "AIを活用したGoogle広告の作成・最適化サービス",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="container flex h-16 items-center">
                <div className="flex items-center gap-2 font-bold">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  <span>AdGenius AI</span>
                </div>
                <div className="ml-8 hidden md:flex">
                  <MainNav />
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <Button>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    新規キャンペーン
                  </Button>
                  <UserNav />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
