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
import { toast } from 'sonner'
import { changeSiteSubdomain } from '@/utils/actions/sites/settings/change-site-subdomain'

// Define a custom validation regex for subdomain
const subdomainRegex = /^[a-zA-Z0-9-]+$/;

export default function ChangeSiteSubdomain({ response, site_id }: {
  response: any,
  site_id: string
}) {
  const [siteSubdomain, setSiteSubDomain] = useState(response?.[0]?.site_subdomain || '')

  const handleChangeSiteDomain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate the subdomain
    if (!subdomainRegex.test(siteSubdomain)) {
      toast("Subdomain must only contain alphanumeric characters or hyphens, and must not contain '.', '#', or '$'")
      setSiteSubDomain(response?.[0]?.site_subdomain)
      return
    }

    if (siteSubdomain.length < 1 || siteSubdomain.length > 63) {
      toast("Subdomain must be between 1 and 63 characters")
      setSiteSubDomain(response?.[0]?.site_subdomain)
      return
    }

    try {
      const response = await changeSiteSubdomain(site_id, siteSubdomain)
      if (response?.error) {
        toast(response?.error?.message)
        return response
      }

      if (response?.message) {
        toast(response?.message)
        return response
      }

      toast("Site subdomain has been updated")

      return response
    } catch (error) {
      console.log('error', error)
      toast("Error occurred while trying to update site subdomain")

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
