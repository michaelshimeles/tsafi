import React, { ReactNode } from 'react'
import DashboardNavMobile from './DashboardNav'
import DashboardNav from './DashboardSidebar'

export default function DashWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardNav />
      <div className="flex flex-col">
        <DashboardNavMobile />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </>
  )
}
