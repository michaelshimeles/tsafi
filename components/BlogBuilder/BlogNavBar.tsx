"use client"
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GiHamburgerMenu } from "react-icons/gi"
import { Dialog, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Rocket } from 'lucide-react'

export default function BlogNavBar() {
  return (
    <div className="flex min-w-full justify-between p-2 border-b z-10">
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

      <NavigationMenu>
        <NavigationMenuList className="max-[825px]:hidden">
          <Link href="/" className="pl-2">
            <Rocket />
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <Button>Home</Button>
      </div>
    </div>
  )
}
