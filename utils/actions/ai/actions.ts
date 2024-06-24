"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, convertToCoreMessages, streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createSites } from "../sites/create-site";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    tools: {
      create_site: tool({
        description: "Create a new blog site",
        parameters: z.object({
          site_name: z.string().describe("The name of the website"),
          site_description: z.string().describe("The website description"),
          site_subdomain: z.string().describe("The website subdomain"),
          site_logo: z.string().describe("The website logo"),
        }),
        execute: async ({
          site_name,
          site_description,
          site_subdomain,
          site_logo,
        }) => {
          const result = await createSites(
            site_name,
            site_description,
            site_subdomain,
            site_logo
          );
          return result;
        },
      }),
    },
    onFinish({ text, toolCalls, toolResults, finishReason, usage }) {
      console.log("toolResults", toolResults);
    },
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
