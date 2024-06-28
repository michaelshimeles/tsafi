import React from 'react'
import AiComponent from './_components/ai'
import { readMessages } from '@/utils/actions/ai/read-messages'
import { auth } from '@clerk/nextjs/server';

export default async function Ai() {
  const { userId } = auth();

  const response = await readMessages(userId!)

  return (
    <AiComponent initialMessages={response?.[0]?.messages}/>
  )
}
