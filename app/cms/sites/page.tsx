import { redirect } from 'next/navigation'
import React from 'react'

export default function Sites() {
  redirect("/cms/dashboard")

  return (
    <div className="flex flex-col justify-center items-start w-full p-4">
      Sites
    </div>
  )
}
