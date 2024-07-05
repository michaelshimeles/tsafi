import { readMessages } from '@/utils/actions/ai/read-messages';
import { storeMessages } from '@/utils/functions/ai/store-messages';
import { auth } from '@clerk/nextjs/server';
import { Message } from "ai";
import Chat from './_components/chat';
import { embeddings } from '@/utils/functions/ai/embeddings';

export default async function Ai() {
  const { userId } = auth();

  const response = await readMessages(userId!)

  const messages: Message[] = response?.[0]?.messages

  if (!messages) {
    await storeMessages(userId!, []);
  }
  // await embeddings(userId!, messages)

  return (
    <Chat messages={messages?.map((m, i) => ({ ...m, id: i.toString() }))} />
  )
}
