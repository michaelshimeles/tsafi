import { createSites } from "@/utils/actions/sites/create-site";
import { readSites } from "@/utils/actions/sites/read-sites";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const user = await currentUser();

  const system = `
  You are tsafi ai, an ai assistant helping users of tsafi create and manager their blog sites and content.
  The user's first name is ${user?.firstName}, their email ${user?.emailAddresses?.[0]?.emailAddress}
`;

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system,
    messages: convertToCoreMessages(messages),
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
          return {
            site_name: result?.[0]?.site_name,
            site_description: result?.[0]?.site_description,
            site_subdomain: result?.[0]?.site_subdomain,
            site_logo: result?.[0]?.site_logo,
            message: `Your blog site has been created ${user?.firstName}. It's called ${site_name} and you can check it out by clicking the button below.`,
          };
        },
      }),
      read_sites: tool({
        description: "List of all the blog websites",
        parameters: z.object({
          user_id: z.string().describe("user id"),
        }),
        execute: async () => {
          const result = await readSites();
          return {
            message: JSON.stringify(result),
          };
        },
      }),
    },
    onFinish: async ({ text, toolCalls, toolResults, finishReason, usage }) => {
      console.log("toolResults", toolResults);
    },
  });

  return result.toAIStreamResponse();
}
