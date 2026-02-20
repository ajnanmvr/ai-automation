import prisma from "@/lib/prisma";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

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

const google = createGoogleGenerativeAI();

export const executeAi = inngest.createFunction(
  { id: "execute-ai" },
  { event: "ai/execute" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-about-ajnan", generateText, {
      model: google("gemini-2.5-flash"),
      system: "you are a helpful assistant",
      prompt: "who is muhammed ajnan p",
    });
    return steps;
  },
);
