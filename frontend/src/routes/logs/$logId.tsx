import { createFileRoute, useParams } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
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

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-lg text-gray-600 text-center">Loading log...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-lg text-red-500 text-center">
          Error: {error.message}
        </p>
      </div>
    )
  }

  return (
    <SignedIn>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#252422] mb-4">
          {data.dateTime}
        </h1>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Products used
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

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Routine type
          </h2>
          <p className="text-gray-600 text-sm ">{data.routineType}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Notes
          </h2>
          <p className="text-gray-600 text-sm ">{!(data.notes) ? "Nothing here..." : data.notes}</p>
        </section>

        <button
          className="mt-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition"
          onClick={() => setShowEditLog(true)}
          type="button"
        >
          Edit log
        </button>

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
    </SignedIn>
  )
}
