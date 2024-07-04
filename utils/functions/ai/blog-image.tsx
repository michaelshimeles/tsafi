import * as fal from "@fal-ai/serverless-client";

export const generateBlogImage = async (prompt: string) => {
  const result = await fal.subscribe("fal-ai/stable-diffusion-v3-medium", {
    input: {
      prompt,
      image_size: "landscape_4_3"
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update?.logs?.map((log) => log.message).forEach(console.log);
      }
    },
  });


  return result
}