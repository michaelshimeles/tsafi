"use client"

import clsx from 'clsx'
import {
  Book,
  BookA,
  BookCheck,
  Home,
  Paperclip,
  Pen,
  Table
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block ">
      <div className="flex h-full max-h-screen flex-col gap-2 bg-black text-white">
        <div className="flex h-14 items-center px-4 border-b border-gray-700 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">CMS Inc</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-[0.2rem]">
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all hover:text-gray-100 hover:bg-gray-800", {
                "flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white transition-all dark:bg-gray-100 dark:text-gray-50": pathname === "/cms"
              })}
              href="/cms"
            >

              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all hover:text-gray-100 hover:bg-gray-800", {
                "flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white transition-all dark:bg-gray-100 dark:text-gray-50": pathname === "/cms/documents" || pathname.includes("/cms/documents/")
              })}
              href="/cms/documents"
            >
              <BookCheck className="h-4 w-4" />
              My Documents
            </Link>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all hover:text-gray-100 hover:bg-gray-800", {
                "flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white transition-all dark:bg-gray-100 dark:text-gray-50": pathname === "/cms/publish"
              })}
              href="/cms/publish"
            >
              <BookA className="h-4 w-4" />
              Publish Articles{" "}
            </Link>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all hover:text-gray-100 hover:bg-gray-800", {
                "flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white transition-all dark:bg-gray-100 dark:text-gray-50": pathname === "/cms/author"
              })}
              href="/cms/author"
            >
              <Pen className="h-4 w-4" />
              Create Author{" "}
            </Link>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all hover:text-gray-100 hover:bg-gray-800", {
                "flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white transition-all dark:bg-gray-100 dark:text-gray-50": pathname === "/cms/category"
              })}
              href="/cms/category"
            >
              <Table className="h-4 w-4" />
              Create Category{" "}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
