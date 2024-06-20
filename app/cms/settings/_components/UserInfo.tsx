"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@clerk/nextjs'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function UserInfo() {
  const { user } = useUser()
  const [showAPI, setShowAPI] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-4  w-[90%] md:w-[60%] lg:w-[50%]">
      <h2 className="mt-10 scroll-m-20  pb-2 w-full text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        My Profile
      </h2>
      <div className='flex w-full gap-3'>
        <div className='flex flex-col gap-3 w-full'>
          <Label>First Name</Label>
          <Input disabled defaultValue={user?.firstName ? user?.firstName : ""} />
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <Label>Last Name</Label>
          <Input disabled defaultValue={user?.lastName ? user?.lastName : ""} />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          <Label>E-mail</Label>
          <Input disabled defaultValue={user?.emailAddresses?.[0]?.emailAddress!} />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          <Label>API Key</Label>
          <div className='flex justify-center items-center gap-2'>
            <Input type={showAPI ? 'text' : 'password'} value={user?.id!} />
            {!showAPI ? <EyeOff onClick={() => setShowAPI(!showAPI)} className='hover:cursor-pointer' /> : <Eye onClick={() => setShowAPI(!showAPI)} className='hover:cursor-pointer' />}
          </div>
        </div>
      </div>
    </div>
  )
}