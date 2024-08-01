"use client";
import DeleteDocument from '@/app/cms/_components/DeleteDocument';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { youtubeToDocument } from '@/utils/functions/ai/youtube-to-document';
import { useCheckAuthorization } from '@/utils/hooks/useCheckAuthorization';
import { useGetDocumentById } from '@/utils/hooks/useGetDocumentById';
import { UploadDropzone } from "@/utils/uploadthing";
import {
  CodeSandboxLogoIcon,
  FontBoldIcon,
  FontItalicIcon,
  Link1Icon,
  ListBulletIcon,
  ReloadIcon
} from "@radix-ui/react-icons";
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Code, ImageIcon, ListOrdered, Quote, Redo, Strikethrough, Undo, Unlink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import SiteDashWrapper from '../../_components/SiteDashWrapper';
import { SubmitDocument } from './_components/SubmitDocument';
import "./styles.scss";

const MenuBar = ({ editor }: any) => {
  const [imageUploadUrl, setImageUploadUrl] = useState<string>("");

  useEffect(() => {
    editor?.chain().focus().setImage({ src: imageUploadUrl }).run();

    return () => {
      setImageUploadUrl("")
    }
  }, [imageUploadUrl])

  if (!editor) {
    return null;
  }

  return (
    <div className='flex gap-3 flex-wrap justify-center items-center border rounded px-2 py-2 mb-6 w-full'>
      <ToggleGroup type="multiple" className='w-full flex justify-start items-center'>
        <Button variant="ghost" value="bold" aria-label="Toggle bold" onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}>
          <FontBoldIcon className="h-4 w-4" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" value="image" aria-label="Upload image">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Upload Image
            </DialogTitle>
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
            <DialogClose asChild>
              <div className="flex justify-end">
                <Button type="button" variant="outline">Close</Button>
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
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

export default function DocumentEditor({ params }: { params: { id: string, site_id: string } }) {
  const router = useRouter();
  const { data: authCheck, error } = useCheckAuthorization(params?.site_id);

  if (error || authCheck?.length === 0) {
    router.push("/cms");
  }

  const [open, setOpen] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUploadUrl, setImageUploadUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response: any = await youtubeToDocument(data?.youtube_url, "html");
      setOpen(false);
      console.log('response', response);
      setTranscription(response); // Update transcription state
      setLoading(false);
      return response;
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      return error;
    }
  }

  const { data } = useGetDocumentById(params?.id);

  const extensions: any = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO: Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO: Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      paragraph: {}
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
  ];

  const editor = useEditor({
    extensions,
    content: "",
  });

  useEffect(() => {
    if (editor && data?.[0]?.document) {
      editor.commands.setContent(data?.[0]?.document);
    }
  }, [editor, data?.[0]?.document]);

  useEffect(() => {
    if (editor && transcription) {
      editor.commands.setContent(transcription); // Set editor content to transcription
    }
  }, [editor, transcription]);

  const html = editor?.getHTML();

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  useEffect(() => {
    editor?.chain().focus().setImage({ src: imageUploadUrl }).run();

    return () => {
      setImageUploadUrl("")
    }
  }, [imageUploadUrl])

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <div className='flex flex-col items-end w-full'>
        <div className='flex justify-between items-center gap-3 w-full'>
          <div className='flex justify-center items-center pb-3 my-7 gap-4'>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-3xl">
              {data?.[0]?.title}
            </h1>
            <Popover>
              <PopoverTrigger asChild>
                {loading ? <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
                  : <Button>YT → Document</Button>}
              </PopoverTrigger>
              <PopoverContent>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-full'>
                  <div className="flex flex-col justify-center items-center w-full gap-3">
                    <Label className="w-full">
                      Enter YouTube Url
                    </Label>
                    <Input
                      className="w-full"
                      {...register("youtube_url", { required: true })}
                    />
                  </div>
                  <div className='flex justify-end'>
                    {loading ? <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                      : <Button type="submit" size="sm">Generate</Button>
                    }
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex gap-2'>
            <DeleteDocument id={params?.id} />
            <a href="/cms/documents">
              <Button variant="outline">Back</Button>
            </a>
          </div>
        </div>
        <div className="p-4 border rounded w-full">
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
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" value="image" aria-label="Upload image">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        Upload Image
                      </DialogTitle>
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
                      <DialogClose asChild>
                        <div className="flex justify-end">
                          <Button type="button" variant="outline">Close</Button>
                        </div>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>
                <Button variant="ghost" value="link" aria-label="Toggle strikethrough" onClick={setLink}>
                  <Link1Icon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" value="link" aria-label="Toggle strikethrough" onClick={() => editor?.chain().focus().unsetLink().run()}>
                  <Unlink className="h-4 w-4" />
                </Button>
              </ToggleGroup>
            </Card>
          </BubbleMenu>
          <div className="tiptap-editor w-full">
            <EditorContent editor={editor} className='min-h-[60vh]' />
          </div>
          <div className="mt-4 w-full">
            <SubmitDocument html={html!} id={params?.id} site_id={params?.site_id} title={data?.[0]?.title} />
          </div>
        </div>
      </div>
    </SiteDashWrapper>
  );
}
