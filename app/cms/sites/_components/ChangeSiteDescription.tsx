"use client"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { changeSiteDescription } from '@/utils/actions/sites/settings/change-site-description'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function ChangeSiteDescription({ response, site_id }: {
  response: any,
  site_id: string
},) {
  const [siteDescription, setSiteDescription] = useState(response?.[0]?.site_description || '')

  const handleChangeDescription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await changeSiteDescription(site_id, siteDescription)
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
          <CardTitle>Description</CardTitle>
          <CardDescription>
            The description of your site. This will be used as the meta description on Google as well.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeDescription}>
          <CardContent>
            <Input
              placeholder="Site descriptions"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
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
