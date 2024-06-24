import { Badge } from "@/components/ui/badge"
import { readAllArticles } from "@/utils/actions/sites/articles/read-articles"
import { readSiteById } from "@/utils/actions/sites/read-site-id"
import { Article } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

export default async function page({ params }: { params: { site_id: string } }) {

  const result = await readSiteById(params?.site_id);

  const response = await readAllArticles(params?.site_id) as Article[]

  return (
    <div className="flex flex-col mt-[1rem] justify-center items-center w-[90%]">
      <div className='flex flex-col items-center p-3 w-full'>
        <div className='flex flex-col justify-start items-center gap-2 w-full'>
          <div className='flex gap-3 justify-start items-center w-full'>
            <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
              {result?.[0]?.site_name}
            </h1>
          </div>
          <div className='flex gap-3 justify-start items-center w-full border-b pb-4'>
            <p className="text-gray-500">
              {result?.[0]?.site_description}
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center w-full'>
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          {response?.length > 0 && response?.map((article: Article) => (
            <Link key={article?.id} href={`/${article?.slug}`}>
              <article
                className="flex flex-col space-y-2 p-4 rounded-md border w-[350px]"
              >
                {article?.image && <Image
                  src={article?.image}
                  alt={""}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />}
                <h2 className="text-xl font-bold">{article?.title}</h2>
                <p className="text-sm text-muted-foreground">{article?.subtitle}</p>
                <div className='flex lg:flex-row w-full justify-between items-center gap-1'>
                  <p className="text-sm text-muted-foreground">
                    {new Date(article?.created_at)?.toLocaleDateString()}
                  </p>
                  <div>
                    <Badge>{article?.category?.category}</Badge>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
