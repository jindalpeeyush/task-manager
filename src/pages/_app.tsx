// import { type AppType } from "next/app";
// import { TRPCProvider } from "~/utils/trpc-provider";


// // import "@/styles/globals.css";

// const MyApp: AppType = ({ Component, pageProps }) => {
//   return (
//     <TRPCProvider>
//       <Component {...pageProps} />
//     </TRPCProvider>
//   );
// };

// export default MyApp;


// src/pages/_app.tsx

import { type AppType } from "next/app";
import { trpc } from "~/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider
      client={trpc.createClient({
        links: [
          // loggerLink(), // optional
          httpBatchLink({
            url: "/api/trpc",
            transformer: superjson
          }),
        ],
      })}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;
