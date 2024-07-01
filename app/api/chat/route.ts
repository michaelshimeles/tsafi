import { createSites } from "@/utils/actions/sites/create-site";
import { readSites } from "@/utils/actions/sites/read-sites";
import { changeSiteName } from "@/utils/actions/sites/settings/change-site-name";
import { changeSiteSubdomain } from "@/utils/actions/sites/settings/change-site-subdomain";
import { storeMessages } from "@/utils/functions/ai/store-messages";
import { readSiteName } from "@/utils/functions/sites/read-site-name";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const user = await currentUser();

  const system = `
  You are tsafi ai, an ai assistant helping users of tsafi create and manage their blog sites and content.
  The user's first name is ${user?.firstName}, their email ${user?.emailAddresses?.[0]?.emailAddress}.

  DO NOT. I REPEAT DO NOT RENDER A RESPONSE IN MARKDOWN.

  Be friendly and crack jokes when you can. Be very human-like and not robotic.`;

  const result = await streamText({
    model: openai("gpt-4o") as any, // Ensure correct type casting
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
            message: `Your blog site has been created ${user?.firstName && user?.firstName}. It's called ${site_name} and you can check it out by clicking the button below.`,
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

          if (result?.length === 1) {
            return {
              message: "Here's your blog site",
              result: result,
            };
          }

          return {
            message: "Here are your blog sites",
            result: result,
          };
        },
      }),
      update_site_name: tool({
        description: "Change or update the name of a site",
        parameters: z.object({
          current_site_name: z.string().describe("current site name"),
          new_site_name: z.string().describe("new site name"),
        }),
        execute: async ({ current_site_name, new_site_name }) => {
          const getSiteInfo = await readSiteName(current_site_name);

          const result = await changeSiteName(
            getSiteInfo?.[0]?.site_id,
            new_site_name
          );
          return {
            result: JSON.stringify(result),
            message: `Your blog site name has been updated from ${current_site_name} to ${result?.[0]?.site_name} and you can check it out by clicking the button below.`,
          };
        },
      }),
      update_sub_domain: tool({
        description: "Change or update the subdomain of a site",
        parameters: z.object({
          current_site_name: z.string().describe("current site name"),
          new_site_subdomain: z.string().describe("new site subdomain"),
        }),
        execute: async ({ current_site_name, new_site_subdomain }) => {
          const getSiteInfo = await readSiteName(current_site_name);

          const result = await changeSiteSubdomain(
            getSiteInfo?.[0]?.site_id,
            new_site_subdomain
          );
          return {
            result: JSON.stringify(result),
            message: `Your blog site ${current_site_name} subdomain has been updated to ${result?.[0]?.site_subdomain} and you can check it out by clicking the button below.`,
          };
        },
      }),
    },
    onFinish: async ({ text, toolCalls, toolResults, finishReason, usage }: any) => {
      console.log("text", text);
      console.log("toolCalls", toolCalls);
      console.log("toolResults", toolResults);

      if (text) {
        await storeMessages(user?.id!, [
          ...messages,
          { role: "assistant", content: text },
        ]);

        return;
      }

      if (toolResults?.[0]?.toolName === "read_sites") {
        await storeMessages(user?.id!, [
          ...messages,
          {
            role: "assistant",
            type: `${toolResults?.[0]?.type}_read-site`,
            content: toolResults?.[0]?.result?.message,
            result: toolResults?.[0]?.result?.result,
          },
        ]);
      }

      if (toolResults?.[0]?.toolName === "create_site") {
        await storeMessages(user?.id!, [
          ...messages,
          {
            role: "assistant",
            type: `${toolResults?.[0]?.type}_create-site`,
            content: toolResults?.[0]?.result?.message,
            result: toolResults?.[0]?.result,
          },
        ]);
      }


      return;
    },
  });

  return result.toAIStreamResponse();
}
