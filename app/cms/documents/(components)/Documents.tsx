import { FileText } from 'lucide-react';
import Link from 'next/link';
import DeleteDocument from '../../(components)/DeleteDocument';

export default async function Documents({ info }: any) {

  return (
    <Link href={`/cms/documents/${info?.document_id}`}>
      <div className='flex flex-col gap-2 border p-4 rounded hover:cursor-pointer hover:bg-gray-100'>
        <div className='p-8 border w-fit rounded'>
          <FileText className='w-[200px] h-[100px] text-blue-600' />
        </div>
        <div className='flex items-center justify-between w-full'>
          <p>{info?.title}</p>
          <div className='hover:cursor-pointer'>
            <DeleteDocument id={info?.document_id} />
          </div>
        </div>
      </div>
    </Link>
  )
}
