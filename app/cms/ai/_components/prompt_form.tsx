'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useGetAllSites } from '@/utils/hooks/useGetAllSites'
import { EnterIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import Textarea from 'react-textarea-autosize'

export function PromptForm({ input, handleInputChange, handleSubmit, setInput, setMessages }: any) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [filteredSites, setFilteredSites] = useState([]);
  const { data: sites } = useGetAllSites();

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
    <div>
      {showPopup && !selectedSite ? (
        <div>
          {
            filteredSites?.length > 0 ? (
              <div className='flex flex-wrap gap-1 mb-2 w-full'>
                {filteredSites.map((site: any) => (
                  <Card key={site.site_id} className="flex flex-col max-w-[350px] min-h-[150px] hover:dark:bg-zinc-900 hover:cursor-pointer w-full px-[1rem] justify-between h-full py-[1rem]" onClick={() => setSelectedSite(site)}>
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
        <div className='flex gap-3 mb-[1rem]'>
          <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site name for ${selectedSite?.site_name}`)}>Change site name for {selectedSite?.site_name}</div>
          <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site subdomain for ${selectedSite?.site_name}`)}>Change site subdomain for {selectedSite?.site_name}</div>
        </div>
        :
        <div className='flex flex-wrap gap-3 mb-[1rem]'>
          <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Create a blog site for me")}>Create a blog site for me</div>
          <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("List all my blog sites")}>List all my blog sites</div>
          <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Generate a blog image")}>Generate a blog image</div>
          <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Generate a document from a YouTube video")}>Generate a document from a YouTube video</div>
        </div>
      }
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="flex justify-center items-center max-h-60 w-full grow  overflow-hidden bg-background pr-4 pl-2 rounded-md border">
          <div className={selectedSite ? `border p-3 rounded` : `border p-3 rounded invisible`} onClick={() => setSelectedSite(null)}>
            <p>{selectedSite?.site_name.match(/^(\w)\w*\s+(\w{1,2})/)?.slice(1)?.join('') ? selectedSite?.site_name.match(/^(\w)\w*\s+(\w{1,2})/)?.slice(1)?.join('') : selectedSite?.site_name}</p>
          </div>
          <Textarea
            placeholder="Send a message."
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
          <div className="">
            <Button type="submit" size="icon">
              <EnterIcon />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </form>
    </div >
  )
}
