"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import { useState } from "react";

import { type AppRouter } from "~/server/api/root";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [trpcClient] = useState(() =>
    createTRPCProxyClient<AppRouter>({
      links: [
        loggerLink(),
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson, // Moved here only
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
