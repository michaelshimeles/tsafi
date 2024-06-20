"use client"
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createSites } from '@/utils/actions/sites/create-site'
import { UploadDropzone } from "@/utils/uploadthing"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { z } from "zod"

// Define a custom validation regex for subdomain
const subdomainRegex = /^[a-zA-Z0-9-]+$/;

const FormSchema = z.object({
  site_name: z.string(),
  site_description: z.string(),
  site_subdomain: z.string()
    .min(1, "Subdomain is required")
    .max(63, "Subdomain must be less than 64 characters")
    .regex(subdomainRegex, "Subdomain must only contain alphanumeric characters or hyphens"),
  site_cover_image: z.string()
})

export default function CreateSite() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      site_name: "",
      site_description: "",
      site_subdomain: "",
      site_cover_image: ""
    }
  })

  const [open, setOpen] = useState<boolean>(false);
  const [logoUploadUrl, setLogoUploadUrl] = useState<string>("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await createSites(data?.site_name, data?.site_description, data?.site_subdomain, logoUploadUrl)

      if (response?.error) {
        if (response?.error?.code === 23505) {
          toast("Subdomain already exists, try another subdomain")
          return response
        }

        toast(response?.error?.message)
        form.reset()
        return response
      }

      if (response?.message) {
        toast(response?.message)
        form.reset()
        return response
      }

      toast("Site is published")
      form.reset()
      setOpen(false)
      return response
    } catch (error) {
      console.log('error', error)
      toast("Error occurred")
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
                      <Input  {...field} className='border-none' placeholder='' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col pt-[1rem]'>
              <div className='flex flex-col'>
                <Label>Logo</Label>
                <UploadDropzone
                  className="p-8"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setLogoUploadUrl(res?.[0]?.url);
                    toast(`Image uploaded`);
                  }}
                  onUploadError={(error: Error) => {
                    toast(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
