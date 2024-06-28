
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllArticlsBySite } from "@/utils/functions/article/get-all-articles-site"
import { StopCircle, VerifiedIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SiteDashWrapper from "./_components/SiteDashWrapper"
import { Authorization } from "@/utils/actions/authorization"
import { redirect } from "next/navigation"

export default async function CMS({ params }: { params: { site_id: string } }) {

  const authCheck: any = await Authorization(params?.site_id)

  if (authCheck?.error || authCheck?.length === 0) {
    redirect("/cms")
  }

  const response = await getAllArticlsBySite(params?.site_id)

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <main className="flex w-full flex-col items-start p-4 justify-between ">
        <div className=" w-full">
          <h1 className="scroll-m-20 font-semibold tracking-tight text-3xl">
            Articles
          </h1>
          <div className="flex flex-wrap justify-start items-center  gap-3 mt-[1.5rem] mb-[2rem] w-full">
            {response?.length > 0 ? response?.map((info: any) => (
              <Link href={`/cms/sites/${params?.site_id}/preview/${info?.slug}`} key={info?.id}>
                <article
                  key={info?.id}
                  className="flex flex-col space-y-2 border dark:border-zinc-900 border-zinc-200 rounded-md max-w-[350px] hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
                >
                  <Image
                    src={info?.image ? info?.image : process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE}
                    alt={info?.image_alt}
                    width={600}
                    height={400}
                    className="rounded-t bg-muted border-b dark:border-zinc-600 border-zinc-200 transition-colors w-full"
                  />
                  <div className="flex flex-col px-[1rem] pt-[0.5rem] pb-[1.5rem]">
                    <div className='flex lg:flex-row w-full justify-between items-center'>
                      <h2 className="text-lg font-bold">{info?.title}</h2>
                    </div>
                    <p className="text-muted-foreground pt-1 text-sm">{info?.subtitle}</p>
                    <div className="flex justify-between mt-2 items-center w-full">
                      <p className="text-xs text-muted-foreground">
                        {new Date(info?.created_at)?.toLocaleDateString()}
                      </p>
                      <div className="flex justify-center items-center gap-1">
                        <Badge>{info?.category?.category}</Badge>
                        {info?.published ? <VerifiedIcon /> : <StopCircle />}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>

            ))
              :
              <main className="flex flex-col gap-2 lg:gap-2 min-h-[30vh] w-full">
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no articles
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Articles will show here once you&apos;ve published articles
                    </p>
                    <Link href={`/cms/sites/${params?.site_id}/documents`}>
                      <Button>My Documents</Button>
                    </Link>
                  </div>
                </div>
              </main>
            }
          </div>
        </div>
      </main>
    </SiteDashWrapper>
  )
}