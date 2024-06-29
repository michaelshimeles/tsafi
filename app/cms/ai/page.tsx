import React from 'react'
import { readMessages } from '@/utils/actions/ai/read-messages'
import { auth } from '@clerk/nextjs/server';
import Chat from './_components/chat';
import { Message } from "ai";
import { storeMessages } from '@/utils/functions/ai/store-messages';

export default async function Ai() {
  const { userId } = auth();

  const response = await readMessages(userId!)

  const messages: Message[] = response?.[0]?.messages

  if (!messages) {
    await storeMessages(userId!, []);
  }

  return (
    <Chat messages={messages?.map((m, i) => ({ ...m, id: i.toString() }))} />
  )
}
