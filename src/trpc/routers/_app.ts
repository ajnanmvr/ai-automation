import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  createWorkFlow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "workflow/create.new",
    });
    return {
      success: true,
      message: "Job Queued",
    };
  }),
  getWorkFlows: protectedProcedure.query(() => {
    const allWorkFlows = prisma.workFlows.findMany();

    return allWorkFlows;
  }),
});

export type AppRouter = typeof appRouter;
