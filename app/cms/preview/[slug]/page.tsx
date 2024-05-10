import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getArticleBySlugApi } from '@/utils/actions/api/get-article-slug-api'
import { auth } from '@clerk/nextjs/server'
import { ChevronLeft } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { userId } = auth();

  const response = await getArticleBySlugApi(params?.slug, userId!)

  return (
    <main className="flex min-w-screen flex-col items-center justify-between ">
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
          <Link href={`/cms`}
            className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </main>
  )

}

const transformNode = (node: any) => {
  // Applying classes to paragraph tags
  if (node.type === "tag" && node.name === "p") {
    let className = "leading-7 mt-6";
    if (node.attribs.class) {
      className = `${node.attribs.class} ${className}`;
    }
    node.attribs.class = className;
  }

  // Example for adding classes to anchor tags
  if (node.type === "tag" && node.name === "a") {
    node.attribs.class =
      "font-medium text-primary underline underline-offset-4";
  }

  // Add more conditions for other tags as needed
  // Example for adding classes to anchor tags
  if (node.type === "tag" && node.name === "h1") {
    node.attribs.class =
      "scroll-m-20 text-2xl font-extrabold pt-4 tracking-tight lg:text-3xl";
  }

  if (node.type === "tag" && node.name === "h2") {
    node.attribs.class =
      "mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0";
  }

  if (node.type === "tag" && node.name === "h3") {
    node.attribs.class =
      "mt-8 scroll-m-20 text-lg font-semibold tracking-tight";
  }
};
