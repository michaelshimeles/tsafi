import { readSites } from '@/utils/actions/sites/read-sites'
import CreateSite from './(components)/CreateSite'
import { Site } from '@/utils/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Sites() {
  redirect("/cms")

  const response = await readSites()

  return (
    <main className="flex min-w-screen p-4 flex-col items-center justify-between w-full">
      <div className="flex mb-[2rem] w-full justify-between items-center">
        <h1 className=" text-3xl font-semibold tracking-tight">
          Sites
        </h1>
        <CreateSite />
      </div>
      {response?.length > 0
        ?
        <div className="flex  gap-2 w-full">
          {response?.map((site: Site) => (
            <Link
              key={site?.id}
              href={`/cms/sites/${site?.site_id}`}
              className="flex flex-col border dark:border-zinc-800 border-zinc-200 rounded-md w-[350px] hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
            >
              <div className="flex flex-col px-[1rem] justify-between py-[1rem]">
                <div className='flex lg:flex-row w-full justify-between items-center'>
                  <h2 className="text-lg font-bold">{site?.site_name}</h2>
                </div>
                <p className="text-muted-foreground pt-1 text-sm">{site?.site_description}</p>
                <div className="flex justify-between mt-2 items-center w-full">
                  <p className="text-xs text-muted-foreground">
                    {new Date(site?.created_at)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        :
        <main className="flex flex-col gap-2 lg:gap-2 min-h-[80vh] w-full">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no site
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Site(s) will show here once you&apos;ve created a site
              </p>
              <CreateSite />
            </div>
          </div>
        </main>
      }
    </main>
  )
}
