import { NavBar } from "@/components/NavBar";

export default function Container({ children, }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <main className="flex min-w-screen flex-col items-center justify-between ">
        {children}
      </main>
    </div>
  )
}
