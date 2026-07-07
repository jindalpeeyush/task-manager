import { createTRPCRouter } from "~/server/api/trpc";
import { epicRouter } from "~/server/api/routers/epic";
import { sprintRouter } from "~/server/api/routers/sprint";
import { workItemRouter } from "~/server/api/routers/workitem";
import { userRouter } from "~/server/api/routers/user";

export const appRouter = createTRPCRouter({
  epic: epicRouter,
  sprint: sprintRouter,
  workItem: workItemRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;