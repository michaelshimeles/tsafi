
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllArticlsBySite } from "@/utils/functions/article/get-all-articles-site"
import { StopCircle, VerifiedIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SiteDashWrapper from "./_components/SiteDashWrapper"
import { Authorization } from "@/utils/actions/authorization"
import { redirect } from "next/navigation"
import ArticleCard from "../_components/article-card"

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
            {response?.length > 0 ? response?.map((info: any, index: number) => (
              <ArticleCard key={index}  article={info} path={`/cms/sites/${params?.site_id}/preview/${info?.slug}`}/>
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