"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAuthor } from "@/utils/actions/author/create-author";
import { UploadButton } from "@/utils/uploadthing";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
  instagram: z.string(),
  twitter: z.string()
})

export default function Author() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      instagram: "",
      twitter: ""
    }
  })

  const [imageUploadUrl, setImageUploadUrl] = useState<string>("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    try {
      const response = await createAuthor(data?.name, data?.instagram, data?.twitter, imageUploadUrl!)
      if (response?.error) {
        toast("Author creation failed")
        return
      }
      toast("Author has been created")
      form.reset()
      return response
    } catch (error) {
      console.log('error', error)
      return error
    }
  }

  return (
    <main className="flex w-full flex-col p-4 items-center justify-between ">
      <div className="flex flex-col gap-3 mb-[5rem] w-full">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Create an Author
        </h1>
        <p className="leading-7">
          Create an author to add to your articles
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your instagram username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="heytorontofoodie" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your twitter username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="heytorontofoodie" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col justify-center items-start w-full gap-3">
              <Label>Upload Author Image</Label>
              <UploadButton
                appearance={{
                  button:
                    "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 px-5",
                  container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                  allowedContent:
                    "flex h-8 flex-col items-center justify-center px-2 text-white",
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setImageUploadUrl(res?.[0]?.url)
                  toast(`Image uploaded`)
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast(`ERROR! ${error.message}`);
                }}
              />
              {imageUploadUrl !== "" && <div className="flex flex-col justify-center items-start w-full gap-3 mt-2">
                <Label>Image Url</Label>
                <Input value={imageUploadUrl} />
              </div>}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}