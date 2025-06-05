import { createFileRoute, useParams } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import bgImage from '../../background.png'
import type { Product } from '@/types'
import { useGetLog } from '@/hooks/log/useGetLog'
import EditLogModal from '@/components/EditLogModal'

export const Route = createFileRoute('/logs/$logId')({
  component: LogPage,
})

function LogPage() {
  const { logId } = useParams({ from: '/logs/$logId' })
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetLog(logId)
  const [showEditLog, setShowEditLog] = useState(false)

  function formatCustomDate(dateStr: string) {
    const date = new Date(dateStr)
    return format(date, "EEEE, do 'of' MMMM 'at' HH:mm", { locale: enUS })
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <p className="text-lg mb-4">Sign in to view this page</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        Loading log <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <p className="text-lg">{error.message}</p>
      </div>
    )
  }

  return (
    <SignedIn>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center bg-opacity-80% min-h-screen flex flex-col font-old text-[#141414]"
      >
        <div className="max-w-3xl m-10 sm:min-w-xl mx-auto space-y-6 shadow-lg p-4 sm:p-6 rounded-lg bg-[#F5F5F5]">
          <h1 className="text-2xl font-semibold mb-1">Log Entry</h1>

          <p className="mb-8 text-gray-700 text-sm">
            Created at {formatCustomDate(data.dateTime)}
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Products Used
            </h2>
            {data.productsUsed && data.productsUsed.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {data.productsUsed.map((p: Product) => (
                  <li key={p.id}>{p.name.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">
                There are no products in this log!
              </p>
            )}
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Routine Type
            </h2>
            <p className="text-gray-600 text-sm">{data.routineType}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Notes</h2>
            <p className="text-gray-600 text-sm">
              {data.notes ? data.notes : 'Nothing here...'}
            </p>
          </section>

          <div className="flex justify-end">
            <button
              className="bg-[#351C24] hover:bg-[#502A36] text-white px-5 py-2 rounded hover:cursor-pointer transition-colors"
              onClick={() => setShowEditLog(true)}
              type="button"
            >
              Edit log
            </button>
          </div>

          {showEditLog && (
            <EditLogModal
              id={logId}
              oldDateTime={data.dateTime}
              oldRoutineType={data.routineType}
              oldProductsUsed={data.productsUsed}
              oldNotes={data.notes}
              onClose={() => setShowEditLog(false)}
            />
          )}
        </div>
      </div>
    </SignedIn>
  )
}
