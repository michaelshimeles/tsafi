"use client"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { deleteBlog } from '@/utils/actions/blog/delete-blog'
import { statusBlogs } from '@/utils/actions/blog/status-publish-blog'
import { useGetArticleBySlug } from '@/utils/hooks/useGetArticleBySlug'
import { Article } from '@/utils/types'
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ManageArticle({ params, response }: {
  params: {
    slug: string,
    site_id: string
  },
  response: Article[]
}) {

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter()

  const { data, isPending, refetch } = useGetArticleBySlug(params?.slug);

  return (
    <div className='flex justify-end items-center w-full gap-2'>
      <Link href={`/cms/sites/${params?.site_id}/preview/${params?.slug}/edit`}>
        <Button size="sm" variant="outline">
          <Edit className='w-4 h-4' />
        </Button>
      </Link>
      <Dialog open={openDelete} onOpenChange={setOpenDelete} >
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Trash className='w-4 h-4' />
          </Button>
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
            router.push(`/cms/sites/${params?.site_id}`)
          }}>Yes, Delete</Button>
        </DialogContent>
      </Dialog>
      {response?.[0]?.published ?
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Unpublish</Button>
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
            <Button variant="outline" size="sm">Publish</Button>
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
