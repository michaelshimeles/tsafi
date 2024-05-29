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

export default async function SiteId({ params }: { params: { id: string } }) {
  const response = await readSiteId(params?.id)

  return (
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
        <DeleteSite site_id={params?.id}/>
        <Link href={`https://${response?.[0]?.site_subdomain}.${process.env.BASE_DOMAIN}`} target='_blank' className='flex justify-center items-center'>
          <Button size="sm" variant="outline">
            <ExternalLinkIcon className='w-4 h-4' />
          </Button>
        </Link>
      </div>
    </div>
  )
}
