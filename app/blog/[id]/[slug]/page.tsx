import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getArticleBySlugApi } from '@/utils/actions/api/get-article-slug-api'
import { getAllArticleBySlug } from '@/utils/actions/articles/get-article-slug'
import { transformNode } from '@/utils/transform-node'
import { ChevronLeft } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const response = await getAllArticleBySlug(params?.slug)

    if (response?.length === 0) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist"
      }
    }

    return {
      openGraph: {
        title: response?.[0]?.title,
        description: response?.[0]?.subtitle,
        images: [response?.[0]?.image],
      },
      keywords: [...response?.[0]?.keywords]
    }
  } catch (error) {
    console.error(error)
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist"
    }
  }
}


export default async function BlogPostPage({ params }: { params: { id: string, slug: string } }) {

  const response = await getArticleBySlugApi(params?.slug, params?.id)

  return (
    <main className="flex min-w-screen flex-col items-center justify-between ">
      <article className="container relative max-w-3xl py-6 lg:py-10">
        <Link
          href={`/blog/${params?.id}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div>
          <p
            className="block text-sm text-muted-foreground"
          >
            Published on {new Date(response?.[0]?.created_at).toLocaleDateString()}
          </p>
          <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
            {response?.[0]?.title}
          </h1>
          <div className="mt-4 flex items-center space-x-3">
            <Image
              src={response?.[0]?.author?.author_profile_img}
              alt={""}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex flex-col text-left leading-tight">
              <p className="font-medium">
                {response?.[0]?.author?.author_name}
              </p>
              <Link href={`https://www.instagram.com/${response?.[0]?.author?.author_instagram}`} target='_blank'>
                <p className='text-xs text-gray-800 font-semibold hover:underline hover:cursor-pointer'>@{response?.[0]?.author?.author_instagram}</p>
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={response?.[0]?.image}
          alt={""}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
        {ReactHtmlParser(response?.[0]?.blog_html, {
          transform: transformNode
        })}
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href={`/blog/${params?.id}`}
            className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </main>
  )

}
