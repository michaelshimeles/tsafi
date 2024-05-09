import React from 'react'
import Documents from './(components)/Documents'
import { getAllDocuments } from '@/utils/actions/articles/get-all-documents'
import CreateDocument from '../(components)/CreateDocument'

export default async function DocumentsPage() {

  const response = await getAllDocuments()


  return (
    <div className='flex flex-col gap-3'>
      <div className="flex justify-end">
        <CreateDocument />
      </div>
      <div className='flex justify-start flex-wrap items-center gap-3'>
        {response?.map((info: any) => (
          <Documents key={info?.id} info={info} />
        ))}
      </div>
    </div>
  )
}
