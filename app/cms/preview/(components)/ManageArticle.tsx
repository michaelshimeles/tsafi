"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { statusBlogs } from '@/utils/actions/blog/status-publish-blog'
import { deleteBlog } from '@/utils/actions/blog/delete-blog'
import { useRouter } from 'next/navigation'
import { Edit } from 'lucide-react'
import Link from 'next/link'

export default function ManageArticle({ params, response }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter()

  return (
    <div className='flex justify-end items-center w-full gap-2'>
      <Link href={`/cms/preview/${params?.slug}/edit`}>
        <Edit />
      </Link>
      <Dialog open={openDelete} onOpenChange={setOpenDelete} >
        <DialogTrigger asChild>
          <Button size="sm">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article?
            </DialogDescription>
          </DialogHeader>
          <Button type="submit" size="sm" onClick={async () => {
            await deleteBlog(params?.slug)
            setOpenDelete(false)
            router.push("/cms")
          }}>Yes, Delete</Button>
        </DialogContent>
      </Dialog>
      {response?.[0]?.published ?
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
            <Button variant="outline">Unpublish</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Unpublish Article</DialogTitle>
              <DialogDescription>
                Are you sure you want to unpublish this article?.
              </DialogDescription>
            </DialogHeader>
            <Button type="submit" onClick={async () => {
              await statusBlogs(params?.slug, !response?.[0]?.published)
              setOpen(false)
            }}>Yes, Unpublish</Button>
          </DialogContent>
        </Dialog> : <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Publish</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Publish Article</DialogTitle>
              <DialogDescription>
                Are you sure you want to publish this article?.
              </DialogDescription>
            </DialogHeader>
            <Button type="submit" onClick={async () => {
              await statusBlogs(params?.slug, !response?.[0]?.published)
              setOpen(false)
            }}>Yes, Publish</Button>
          </DialogContent>
        </Dialog>}
    </div>)
}
