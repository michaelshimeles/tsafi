import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {


  return (
    <div className="grid min-h-screen min-w-full lg:grid-cols-[280px_1fr] ">
      {children}
    </div>
  )
}
