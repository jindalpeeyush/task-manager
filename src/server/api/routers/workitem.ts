import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const workItemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(["Story", "Task", "Bug"]).optional(),
        priority: z.enum(["Low", "Medium", "High", "Critical"]).optional(),
        storyPoints: z.number().int().optional(),
        epicId: z.string().optional(),
        sprintId: z.string().optional(),
        assignedToId: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.workItem.create({
        data: input,
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.workItem.findMany({
      include: {
        epic: true,
        sprint: true,
        assignedTo: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        type: z.enum(["Story", "Task", "Bug"]).optional(),
        status: z.string().optional(),
        priority: z.enum(["Low", "Medium", "High", "Critical"]).optional(),
        storyPoints: z.number().int().optional(),
        epicId: z.string().nullable().optional(),
        sprintId: z.string().nullable().optional(),
        assignedToId: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.workItem.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.workItem.delete({
        where: { id: input.id },
      });
    }),
});
