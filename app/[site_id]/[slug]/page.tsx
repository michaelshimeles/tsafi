import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAllArticleBySlug } from '@/utils/actions/articles/get-article-slug'
import { readArticleSlug } from '@/utils/actions/sites/articles/read-article-slug'
import { transformNode } from '@/utils/transform-node'
import { ChevronLeft } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'

// export async function generateMetadata({ params }: { params: { slug: string, site_id: string } }) {

//   try {
//     const { response } = await getAllArticleBySlug(params?.slug)

//     if (response?.length === 0) {
//       return {
//         title: "Not Found",
//         description: "The page you are looking for does not exist"
//       }
//     }

//     return {
//       openGraph: {
//         title: response?.[0]?.title,
//         description: response?.[0]?.subtitle,
//         images: [response?.[0]?.image],
//       },
//       keywords: [...response?.[0]?.keywords]
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       title: "Not Found",
//       description: "The page you are looking for does not exist"
//     }
//   }
// }

// export async function generateStaticParams() {

//   try {
//     const response: any = await fetch(
//       `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/blog/slugs`,
//       {
//         headers: {
//           "X-Auth-Key": process.env.CMS_API_KEY!,
//         },
//       }
//     );

//     const result = await response.json()

//     if (result?.error) {
//       throw new Error(`Failed to fetch articles: ${response.statusText}`);
//     }

//     if (result?.response?.length === 0) return [];

//     return result?.response?.map((post: any) => ({
//       slug: post?.slug,
//     }));

//   } catch (error) {
//     console.error('Error fetching articles:', error);
//     return [];
//   }
// }

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const response = await readArticleSlug(params?.slug)

  return (
    <>
      <article className="container relative max-w-3xl py-6 lg:py-10">
        <Link
          href="/"
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
            {response?.[0]?.author?.author_profile_img && <Image
              src={response?.[0]?.author?.author_profile_img}
              alt={""}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />}
            <div className="flex flex-col text-left leading-tight">
              <p className="font-medium">
                {response?.[0]?.author?.author_name}
              </p>
              <Link href={`https://www.x.com/${response?.[0]?.author?.author_twitter}`} target='_blank'>
                <p className='text-xs text-gray-800 dark:text-gray-300 font-semibold hover:underline hover:cursor-pointer'>@{response?.[0]?.author?.author_twitter}</p>
              </Link>
            </div>
          </div>
        </div>
        {response?.[0]?.image && <Image
          src={response?.[0]?.image}
          alt={""}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />}
        {ReactHtmlParser(response?.[0]?.blog_html, {
          transform: transformNode
        })}
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </>
  )
}
