import { FileText, Timer } from 'lucide-react';
import Link from 'next/link';
import { Document } from '@/utils/types';

export default async function Documents({ info, site_id }: { info: Document, site_id: string }) {

  return (
    <Link href={`/cms/sites/${site_id}/documents/${info?.document_id}`}>
      <article
        className="flex flex-col space-y-2 p-4 rounded-md border border-zinc-100 dark:border-zinc-900 min-w-[300px] hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
      >
        <div className='flex flex-col w-full justify-between items-start gap-3'>
          <FileText className=' text-white w-7 h-7 bg-blue-600 rounded p-1' />
          <h2 className={`font-bold`}>{info?.title}</h2>
          <div className="text-xs text-muted-foreground">
            <span className='flex justify-center items-center gap-1'><Timer className='w-4 h-4' /> {new Date(info?.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}, {new Date(info?.created_at!)?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
