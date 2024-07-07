"use client"

import ModeToggle from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"

export function NavBar({
  title,
  description,
  logo
}: {
  title: string,
  description: string,
  logo: string,
}) {

  return (
    <div className="flex min-w-full justify-between p-2 border-b z-10">
      <Dialog>
        <SheetTrigger className="min-[825px]:hidden p-2 transition">
          <GiHamburgerMenu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              {description}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-3 mt-[1rem]">
            <DialogClose asChild>
              <Link href="/">
                <Button variant="outline" className="w-full">Home</Button>
              </Link>
            </DialogClose>
          </div>
        </SheetContent>
      </Dialog>

      <NavigationMenu>
        <NavigationMenuList className="max-[825px]:hidden ">
          <Link href="/" className="pl-2">
            {logo ? <Image src={logo} width={40} height={40} alt="logo" /> : <p className="font-semibold">{title}</p>}
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-3">
        <ModeToggle />
      </div>
    </div>

  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
