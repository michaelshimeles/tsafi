'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useGetAllSites } from '@/utils/hooks/useGetAllSites'
import { EnterIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { useState } from 'react'
import Textarea from 'react-textarea-autosize'

export function PromptForm({ input, handleInputChange, handleSubmit, setInput }: any) {
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
        sites.filter((site: any) => site.site_name.toLowerCase().includes(searchQuery))
      );
    } else {
      setShowPopup(false);
    }
  };

  console.log("selectedSite", selectedSite)

  return (
    <div>
      {showPopup && !selectedSite ? (
        <div>
          {
            filteredSites.length > 0 ? (
              <div className='flex flex-col gap-2 mb-2 w-full'>
                {filteredSites.map((site: any) => (
                  <Card key={site.site_id} className={clsx(`bg-white dark:bg-black border hover:cursor-pointer rounded p-2 w-[260px] text-sm`,
                    {
                      "bg-white border hover:cursor-pointer rounded p-2 w-[260px] text-sm": filteredSites?.length === 1
                    }
                  )} onClick={() => setSelectedSite(site)}>
                    {site.site_name}
                  </Card>
                ))}
              </div>
            ) : (
              <div className='p-2'>No results found</div>
            )
          }
        </div>
      ) : selectedSite ? <div className='flex gap-3 mb-[1rem]'>
        <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site name for ${selectedSite?.site_name}`)}>Change site name for {selectedSite?.site_name}</div>
        <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site description for ${selectedSite?.site_name}`)}>Change site description for {selectedSite?.site_name}</div>
        <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput(`Change site subdomain for ${selectedSite?.site_name}`)}>Change site subdomain for {selectedSite?.site_name}</div>
      </div> : <div className='flex gap-3 mb-[1rem]'>
        <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Create a blog site for me")}>Create a blog site for me</div>
        <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("List all my blog sites")}>List all my blog sites</div>
      </div>
      }
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="flex justify-center items-center max-h-60 w-full grow  overflow-hidden bg-background pr-8 pl-2 rounded-md border">
          <div className={selectedSite ? `border p-3 rounded` : `border p-3 rounded invisible`} onClick={() => setSelectedSite(null)}>
            <p>{selectedSite?.site_name.match(/^(\w)\w*\s+(\w{1,2})/).slice(1).join('')}</p>
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
