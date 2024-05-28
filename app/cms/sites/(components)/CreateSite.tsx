"use client"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { createSites } from '@/utils/actions/sites/create-site'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { z } from "zod"

const FormSchema = z.object({
  site_name: z.string(),
  site_description: z.string(),
  site_subdomain: z.string(),
})

export default function CreateSite() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      site_name: "",
      site_description: "",
      site_subdomain: "",
    }
  })

  const [open, setOpen] = useState<boolean>(false);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await createSites(data?.site_name, data?.site_description, data?.site_subdomain)
      console.log('response', response)
      toast("Site is published")
      form.reset()
      setOpen(false)
      return response
    } catch (error) {
      console.log('error', error)
      toast("Error occured")
      return error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new site</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] mt-[0.5rem] space-y-3">
            <FormField
              control={form.control}
              name="site_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Description</FormLabel>
                  <FormControl>
                    <Textarea  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site_subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Subdomain</FormLabel>
                  <FormControl>
                    <div className='flex justify-center items-center gap-3 border rounded'>
                      <Input  {...field} className='border-none'/>
                      <p className='border-l p-2.5 bg-zinc-900 pr-2 text-sm text-gray-400'>rasmic.xyz</p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button type="submit" size="sm">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
