import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  fluid?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  maxWidth = "xl",
  padding = true,
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        fluid ? "max-w-full" : maxWidthClasses[maxWidth],
        padding && "px-4 sm:px-6 md:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
