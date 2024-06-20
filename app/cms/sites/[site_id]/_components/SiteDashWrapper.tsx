import { ReactNode } from 'react'
import SitesDashNav from './SitesDashNav'
import SitesDashNavMobile from './SitesDashNavMobile'

export default function SiteDashWrapper({ children, site_id }: { children: ReactNode, site_id: string }) {

  return (
    <>
      <SitesDashNav site_id={site_id!} />
      <div className="flex flex-col">
        <SitesDashNavMobile />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </>
  )
}
