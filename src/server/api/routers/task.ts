import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      priority: z.enum(["low", "medium", "high"]),
      deadline: z.date().optional(),
      tags: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          ...input,
          assignedToId: ctx.session.user.id,
        },
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.task.findMany({
      where: { assignedToId: ctx.session.user.id },
    });
  }),
});