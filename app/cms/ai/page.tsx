import { readMessages } from '@/utils/actions/ai/read-messages';
import { storeMessages } from '@/utils/functions/ai/store-messages';
import { auth } from '@clerk/nextjs/server';
import { Message } from "ai";
import Chat from './_components/chat';

export default async function Ai() {
  const { userId } = auth();

  const response = await readMessages()

  const messages: Message[] = response?.[0]?.messages

  if (!messages) {
    await storeMessages(userId!, []);
  }

  return (
    <Chat messages={messages?.map((m, i) => ({ ...m, id: i.toString() }))} />
  )
}
