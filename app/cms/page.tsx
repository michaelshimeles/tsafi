import { Site } from '@/utils/types'
import Link from 'next/link'
import { readSites } from '@/utils/functions/sites/read-sites'
import DashWrapper from './_components/DashWrapper'
import CreateSite from './sites/_components/CreateSite'
import { Card } from '@/components/ui/card'
import { searchInternet } from '@/utils/functions/ai/search-internet'

export default async function Sites() {

  const response = await readSites()

  return (
    <DashWrapper>
      <main className="flex min-w-screen p-4 flex-col items-center justify-between w-full">
        <div className="flex mb-[1.5rem] w-full justify-between items-center">
          <h1 className=" text-3xl font-semibold tracking-tight">
            Your Blog Site(s)
          </h1>
          <CreateSite />
        </div>
        {response?.length > 0
          ?
          <div className="flex flex-wrap  gap-2 w-full">
            {response?.map((site: Site) => (
              <Link
                key={site?.id}
                href={`/cms/sites/${site?.site_id}`}
                prefetch={true}
                className="flex flex-col rounded-md w-[350px] hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
              >
                <Card className="flex flex-col px-[1rem] justify-between h-full py-[1rem]">
                  <div className='flex flex-col w-full justify-center items-startxw'>
                    <h2 className="text-lg font-bold">{site?.site_name}</h2>
                    <p className="text-gray-400 pt-1 text-sm">{site?.site_description}</p>
                  </div>
                  <div className="flex justify-between mt-2 items-center w-full">
                    <p className='text-xs px-2 py-1 rounded-full border bg-zinc-900 text-gray-300'>{site?.site_subdomain}.{process.env.BASE_DOMAIN}</p>
                    <p className="text-xs text-muted-foreground ">
                      {new Date(site?.created_at)?.toLocaleDateString()}
                    </p>
                  </div>
                </Card>
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
    </DashWrapper>
  )
}
