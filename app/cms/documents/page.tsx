import { getAllDocuments } from '@/utils/functions/article/get-all-documents'
import CreateDocument from '../(components)/CreateDocument'
import Documents from './(components)/Documents'

export default async function DocumentsPage() {

  const response = await getAllDocuments()

  return (
    <div className='flex flex-col gap-3'>
      <div className="flex justify-end">
        <CreateDocument />
      </div>
      <div className='flex justify-start flex-wrap items-center gap-3'>
        {response?.length > 0 ? response?.map((info: any) => (
          <Documents key={info?.id} info={info} />
        )) :
          <main className="flex flex-col gap-2 lg:gap-2 min-h-[80vh] w-full">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no documents
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Documents will show here once you&apos;ve created documents
                </p>
                <CreateDocument />
              </div>
            </div>
          </main>
        }
      </div>
    </div>
  )
}
