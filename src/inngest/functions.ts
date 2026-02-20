import prisma from "@/lib/prisma";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "create-workflow" },
  { event: "workflow/create.new" },
  async ({ event, step }) => {
    await step.sleep("step 1", "5s");
    await step.sleep("step 2", "5s");

    await step.run("create-new-workflow", () => {
      return prisma.workFlows.create({
        data: {
          name: "New Workflow from bg",
        },
      });
    });
  },
);
