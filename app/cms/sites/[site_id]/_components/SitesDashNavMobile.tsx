"use client"

import { Profile } from "@/components/user-profile"
import { GiHamburgerMenu } from 'react-icons/gi'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import ModeToggle from "@/components/mode-toggle"

export default function SitesDashNavMobile() {
  return (
    <div className="flex flex-col w-full">
      <header className="flex h-14 lg:h-[50px] justify-between lg:justify-end  items-center gap-2 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <GiHamburgerMenu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>tsafi</SheetTitle>
              <SheetDescription>
                An opensource blog CMS built using Nextjs, Supabase & TipTap
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/cms">
                  <Button variant="outline" className="w-full">Dashboard</Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/cms/documents">
                  <Button variant="outline" className="w-full">My Documents</Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/cms/publish">
                  <Button variant="outline" className="w-full">Publish Article</Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/cms/author">
                  <Button variant="outline" className="w-full">Create Author</Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/cms/category">
                  <Button variant="outline" className="w-full">Create Category</Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/cms/api">
                  <Button variant="outline" className="w-full">API</Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/cms/settings">
                  <Button variant="outline" className="w-full">Settings</Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex gap-2">
          <Profile />
          <ModeToggle />
        </div>
      </header>
    </div>
  )
}
