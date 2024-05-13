import { FileText, Timer } from 'lucide-react';
import Link from 'next/link';
import { Document } from '@/utils/types';

export default async function Documents({ info }: { info: Document }) {

  return (
    <Link href={`/cms/documents/${info?.document_id}`}>
      <article
        className="flex flex-col space-y-2 p-4 rounded-md border hover:border-gray-400 min-w-[300px]"
      >
        <div className='flex flex-col w-full justify-between items-start gap-3'>
          <FileText className=' text-blue-600 w-[5] h-[5]' />
          <h2 className={`font-bold`}>{info?.title}</h2>
          <div className="text-xs text-muted-foreground">
            <span className='flex justify-center items-center gap-1'><Timer className='w-4 h-4' /> {new Date(info?.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}, {new Date(info?.created_at!)?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
