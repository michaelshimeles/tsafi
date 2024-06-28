import { createSites } from "@/utils/actions/sites/create-site";
import { readSites } from "@/utils/actions/sites/read-sites";
import { changeSiteName } from "@/utils/actions/sites/settings/change-site-name";
import { changeSiteSubdomain } from "@/utils/actions/sites/settings/change-site-subdomain";
import { storeMessages } from "@/utils/functions/ai/store-messages";
import { readSiteName } from "@/utils/functions/sites/read-site-name";
import { readSiteSubdmain } from "@/utils/functions/sites/read-site-subdomain";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const user = await currentUser();

  const messageResult = await storeMessages(user?.id!, messages);

  const system = `
  You are tsafi ai, an ai assistant helping users of tsafi create and manage their blog sites and content.
  The user's first name is ${user?.firstName}, their email ${user?.emailAddresses?.[0]?.emailAddress}.

  Be friendly and crack jokes when you can. Be very human-like and not robotic.
`;

console.log('messageResult', messageResult)

  const result = await streamText({
    model: openai("gpt-4o"),
    system,
    messages: convertToCoreMessages(messageResult?.[0]?.messages),
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

          const sites = result.map((site: any) => ({
            name: site.site_name,
            subdomain: site.site_subdomain,
          }));

          const displaySites = sites
            .map(
              (site: any) =>
                `${site.name}, ${site.subdomain}.tsafi.xyz`
            )
            .join("\n");

          return {
            result: JSON.stringify(result),
            message: `${displaySites}`,
          };
        },
      }),
      update_site_name: tool({
        description: "Change or update the name of a site",
        parameters: z.object({
          current_site_name: z.string().describe("new site name"),
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
          current_site_subdomain: z.string().describe("current site subdomain"),
          new_site_subdomain: z.string().describe("new site subdomain"),
        }),
        execute: async ({ current_site_subdomain, new_site_subdomain }) => {
          const getSiteInfo = await readSiteSubdmain(current_site_subdomain);

          const result = await changeSiteSubdomain(
            getSiteInfo?.[0]?.site_id,
            new_site_subdomain
          );
          return {
            result: JSON.stringify(result),
            message: `Your blog site subdomain has been updated from ${current_site_subdomain} to ${result?.[0]?.site_subdomain} and you can check it out by clicking the button below.`,
          };
        },
      }),
    },
    onFinish: async ({ text, toolCalls, toolResults, finishReason, usage }) => {
      console.log("toolCalls", toolCalls);
      console.log("toolResults", toolResults);

      storeMessages(user?.id!, [
        {
          role: "assistant",
          content: toolResults?.[0]?.result?.message,
        },
      ]);
    },
  });

  return result.toAIStreamResponse();
}
