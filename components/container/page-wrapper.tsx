import React from 'react'
import { NavBar } from './navbar'
import Footer from './footer'


export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex min-w-screen flex-col items-center justify-between pb-[4rem]">
        {children}
      </main>
      <Footer />
    </>
  )
}
