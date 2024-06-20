import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { readSiteId } from "@/utils/functions/sites/read-site-id"
import SiteDashWrapper from "./_components/SiteDashWrapper"
import DeleteSite from "../_components/DeleteSite"
import ChangeSiteName from "../_components/ChangeSiteName"
import ChangeSiteDescription from "../_components/ChangeSiteDescription"
import ChangeSiteSubdomain from "../_components/ChangeSiteSubdomain"
import SetupCustomDomain from "../_components/SetupCustomDomain"

export default async function SettingsPage({ params }: { params: { site_id: string } }) {
  const response = await readSiteId(params?.site_id)

  return (
    <SiteDashWrapper site_id={params?.site_id}>
      <div className='flex flex-col justify-center items-start w-full'>
        <div className='flex justify-between w-full'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/cms/sites">Sites</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{response?.[0]?.site_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='flex gap-2'>
            <DeleteSite site_id={params?.site_id} />
            <Link href={`https://${response?.[0]?.site_subdomain}.${process.env.BASE_DOMAIN}`} target='_blank' className='flex justify-center items-center'>
              <Button size="sm" variant="outline">
                <ExternalLinkIcon className='w-4 h-4' />
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="general" className="w-full mt-[2rem]">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="w-full">
              <ChangeSiteName response={response} site_id={params?.site_id} />
              <ChangeSiteDescription response={response} site_id={params?.site_id} />
            </div>
          </TabsContent>
          <TabsContent value="domain">
            <div className="w-full">
              <ChangeSiteSubdomain response={response} site_id={params?.site_id} />
              <SetupCustomDomain response={response} site_id={params?.site_id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SiteDashWrapper>
  )
}
