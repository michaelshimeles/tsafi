"use client"

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import {
  BookA,
  BookCheck,
  Home,
  MoveLeft,
  Pen,
  Settings,
  Table
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function SitesDashNav({ site_id }: { site_id: string }) {
  const pathname = usePathname()

  const navItems = [
    { href: `/cms/sites/${site_id}`, label: "My Site", icon: Home },
    { href: `/cms/sites/${site_id}/documents`, label: "My Documents", icon: BookCheck },
    { href: `/cms/sites/${site_id}/publish`, label: "Publish Article", icon: BookA },
    { href: `/cms/sites/${site_id}/author`, label: "Create Author", icon: Pen },
    { href: `/cms/sites/${site_id}/category`, label: "Create Category", icon: Table },
    { href: `/cms/sites/${site_id}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[50px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="text-md">tsafi</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <div className='my-2 w-full'>
              <Link href="/cms">
                <Button size="sm" variant="outline">
                  <MoveLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
            {navItems.map(({ href, label, icon: Icon }, index: number) => (
              <div key={href}>
                <Link

                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    {
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50": pathname === href || (href !== `/cms/sites/${site_id}` && pathname.startsWith(href))
                    }
                  )}
                  href={href}
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Icon className="h-3 w-3" />
                  </div>
                  {label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
