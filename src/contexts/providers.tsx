"use client";

import { ApplicationProvider } from "@/contexts/application-context";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ApplicationProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="next-ui-theme"
      >
        {children}
      </ThemeProvider>
    </ApplicationProvider>
  </QueryClientProvider>
);
