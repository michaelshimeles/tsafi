'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetAllSites } from '@/utils/hooks/useGetAllSites'
import { EnterIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { PlusIcon } from 'lucide-react'
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

  return (
    <div>
      {showPopup ? (
        <div>
          {
            filteredSites.length > 0 ? (
              <div className='flex flex-col gap-2 mb-2 w-full'>
                {filteredSites.map((site: any) => (
                  <Card key={site.site_id} className={clsx(`bg-white border hover:cursor-pointer rounded p-2 w-[260px] text-sm`,
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
  ) : <div className='flex gap-3 mb-[1rem]'>
    <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("Create a blog site for me")}>Create a blog site for me</div>
    <div className='py-2 px-3 border text-sm rounded hover:cursor-pointer hover:border-gray-200 border-gray-100 dark:hover:border-zinc-800 dark:border-zinc-900 dark:bg-black' onClick={() => setInput("List all my blog sites")}>List all my blog sites</div>
  </div>
}
<form onSubmit={handleSubmit} className='w-full'>
  <div className="relative flex max-h-60 w-full grow flex-col  overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
        >
          <PlusIcon />
          <span className="sr-only">New Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select the site</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
    <div className="absolute right-0 top-[13px] sm:right-4">
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
