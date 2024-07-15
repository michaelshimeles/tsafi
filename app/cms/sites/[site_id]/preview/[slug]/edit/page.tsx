"use client"
import { Button } from '@/components/ui/button';
import { useGetArticleBySlug } from '@/utils/hooks/useGetArticleBySlug';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Code, ImageIcon, ListOrdered, Quote, Redo, Strikethrough, Undo, Unlink } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import SiteDashWrapper from '../../../_components/SiteDashWrapper';
import { UpdateArticle } from '../../_components/UpdateArticle';
import "./styles.scss";
import { useRouter } from 'next/navigation';
import { useCheckAuthorization } from '@/utils/hooks/useCheckAuthorization';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { UploadDropzone } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateArticleImage } from '@/utils/actions/articles/upload-article-image';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CodeSandboxLogoIcon, FontBoldIcon, FontItalicIcon, Link1Icon, ListBulletIcon } from '@radix-ui/react-icons';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';


const FormSchema = z.object({
  image_alt: z.string(),
});

const MenuBar = ({ editor }: any) => {
  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex gap-3 flex-wrap justify-center items-center border rounded px-2 py-2 mb-6 w-full'>
      <ToggleGroup type="multiple" className='w-full flex justify-start items-center'>
        <Button variant="ghost" value="bold" aria-label="Toggle bold" onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}>
          <FontBoldIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="image" aria-label="Upload image" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="italic" aria-label="Toggle italic" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <FontItalicIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="paragraph" aria-label="Toggle paragraph" onClick={() => editor.chain().focus().setParagraph().run()}>
          <div className="h-4 w-4">P</div>
        </Button>
        <Button variant="ghost" value="strike" aria-label="Toggle strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="code" aria-label="Toggle code" onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="h1" aria-label="Toggle heading level 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          h1
        </Button>
        <Button variant="ghost" value="h2" aria-label="Toggle heading level 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          h2
        </Button>
        <Button variant="ghost" value="h3" aria-label="Toggle heading level 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          h3
        </Button>
        <Button variant="ghost" value="bullet-list" aria-label="Toggle bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <ListBulletIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="ordered-list" aria-label="Toggle ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="code-block" aria-label="Toggle code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <CodeSandboxLogoIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="blockquote" aria-label="Toggle blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="undo" aria-label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" value="redo" aria-label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Button>
      </ToggleGroup>
    </div>
  );
}

export default function ArticleEditor({ params }: { params: { slug: string, site_id: string } }) {

  const router = useRouter()

  const { data: authCheck, error } = useCheckAuthorization(params?.site_id)

  if (error || authCheck?.length === 0) {
    router.push("/cms")
  }

  const { data, refetch } = useGetArticleBySlug(params?.slug)

  const extensions: any = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      paragraph: {

      }
    }),
    Link.configure({
      HTMLAttributes: {
        // Define attributes for the <a> tag
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
      },
    }),
    Image.configure({
      inline: true,
    })
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle,

  ]

  const editor = useEditor({
    extensions,
    content: "",
  }) as any

  useEffect(() => {
    if (editor && data?.[0]?.blog_html) {
      editor.commands.setContent(data?.[0]?.blog_html)
    }
  }, [editor, data?.[0]?.blog_html]);


  const html = editor?.getHTML()

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  const [imageUploadUrl, setImageUploadUrl] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image_alt: "",
    },
  });
  async function onSubmit(info: z.infer<typeof FormSchema>) {
    try {

      const response = await updateArticleImage(data?.[0]?.site_id, params?.slug, imageUploadUrl, info?.image_alt)

      toast("Article is published");
      form.reset();
      setImageUploadUrl("")
      refetch()
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }


  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <div className='flex flex-col items-end w-full'>
        <div className='flex justify-center items-center gap-3'>
          <a href={`/cms/sites/${params?.site_id}/preview/${params?.slug}`}>
            <Button>Preview</Button>
          </a>
        </div>
        <div className="p-4 border rounded mt-5 w-full">
          <div className='flex flex-col gap-3 mt-7 mb-4'>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
              {data?.[0]?.title}
            </h1>
            <Separator />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 justify-center items-start w-full pb-7'>
              {data?.[0].image ?
                <div className='flex flex-col gap-3'>
                  <Label>Blog Cover Image</Label>
                  <img src={data?.[0].image} width={500} height={300} className='rounded-md' />
                </div>
                : <p>No Image</p>}
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" size="sm">
                    Change Cover
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <UploadDropzone
                    className="p-8"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUploadUrl(res?.[0]?.url);
                      toast(`Image uploaded`);
                    }}
                    onUploadError={(error: Error) => {
                      toast(`ERROR! ${error.message}`);
                    }}
                  />
                  {<DialogClose asChild>
                    <div className="flex justify-end">
                      <Button type="button" variant="outline">Close</Button>
                    </div>
                  </DialogClose>}
                </DialogContent>
              </Dialog>
              {imageUploadUrl !== "" && (
                <div className="flex flex-col justify-center items-start w-full gap-3 mt-2">
                  <Label>Image Url</Label>
                  <Input value={imageUploadUrl} readOnly />
                  <FormField
                    control={form.control}
                    name="image_alt"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Enter Image alt text</FormLabel>
                        <FormControl>
                          <Input placeholder="Image alt text" {...field} />
                        </FormControl>
                        <FormDescription>This is your image alt text.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="sm">
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </Form>
          <MenuBar editor={editor} />
          <BubbleMenu editor={editor!} tippyOptions={{ duration: 100 }}>
            <Card className="w-full p-2">
              <ToggleGroup type="multiple">
                <Button variant="ghost" value="bold" aria-label="Toggle bold" onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}>
                  <FontBoldIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" value="italic" aria-label="Toggle italic" onClick={() => editor?.chain().focus().toggleItalic().run()}>
                  <FontItalicIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" value="image" aria-label="Upload image" onClick={addImage}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" value="link" aria-label="Toggle strikethrough" onClick={setLink}>
                  <Link1Icon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" value="link" aria-label="Toggle strikethrough" onClick={() => editor?.chain().focus().unsetLink().run()}>
                  <Unlink className="h-4 w-4" />
                </Button>
              </ToggleGroup>
            </Card>
          </BubbleMenu>
          <div className="tiptap-editor">
            <EditorContent editor={editor} className='min-h-[55vh]' />
          </div>
          <div className="mt-4 w-full">
            <UpdateArticle slug={params?.slug} html={html} />
          </div>
        </div>
      </div>
    </SiteDashWrapper >
  )
}
