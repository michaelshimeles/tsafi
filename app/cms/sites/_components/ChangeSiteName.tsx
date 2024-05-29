"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { changeSiteName } from '@/utils/actions/sites/settings/change-site-name'
import { toast } from 'sonner'

export default function ChangeSiteName({ response, site_id }: {
  response: any,
  site_id: string
},) {
  const [siteName, setSiteName] = useState(response?.[0]?.site_name || '')

  const handleChangeName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await changeSiteName(site_id, siteName)
      if (response?.error) {
        toast(response?.error?.message)
        return response
      }

      toast("Site name has been updated")

      return response
    } catch (error) {
      console.log('error', error)
      toast("Error occured while trying to update site name")

      return error
    }
  }

  return (
    <div className="w-[80%] mt-[1rem]">
      <Card>
        <CardHeader>
          <CardTitle>Name</CardTitle>
          <CardDescription>
            The name of your site. This will be used as the meta title on Google as well.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeName}>
          <CardContent>
            <Input
              placeholder="Site Name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
