'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { deleteMessages } from '@/utils/actions/ai/delete-messages'
import { useGetAllSites } from '@/utils/hooks/useGetAllSites'
import { EnterIcon, ReloadIcon } from '@radix-ui/react-icons'
import { Settings, StopCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { useRouter } from 'next/navigation'

export function PromptForm({ input, handleInputChange, handleSubmit, setInput, isLoading, stop, createDocumentShowPopup }: any) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [filteredSites, setFilteredSites] = useState([]);
  const [clearHistoryLoading, setClearHistoryLoading] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const router = useRouter()

  const { data: sites } = useGetAllSites();

  useEffect(() => {
    setFilteredSites(
      sites?.filter((site: any) => site.site_name.toLowerCase())
    );
  }, [createDocumentShowPopup])


  const handleInput = (e: any) => {
    const value = e.target.value;
    if (value.includes('@')) {
      setShowPopup(true);
      const searchQuery = value.split('@').pop().toLowerCase();
      setFilteredSites(
        sites?.filter((site: any) => site.site_name.toLowerCase().includes(searchQuery))
      );
    } else {
      setShowPopup(false);
    }
  };

  return (
    <div className='max-w-[750px] w-full relative'>
      <div className='w-full absolute bottom-3 left-0'>
        {(showPopup && !selectedSite) || createDocumentShowPopup ? (
          <div className=''>
            {
              filteredSites?.length > 0 ? (
                <div className='flex flex-wrap gap-1 mb-[4.5rem] w-full'>
                  {filteredSites.map((site: any) => (
                    <Card key={site.site_id} className="flex flex-col max-w-[300px] min-h-[150px] hover:dark:bg-zinc-900 hover:cursor-pointer w-full px-[1rem] justify-between h-full py-[1rem]" onClick={() => setSelectedSite(site)}>
                      <div className='flex flex-col w-full justify-center items-start'>
                        <h2 className="text-lg font-bold">{site.site_name}</h2>
                        <p className="text-gray-400 pt-1 text-sm">{site.site_description}</p>
                      </div>
                      <div className="flex justify-between mt-2 items-center w-full">
                        <p className='text-xs px-2 py-1 rounded-full border bg-zinc-900 text-gray-300'>
                          {site.site_subdomain}.tsafi.xyz
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(site.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className='p-2'>No results found</div>
              )
            }
          </div>
        ) : selectedSite ?
          <div className='flex gap-1 mb-[4.5rem] max-[825px]:hidden'>
            <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site name for ${selectedSite?.site_name}`)}>Change site name for {selectedSite?.site_name}</div>
            <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site subdomain for ${selectedSite?.site_name}`)}>Change site subdomain for {selectedSite?.site_name}</div>
          </div>
          :
          <div className='flex flex-wrap gap-1 mb-[5rem] max-[825px]:hidden'>
            <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Create a blog site for me")}>Create a blog site for me</div>
            <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("List all my blog sites")}>List all my blog sites</div>
            <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Generate a blog image")}>Generate a blog image</div>
            <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Generate a document from a YouTube video")}>Turn a YouTube video into a document</div>
          </div>
        }
      </div>

      <form onSubmit={(e) => handleSubmit(e, {
        options: {
          body: {
            selectedSite
          }
        }
      })}
        className='w-full max-w-[750px] absolute bottom-3 left-0'>
        <div className="flex justify-center items-center max-h-60 w-full grow overflow-hidden bg-background pr-2 pl-2 rounded-md border">
          {selectedSite
            ?
            <div className={`border p-3 rounded`} onClick={() => setSelectedSite(null)}>
              <p>{selectedSite?.site_name.match(/^(\w)\w*\s+(\w{1,2})/)?.slice(1)?.join('') ? selectedSite?.site_name.match(/^(\w)\w*\s+(\w{1,2})/)?.slice(1)?.join('') : selectedSite?.site_name}</p>
            </div>
            :
            <Button
              variant="ghost"
              className="text-lg"
              onClick={(e) => {
                e.preventDefault()
                let searchQuery = input?.split("@")
                setFilteredSites(
                  sites?.filter((site: any) => site.site_name.toLowerCase().includes(searchQuery))
                );
                setSelectedSite(null)
                setShowPopup(!showPopup)
              }} >
              @
            </Button>
          }
          <Textarea
            placeholder="talk to me g"
            className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            onChange={(e) => {
              handleInputChange(e)
              handleInput(e)
            }}
            value={input}
            rows={1}
          />
          <div className='flex gap-1'>
            {isLoading ? <Button onClick={stop} size="icon" disabled={!isLoading}><StopCircle /></Button> : <Button type="submit" size="icon" variant="outline">
              <EnterIcon />
              <span className="sr-only">Send message</span>
            </Button>}
            <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
              <PopoverTrigger asChild>
                <Button size="icon" variant="outline">
                  <Settings className='w-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Settings</h4>
                  </div>
                  <div className="flex flex-col gap-2">
                    {clearHistoryLoading ? <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                      :
                      <Button onClick={async () => {
                        setClearHistoryLoading(true)
                        const result = await deleteMessages()

                        setClearHistoryLoading(false)
                        setSettingsOpen(false)


                        if (result?.[0]?.messages?.length === 0) {
                          console.log("Enter")
                          router.refresh();

                          return
                        } else {
                          console.error('Failed to clear history:', result);

                          return
                        }
                      }}>Clear chat history</Button>}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </form >
    </div >
  )
}
