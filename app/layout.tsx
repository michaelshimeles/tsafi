import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './provider'
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'tsafi',
  description: 'An opensource blog site and CMS built using Nextjs, Supabase & TipTap',
  openGraph: {
    images: ['https://utfs.io/f/59a2a3e1-f1b9-4152-97d2-38dea6e14106-3hq5f6.png']
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

              {children}
            </ThemeProvider>
            <Toaster />
          </Provider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}