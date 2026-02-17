import prisma from "@/lib/prisma";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      where: {
        email: ctx.auth.user.email,
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
