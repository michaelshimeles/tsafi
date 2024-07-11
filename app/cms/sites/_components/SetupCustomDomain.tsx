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
import { changeSiteDomain } from '@/utils/actions/sites/settings/change-site-domain'

export default function SetupCustomDomain({ response, site_id }: {
  response: any,
  site_id: string
}) {
  const [siteCustomDomain, setSiteCustomDomain] = useState<any>(response?.[0]?.site_custom_domain || '')
  const [verificationRecords, setVerificationRecords] = useState<any>(null)

  const handleChangeSiteDomain = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await changeSiteDomain(site_id, siteCustomDomain)

      if (response?.error) {
        toast(response?.error?.message)
        return response
      }

      if (response?.message) {
        toast(response?.message)
        return response
      }

      toast("Site custom domain has been updated")
      setVerificationRecords(response.verificationRecords)

      return response
    } catch (error) {
      console.log('error', error)
      toast("Error occurred while trying to update site subdomain")

      return error
    }
  }

  console.log('verificationRecords', verificationRecords)
  return (
    <div className="w-[80%] mt-[1rem]">
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>
            The custom domain for your site.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleChangeSiteDomain}>
          <CardContent>
            <Input
              placeholder="yourdomain.com"
              value={siteCustomDomain}
              onChange={(e) => setSiteCustomDomain(e.target.value)}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
      {verificationRecords && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Domain Verification</CardTitle>
            <CardDescription>
              Add these records to your DNS provider to verify your domain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="font-bold">A Record:</h3>
              <p>Name: @</p>
              <p>Value: {verificationRecords?.domain}</p>
            </div>
            <div className="mt-2">
              <h3 className="font-bold">CNAME Record:</h3>
              <p>Name: www</p>
              <p>Value: {verificationRecords?.cname}</p>
            </div>
            {verificationRecords?.txt && (
              <div className="mt-2">
                <h3 className="font-bold">TXT Record:</h3>
                <p>Name: @</p>
                <p>Value: {verificationRecords?.txt}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}