"use client";

import { HeroUIProvider } from "@heroui/react";
import { LiveblocksProvider } from "@liveblocks/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { type AppStore, store } from "@/stores";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store;
  }
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeRef.current}>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <ProgressBar
              height="4px"
              color="#ff4d4f"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <LiveblocksProvider
              publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ?? ""}
            >
              {children}
            </LiveblocksProvider>
            <Toaster />
          </NextThemesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </HeroUIProvider>
      </Provider>
    </QueryClientProvider>
  );
}
