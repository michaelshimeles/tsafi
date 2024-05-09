"use client"

import { Profile } from "@/components/Profile"
import { GiHamburgerMenu } from 'react-icons/gi'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet"
import Link from "next/link"

export default function DashboardNavMobile() {
  return (
    <header className="flex h-14 justify-between min-[825px]:justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Dialog>
        <SheetTrigger className="min-[825px]:hidden p-2 transition">
          <GiHamburgerMenu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>SupaNext CMS</SheetTitle>
            <SheetDescription>
              An opensource blog CMS built using Nextjs, Supabase & TipTap
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-3 mt-[1rem]">
            <DialogClose asChild>
              <Link href="/">
                <Button variant="outline" className="w-full">Home</Button>
              </Link>
            </DialogClose>
            <DialogClose asChild>
              <Link href="/cms">
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>
            </DialogClose>
          </div>
        </SheetContent>
      </Dialog>
      <Profile />
    </header>
  )
}
