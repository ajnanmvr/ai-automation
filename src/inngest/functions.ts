import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";


const google = createGoogleGenerativeAI();
const anthropic = createAnthropic();
const openAi = createOpenAI();

export const executeAi = inngest.createFunction(
  { id: "execute-ai" },
  { event: "ai/execute" },

  async ({ event, step }) => {
    await step.sleep("pretend", "5s");
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-about-ajnan",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "you are a helpful assistant",
        prompt: "who is muhammed ajnan p",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    const { steps: openAiSteps } = await step.ai.wrap(
      "openai-about-ajnan",
      generateText,
      {
        model: openAi("gpt-4.1-mini"),
        system: "you are a helpful assistant",
        prompt: "who is muhammed ajnan p",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-about-ajnan",
      generateText,
      {
        model: anthropic("claude-3-7-sonnet-20250219"),
        system: "you are a helpful assistant",
        prompt: "who is muhammed ajnan p",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    return {
      geminiSteps,
      openAiSteps,
      anthropicSteps,
    };
  },
);
