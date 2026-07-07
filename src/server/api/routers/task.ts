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
      orderBy: { createdAt: 'desc' },
    });
  }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
      status: z.string().optional(),
      deadline: z.date().optional(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.task.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});