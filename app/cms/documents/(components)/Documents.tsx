import { FileText } from 'lucide-react';
import Link from 'next/link';

export default async function Documents({ info }: any) {

  return (
    <Link href={`/cms/documents/${info?.document_id}`}>
      <div className='flex flex-col gap-2 border p-4 rounded hover:cursor-pointer hover:bg-gray-100 min-h-[300px] min-w-[250px]'>
        <div className='flex p-8 border w-full h-full justify-center items-center rounded min-h-[250px]'>
          <FileText className=' text-blue-600 w-[70px] h-[70px]' />
        </div>
        <div className='flex items-center justify-between w-full'>
          <p>{info?.title}</p>
        </div>
        <p className='text-xs'>{new Date(info?.created_at).toLocaleDateString()}</p>
      </div>
    </Link>
  )
}
