"use client"
import { Button } from '@/components/ui/button';
import {
  Card
} from "@/components/ui/card";
import { useGetDocumentById } from '@/utils/hooks/useGetDocumentById';
import {
  CodeSandboxLogoIcon,
  FontBoldIcon,
  FontItalicIcon,
  Link1Icon,
  ListBulletIcon
} from "@radix-ui/react-icons";
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Code, ImageIcon, ListOrdered, Quote, Redo, Strikethrough, Undo, Unlink } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { SubmitDocument } from './_components/SubmitDocument';
import "./styles.scss";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import SiteDashWrapper from '../../_components/SiteDashWrapper';
import DeleteDocument from '@/app/cms/_components/DeleteDocument';
import { useRouter } from 'next/navigation';
import { useCheckAuthorization } from '@/utils/hooks/useCheckAuthorization';

const MenuBar = ({ editor }: any) => {

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className='flex gap-3 flex-wrap justify-center items-center border rounded px-2 py-2 mb-6 w-full'>
      <ToggleGroup type="multiple" className='w-full flex justify-start items-center'>
        <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}>
          <FontBoldIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="image" aria-label="Upload image" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <FontItalicIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="paragraph" aria-label="Toggle paragraph" onClick={() => editor.chain().focus().setParagraph().run()}>
          <div className="h-4 w-4">P</div>
        </ToggleGroupItem>
        <ToggleGroupItem value="strike" aria-label="Toggle strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="code" aria-label="Toggle code" onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="h-4 w-4" />
        </ToggleGroupItem>
        {/* <ToggleGroupItem value="clear-marks" aria-label="Clear marks" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </ToggleGroupItem>
        <ToggleGroupItem value="clear-nodes" aria-label="Clear nodes" onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </ToggleGroupItem> */}
        <ToggleGroupItem value="h1" aria-label="Toggle heading level 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          h1
        </ToggleGroupItem>
        <ToggleGroupItem value="h2" aria-label="Toggle heading level 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          h2
        </ToggleGroupItem>
        <ToggleGroupItem value="h3" aria-label="Toggle heading level 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          h3
        </ToggleGroupItem>
        <ToggleGroupItem value="bullet-list" aria-label="Toggle bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <ListBulletIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="ordered-list" aria-label="Toggle ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="code-block" aria-label="Toggle code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <CodeSandboxLogoIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="blockquote" aria-label="Toggle blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="undo" aria-label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="redo" aria-label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default function DocumentEditor({ params }: { params: { id: string, site_id: string } }) {

  const router = useRouter()

  const { data: authCheck, error } = useCheckAuthorization(params?.site_id)

  if (error || authCheck?.length === 0) {
    router.push("/cms")
  }

  const { data } = useGetDocumentById(params?.id)

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
  })

  useEffect(() => {
    if (editor && data?.[0]?.document) {
      editor.commands.setContent(data?.[0]?.document)
    }
  }, [editor, data?.[0]?.document]);


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

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <div className='flex flex-col items-end w-full'>
        <div className='flex justify-between items-center gap-3 w-full'>
          <div className='flex justify-center items-center pb-3 my-7'>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-3xl">
              {data?.[0]?.title}
            </h1>
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
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}>
                  <FontBoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => editor?.chain().focus().toggleItalic().run()}>
                  <FontItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="image" aria-label="Upload image" onClick={addImage}>
                  <ImageIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="link" aria-label="Toggle strikethrough" onClick={setLink}>
                  <Link1Icon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="link" aria-label="Toggle strikethrough" onClick={() => editor?.chain().focus().unsetLink().run()}>
                  <Unlink className="h-4 w-4" />
                </ToggleGroupItem>
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
  )
}
