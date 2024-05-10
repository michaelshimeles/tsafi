
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllArticles } from "@/utils/actions/articles/get-all-articles"
import Image from "next/image"

export default async function CMS() {
  const response = await getAllArticles()
  return (
    <main className="flex w-full mt-[1rem] flex-col items-start justify-between ">
      <h1 className="scroll-m-20 font-semibold tracking-tight text-4xl">
        Published Blogs
      </h1>
      <div className="flex justify-end w-full">
        <Button>Publish</Button>
      </div>
      <div className="flex flex-col gap-3 mb-[5rem] w-full">
        {response?.map((info: any) => (
          <article
            key={info?.id}
            className="flex flex-col space-y-2 p-4 rounded-md border max-w-[350px]"
          >
            <Image
              src={info?.image}
              alt={info?.image_alt}
              width={804}
              height={452}
              className="rounded-md border bg-muted transition-colors"
            />
            <div className='flex lg:flex-row w-full justify-between items-center'>
              <h2 className="text-lg lg:text-2xl font-bold">{info?.title}</h2>
              <div>
                <Badge>{info?.category?.category}</Badge>
              </div>
            </div>
            <p className="text-muted-foreground">{info?.subtitle}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(info?.created_at)?.toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>
    </main>
  )
}
