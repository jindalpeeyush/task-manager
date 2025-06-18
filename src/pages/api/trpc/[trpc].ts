import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? (opts) => {
          console.error(
            `❌ tRPC failed on ${opts.path ?? "<no-path>"}: ${opts.error.message}`
          );
        }
      : undefined,
});