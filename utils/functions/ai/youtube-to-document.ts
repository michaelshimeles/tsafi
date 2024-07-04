"use server"
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";

export const youtubeToDocument = async (youtube_video_url: string) => {
  const result = await YoutubeTranscript.fetchTranscript(youtube_video_url);

  const openai = new OpenAI();

  // Join all the text segments into a single string
  const transcriptText = result.map((segment) => segment.text).join(" ");
  // Generate a prompt for OpenAI with the result from the tool
  const prompt = `Turn this transcript into a document for a blog post:\n\n${transcriptText}\n\n  DO NOT. I REPEAT DO NOT RENDER A RESPONSE IN MARKDOWN.`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
  });

  return completion?.choices?.[0]?.message?.content;
};
