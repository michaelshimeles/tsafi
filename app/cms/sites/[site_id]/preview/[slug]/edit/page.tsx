"use client"
import { Button } from '@/components/ui/button';
import { useGetArticleBySlug } from '@/utils/hooks/useGetArticleBySlug';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ImageIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import SiteDashWrapper from '../../../_components/SiteDashWrapper';
import { UpdateArticle } from '../../_components/UpdateArticle';
import "./styles.scss";
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
    <div className='flex gap-3 flex-wrap border-b pb-3 mb-5'>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        B
      </Button>
      <button onClick={addImage}
        className={editor.isActive('img') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      ><ImageIcon /></button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="p-1 border rounded">
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()} className="p-1 border rounded">
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        paragraph
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}>
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        h3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active p-1 border rounded bg-black text-white' : 'p-1 border rounded'}
      >
        blockquote
      </button>
      <button
        className="p-1 border rounded hover:cursor-pointer"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        className="p-1 border rounded hover:cursor-pointer"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
    </div>
  )
}

export default function ArticleEditor({ params }: { params: { slug: string, site_id: string } }) {

  const router = useRouter()

  const { data: authCheck, error } = useCheckAuthorization(params?.site_id)

  if (error || authCheck?.length === 0) {
    router.push("/cms")
  }

  const { data } = useGetArticleBySlug(params?.slug)

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

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <div className='flex flex-col items-end w-full'>
        <div className='flex justify-center items-center gap-3'>
          <a href={`/cms/sites/${params?.site_id}/preview/${params?.slug}`}>
            <Button>Preview</Button>
          </a>
        </div>
        <div className="p-4 border rounded mt-5 w-full">
          <div className='flex pb-3 my-7'>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
              {data?.[0]?.title}
            </h1>
          </div>
          <MenuBar editor={editor} />
          <BubbleMenu editor={editor!} tippyOptions={{ duration: 100 }}>
            <button
              onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}
              className={editor?.isActive('bold') ? 'is-active border rounded bg-black text-white border-black px-1 mx-1' : 'border-black px-1 border rounded text-black bg-white'}
            >
              bold
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive('italic') ? 'is-active border rounded bg-black text-white border-black px-1 mx-1' : 'border-black px-1 border rounded text-black bg-white mx-1'}
            >
              italic
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              className={editor?.isActive('strike') ? 'is-active border rounded bg-black text-white border-black px-1 mx-1' : 'border-black px-1 border rounded text-black bg-white'}
            >
              strike
            </button>
            <button onClick={setLink} className={editor?.isActive('link') ? 'is-active border rounded bg-black text-white border-black px-1 mx-1' : 'border-black px-1 mx-1 border rounded text-black bg-white'}>
              link
            </button>
            <button
              className={editor?.isActive('link') ? 'is-active border rounded bg-blue-700 text-white border-black px-1 mx-1' : 'border-black px-1 mx-1 border rounded text-black bg-white'}
              onClick={() => editor?.chain().focus().unsetLink().run()}
              disabled={!editor?.isActive('link')}
            >
              unlink
            </button>
          </BubbleMenu>
          <div className="tiptap-editor">
            <EditorContent editor={editor} className='min-h-[55vh]'/>
          </div>
          <div className="mt-4 w-full">
            <UpdateArticle slug={params?.slug} html={html} />
          </div>
        </div>
      </div>
    </SiteDashWrapper>
  )
}
