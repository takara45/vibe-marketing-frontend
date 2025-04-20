"use client";

import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useResponsive() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBreakpoint = (
    breakpoint: Breakpoint,
    operator: "up" | "down" = "up"
  ) => {
    if (!isMounted) return false;

    const breakpointValue = breakpoints[breakpoint];
    return operator === "up"
      ? windowWidth >= breakpointValue
      : windowWidth < breakpointValue;
  };

  return {
    windowWidth,
    isMobile: isBreakpoint("md", "down"),
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isDesktop: isBreakpoint("lg", "up"),
    isBreakpoint,
    breakpoints,
  };
}
