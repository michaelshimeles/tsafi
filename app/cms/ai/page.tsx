"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import DashWrapper from "../_components/DashWrapper";
import { PromptForm } from "./_components/prompt_form";
import { useAIMessages } from '@/utils/hooks/useAIMessages';
import { useUser } from '@clerk/nextjs';

export default function Ai() {
  const { user } = useUser()
  const { data } = useAIMessages(user?.id!)

  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat({
    initialMessages: data?.[0]?.messages
  });
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <DashWrapper>
      <div className="flex flex-col h-[calc(100vh-100px)] w-full">
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map(m => (
            <div key={m.id} className={m.role === "user" ? "flex flex-col justify-center items-end w-full gap-1 mb-4" : "flex flex-col justify-center items-start w-full gap-1 mb-4"}>
              <div className="flex flex-col gap-1 max-w-[80%]">
                <p className="text-sm text-left">
                  {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
                </p>
                {m.toolInvocations?.map((toolInvocation: any) => {
                  const toolCallId = toolInvocation.toolCallId;
                  if (toolInvocation.toolName === 'create_site') {
                    return (
                      <div key={toolCallId} className='bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg'>
                        {toolInvocation?.result?.message}
                        <div className="pt-[0.5rem]">
                          {'result' in toolInvocation && (
                            <div className='flex gap-1'>
                              <Link href={"https://" + toolInvocation?.result?.site_subdomain + ".tsafi.xyz"} target="_blank">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="mr-1 w-4 h-4" />
                                  Website
                                </Button>
                              </Link>
                              <Link href={`/cms`} target="_blank">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="mr-1 w-4 h-4" />
                                  Dashboard
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  if (toolInvocation.toolName === 'read_sites') {
                    return (
                      <div key={toolCallId} className='bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg'>
                        {toolInvocation?.result?.message && JSON?.parse(toolInvocation?.result?.result).map((info: any) => (
                          <div key={info?.site_name}>
                            {toolInvocation?.result?.message + " "}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (toolInvocation.toolName === 'update_site_name') {
                    console.log('toolInvocation', toolInvocation)
                    return (
                      <div key={toolCallId} className='bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg'>
                        {toolInvocation?.result?.message && JSON?.parse(toolInvocation?.result?.result).map((info: any) => (
                          <div key={info?.site_name}>
                            {toolInvocation?.result?.message + " "}
                            {info?.site_name}: <Link href={`https://${info?.site_subdomain}.tsafi.xyz`} className="underline" target="_blank">{info?.site_subdomain + "." + "tsafi.xyz"}</Link>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (toolInvocation.toolName === 'update_sub_domain') {
                    console.log('toolInvocation', toolInvocation)
                    return (
                      <div key={toolCallId} className='bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg'>
                        {toolInvocation?.result?.message && JSON?.parse(toolInvocation?.result?.result).map((info: any) => (
                          <div key={info?.site_name}>
                            {toolInvocation?.result?.message + " "}
                            {info?.site_name}: <Link href={`https://${info?.site_subdomain}.tsafi.xyz`} className="underline" target="_blank">{info?.site_subdomain + "." + "tsafi.xyz"}</Link>
                          </div>
                        ))}
                      </div>
                    );
                  }
                })}
                {m.content !== "" && (
                  <div className={m.role === 'user' ? 'bg-blue-700 whitespace-pre-wrap bg-opacity-10 text-sm px-3 py-2 rounded-lg' : 'bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg'}>
                    {m.content}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div />
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4">
          <PromptForm input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput} />
        </div>
      </div>
    </DashWrapper>
  );
}