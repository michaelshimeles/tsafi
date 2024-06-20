import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import ManageArticle from '../_components/ManageArticle'
import { transformNode } from '@/utils/transform-node'
import { getAllArticleBySlug } from '@/utils/functions/article/get-all-article-slug'
import SiteDashWrapper from '../../_components/SiteDashWrapper'

export default async function BlogPostPage({ params }: { params: { slug: string, site_id: string } }) {

  const response = await getAllArticleBySlug(params?.slug)

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <main className="flex min-w-screen flex-col items-center justify-between ">
        <div className='flex justify-between items-center w-full'>
          <div className="flex justify-start py-6 lg:py-10 w-full">
            <Link href={`/cms`}
              className={cn(buttonVariants({ variant: "ghost" }))}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              See all posts
            </Link>
          </div>
          <ManageArticle response={response} params={params} />
        </div>
        <article className="container relative max-w-3xl pt-3 pb-6 lg:pb-10">
          <div>
            <p
              className="block text-sm text-muted-foreground"
            >
              Published on {new Date(response?.[0]?.created_at).toLocaleDateString()}
            </p>
            <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
              {response?.[0]?.title}
            </h1>
            <div className="mt-4 flex items-center space-x-2">
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
                {/* <Link href={response?.[0]?.author?.author_instagram ? `https://www.instagram.com/${response?.[0]?.author?.author_instagram}` : `https://www.x.com/${response?.[0]?.author?.author_twitter}`} target='_blank'>
                <p className='text-xs text-gray-800 font-semibold hover:underline hover:cursor-pointer'>@{response?.[0]?.author?.author_instagram}</p>
              </Link> */}
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
            <Link href={`/cms`}
              className={cn(buttonVariants({ variant: "ghost" }))}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              See all posts
            </Link>
          </div>
        </article>
      </main>
    </SiteDashWrapper>
  )

}
