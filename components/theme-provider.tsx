"use client";

import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  return children;
}
