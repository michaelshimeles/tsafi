import React from 'react'
import UserInfo from './(components)/UserInfo'
import BlogProxy from './(components)/BlogProxy'

export default function SettingsPage() {
  return (
    <div className="flex flex-col justify-center items-start w-full mt-2 pb-2">
      <UserInfo />
      <BlogProxy />
    </div>
  )
}
