"use server";
import OpenAI from "openai";
import { YoutubeTranscript } from "youtube-transcript";

export const youtubeToDocument = async (
  youtube_video_url: string,
  render_method: string | null
) => {
  const result = await YoutubeTranscript.fetchTranscript(youtube_video_url);

  const openai = new OpenAI();

  // Join all the text segments into a single string
  const transcriptText = result.map((segment) => segment.text).join(" ");

  console.log("transcriptText", transcriptText);
  // Generate a prompt for OpenAI with the result from the tool
  let prompt;
  render_method === "html"
    ? (prompt = `Turn this transcript into a document for a blog post:\n\n${transcriptText}\n\n  DO NOT. I REPEAT DO NOT RENDER A RESPONSE IN MARKDOWN. Please render in HTML.`)
    : (prompt = `Turn this transcript into a document for a blog post:\n\n${transcriptText}\n\n  DO NOT. I REPEAT DO NOT RENDER A RESPONSE IN MARKDOWN.`);

  console.log("prompt", prompt);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    return completion?.choices?.[0]?.message?.content;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
