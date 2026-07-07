import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
      orderBy: { name: "asc" },
    });
  }),

  updateRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["ADMIN", "SCRUM_MASTER", "PRODUCT_OWNER", "DEVELOPER"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // In a real app, verify that ctx.session.user is an ADMIN here
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),
});
