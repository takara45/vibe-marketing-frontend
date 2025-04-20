import type { ReactNode } from "react";
import { ResponsiveContainer } from "@/components/ui/responsive-container";

interface DashboardShellProps {
  children: ReactNode;
  fluid?: boolean;
}

export function DashboardShell({
  children,
  fluid = false,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveContainer
        fluid={fluid}
        className="flex-1 space-y-4 py-4 sm:py-6"
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}
