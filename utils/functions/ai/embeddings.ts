import OpenAI from "openai";
import { Index } from "@upstash/vector";
import { Message } from "ai";

const openai = new OpenAI();

export const embeddings = async (userId: string, messages: Message[]) => {
  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  console.log("messages", messages);

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: String(messages),
    dimensions: 1536,
    user: userId,
  });

  await index.upsert({
    id: "id1",
    vector: embedding?.data?.[0]?.embedding,
    metadata: { userId },
  });

  // console.log("embedding", embedding?.data?.[0]?.embedding);

  return embedding;
};
