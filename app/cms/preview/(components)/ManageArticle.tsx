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
import { statusBlogs } from '@/utils/actions/blog/status-publish-blog'
import { deleteBlog } from '@/utils/actions/blog/delete-blog'
import { useRouter } from 'next/navigation'
import { ClipboardCheckIcon, Delete, DeleteIcon, Edit, Share, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form'
import { useGetArticleBySlug } from '@/utils/hooks/useGetArticleBySlug'
import { toast } from 'sonner'
import { shareArticle } from '@/utils/actions/articles/share-article'
import { Article } from '@/utils/types'

export default function ManageArticle({ params, response }: {
  params: {
    slug: string
  },
  response: Article[]
}) {

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter()

  const { data, isPending, refetch } = useGetArticleBySlug(params?.slug);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    const shareSetting = data.shareSetting === 'true'; // Convert back to boolean
    try {
      const response = await shareArticle(params?.slug, shareSetting)
      toast("Article shareability changed")
      refetch()
      return response
    } catch (error) {
      console.log('error', error)
      return error
    }
  };


  return (
    <div className='flex justify-end items-center w-full gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            <Share className='w-4 h-4' />
          </Button>
        </PopoverTrigger>
        {!isPending &&
          <PopoverContent className="w-80 dark:bg-opacity-40 dark:bg-black">
            <h4 className="font-medium leading-none">
              Shareability
            </h4>
            <Separator className='w-full mt-3' />
            <form onSubmit={handleSubmit(onSubmit)}>
              {<RadioGroup defaultValue={data?.[0]?.shareable ? "true" : "false"} {...register("shareSetting")} className='flex flex-col gap-2 py-3'>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="publicOption" />
                  <Label>Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="privateOption" />
                  <Label>Private</Label>
                </div>
              </RadioGroup>}
              <Button type='submit' variant="outline">Update</Button>
            </form>
            <div className='flex gap-2 mt-4'>
              <Input defaultValue={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/article/public/${data?.[0]?.id}`} />
              <Button size="icon" disabled={!data?.[0]?.shareable} onClick={() => {
                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/article/public/${data?.[0]?.id}`)
                toast("Public article url has been copied")
              }}>
                <ClipboardCheckIcon />
              </Button>
            </div>
          </PopoverContent>}

      </Popover>

      <Link href={`/cms/preview/${params?.slug}/edit`}>
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
            router.push("/cms")
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
