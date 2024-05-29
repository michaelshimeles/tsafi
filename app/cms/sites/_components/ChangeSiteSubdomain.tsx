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
import { changeSiteSubdomain } from '@/utils/actions/sites/settings/change-site-subdomain'

export default function ChangeSiteSubdomain({ response, site_id }: {
  response: any,
  site_id: string
},) {
  const [siteSubdomain, setSiteSubDomain] = useState(response?.[0]?.site_subdomain || '')

  const handleChangeSiteDomain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await changeSiteSubdomain(site_id, siteSubdomain)
      if (response?.error) {
        toast(response?.error?.message)
        return response
      }

      toast("Site subdomain has been updated")

      return response
    } catch (error) {
      console.log('error', error)
      toast("Error occured while trying to update site subdomain")

      return error
    }
  }

  return (
    <div className="w-[80%] mt-[1rem]">
      <Card>
        <CardHeader>
          <CardTitle>Subdomain</CardTitle>
          <CardDescription>
            The subdomain for your site.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeSiteDomain}>
          <CardContent>
            <Input
              placeholder="Subdomain"
              value={siteSubdomain}
              onChange={(e) => setSiteSubDomain(e.target.value)}
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
