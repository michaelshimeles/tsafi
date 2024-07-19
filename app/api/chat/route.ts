export const dynamic = "force-dynamic";

import { createSites } from "@/utils/actions/sites/create-site";
import { readSites } from "@/utils/actions/sites/read-sites";
import { changeSiteName } from "@/utils/actions/sites/settings/change-site-name";
import { changeSiteSubdomain } from "@/utils/actions/sites/settings/change-site-subdomain";
import { generateBlogImage } from "@/utils/functions/ai/blog-image";
import { searchInternet } from "@/utils/functions/ai/search-internet";
import { storeMessages } from "@/utils/functions/ai/store-messages";
import { youtubeToDocument } from "@/utils/functions/ai/youtube-to-document";
import { readSiteName } from "@/utils/functions/sites/read-site-name";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages, selectedSite } = await req.json();
  const user = await currentUser();

  const system = `
  You are tsafi ai, an ai assistant helping users of tsafi create and manage their blog sites and content.
  The user's first name is ${user?.firstName}, their email ${user?.emailAddresses?.[0]?.emailAddress}.

  DO NOT RENDER A RESPONSE IN MARKDOWN.

  Be friendly and crack jokes when you can. Be very human-like and not robotic.`;

  const safeConvertToCoreMessages = (msgs: any) => {
    try {
      return convertToCoreMessages(msgs);
    } catch (error) {
      console.error("Error in convertToCoreMessages:", error);
      return [];
    }
  };

  const coreMessages = safeConvertToCoreMessages(messages);

  const result = await streamText({
    model: openai("gpt-4o-mini") as any,
    system,
    messages: coreMessages,
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
            message: `Your blog site has been created. It's called ${site_name} and you can check it out by clicking the button below.`,
          };
        },
      }),
      read_sites: tool({
        description: "List of all the blog websites",
        parameters: z.object({}),
        execute: async () => {
          const result = await readSites();
          if (!result?.[0]?.site_name) {
            return {
              message: "You have no blog sites, you should create one 😉",
            };
          }
          return {
            message:
              result.length === 1
                ? "Here's your blog site"
                : "Here are your blog sites",
            result: result,
          };
        },
      }),
      update_site_name: tool({
        description: "Change or update the name of a site",
        parameters: z.object({
          new_site_name: z.string().describe("new site name"),
        }),
        execute: async ({ new_site_name }) => {
          const getSiteInfo = await readSiteName(selectedSite?.site_name);
          const result = await changeSiteName(
            getSiteInfo?.[0]?.site_id,
            new_site_name
          );
          return {
            result: JSON.stringify(result),
            message: `Your blog site name has been updated from ${selectedSite?.site_name} to ${result?.[0]?.site_name} and you can check it out by clicking the button below.`,
          };
        },
      }),
      update_sub_domain: tool({
        description: "Change or update the subdomain of a site",
        parameters: z.object({
          new_site_subdomain: z.string().describe("new site subdomain"),
        }),
        execute: async ({ new_site_subdomain }) => {
          const getSiteInfo = await readSiteName(selectedSite?.site_name);
          const result = await changeSiteSubdomain(
            getSiteInfo?.[0]?.site_id,
            new_site_subdomain
          );
          return {
            result: JSON.stringify(result),
            message: `Your blog site ${selectedSite?.site_name} subdomain has been updated to ${result?.[0]?.site_subdomain} and you can check it out by clicking the button below.`,
          };
        },
      }),
      generate_blog_image: tool({
        description: "Generate a blog image",
        parameters: z.object({
          prompt: z
            .string()
            .describe("description of the blog image user wants generated"),
        }),
        execute: async ({ prompt }) => {
          return await generateBlogImage(prompt);
        },
      }),
      generate_document_from_youtube: tool({
        description: "Generate a document from a youtube video",
        parameters: z.object({
          youtube_video_url: z.string().describe("URL of the YouTube video"),
        }),
        execute: async ({ youtube_video_url }) => {
          return await youtubeToDocument(youtube_video_url, null);
        },
      }),
      // search_internet: tool({
      //   description: "Searching the internet",
      //   parameters: z.object({
      //     query: z.string().describe("Query for internet search"),
      //   }),
      //   execute: async ({ query }) => {
      //     const response = await searchInternet(query);
      //     return {
      //       message: "Here's the search result",
      //       result: response?.answerBox,
      //     };
      //   },
      // }),
    },
    onFinish: async ({ text, toolResults, toolCalls }: any) => {
      console.log("toolResults", toolResults);
      if (text) {
        await storeMessages(user?.id!, [
          ...messages,
          { role: "assistant", content: text },
        ]);
        return;
      }

      for (const toolResult of toolResults) {
        const newMessage = {
          role: "assistant",
          type: `${toolResult?.type}_${toolResult?.toolName}`,
          content: toolResult?.result?.message || "Here's the result",
          result: toolResult?.result,
        };

        if (toolResult?.toolName === "generate_blog_image") {
          newMessage.content = toolResult?.result?.prompt;
          newMessage.result = toolResult?.result?.images?.[0];
        } else if (toolResult?.toolName === "search_internet") {
          newMessage.result = toolResults?.[0]?.result?.result;
        }

        await storeMessages(user?.id!, [...messages, newMessage]);
      }
    },
  });

  return result.toAIStreamResponse();
}
