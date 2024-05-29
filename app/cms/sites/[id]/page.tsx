import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { readSiteId } from '@/utils/actions/sites/read-site-id'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import DeleteSite from "../_components/DeleteSite"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangeSiteName from "../_components/ChangeSiteName"
import ChangeSiteDescription from "../_components/ChangeSiteDescription"
import ChangeSiteSubdomain from "../_components/ChangeSiteSubdomain"

export default async function SiteId({ params }: { params: { id: string } }) {
  const response = await readSiteId(params?.id)

  return (
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
          <DeleteSite site_id={params?.id} />
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
            <ChangeSiteName response={response} site_id={params?.id} />
            <ChangeSiteDescription response={response} site_id={params?.id} />
          </div>
        </TabsContent>
        <TabsContent value="domain">
          <div className="w-full">
            <ChangeSiteSubdomain response={response} site_id={params?.id}/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
