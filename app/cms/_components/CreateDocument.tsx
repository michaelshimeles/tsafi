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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createDocument } from '@/utils/actions/articles/create-document'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateDocument({ site_id }: { site_id: string }) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const response = await createDocument(data?.name, site_id)
      setOpen(false)
      return response
    } catch (error) {
      return error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>
            Name your document
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-full'>
          <div className="flex flex-col justify-center items-center w-full gap-3">
            <Label className="w-full">
              Name
            </Label>
            <Input
              className="w-full"
              {...register("name", { required: true })}
            />
          </div>
          <div className='flex justify-end'>
            <Button type="submit" size="sm">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>)
}
