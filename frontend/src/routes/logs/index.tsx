/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link, createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import bgImage from '../../background.png'
import type { Product } from '@/types'
import { useGetAllLogs } from '@/hooks/log/useGetAllLogs'
import LogCard from '@/components/LogCard'
import ProductFilter from '@/components/ProductFilter'
import CalendarComp from '@/components/CalendarComp'

export const Route = createFileRoute('/logs/')({
  component: LogsPage,
})

function LogsPage() {
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetAllLogs()
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])

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

  const sortedLogs = [...(data || [])].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
  )

  const filteredLogs =
    selectedProducts.length === 0
      ? sortedLogs
      : sortedLogs.filter((log) =>
          selectedProducts.every((sp) =>
            log.productsUsed.some((p: Product) => p.id === sp.id),
          ),
        )

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center bg-opacity-80% min-h-screen flex flex-col font-old text-[#141414]"
    >
      <div className="m-10">
        <h1 className="text-2xl font-semibold mb-2">Your Log History</h1>

        {!error && !isPending && sortedLogs?.length > 0 && (
          <p className="mb-4 text-gray-900 text-sm">
            {viewMode === 'calendar'
              ? 'Click on a day on the calendar to see your logs.'
              : 'Viewing all logs.'}
          </p>
        )}

        {isPending && (
          <div className="flex gap-2 items-center justify-center text-center min-h-[300px]">
            <p className="text-lg">Loading logs</p>
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <p className="text-lg">
              {error.message === 'Failed to fetch'
                ? 'Failed to load logs'
                : error.message}
            </p>
          </div>
        )}

        {/* Show Add button only when there's no error */}
        {!error && !isPending && (
          <div className="mb-5 mt-4">
            <Link
              to="/logs/new"
              className="bg-[#351C24]
                    hover:bg-[#502A36] text-white px-4 py-3 rounded transition-colors duration-200"
            >
              + Add New Log
            </Link>
          </div>
        )}

        {!error && !isPending && sortedLogs?.length === 0 && (
          <p className="text-lg flex items-center justify-center text-center min-h-[300px] text-gray-500">
            You have no logs yet. Start logging to track your progress.
          </p>
        )}

        {!error && !isPending && sortedLogs?.length > 0 && (
          <>
            <div className=" flex flex-row text-sm mt-4 text-center mb-4">
              <button
                className={`hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 px-2 py-1 rounded ${
                  viewMode === 'list' ? 'bg-gray-100 ' : 'bg-transparent'
                }`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <p className="text-xl font-bold">|</p>
              <button
                className={`hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 px-2 py-1 rounded ${
                  viewMode === 'calendar' ? 'bg-gray-100' : 'bg-transparent'
                }`}
                onClick={() => setViewMode('calendar')}
              >
                Calendar
              </button>
            </div>

            {viewMode === 'calendar' ? (
              <div>
                {/* Your existing Calendar code here */}
                <CalendarComp
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <ProductFilter
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />

                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => <LogCard key={log.id} {...log} />)
                ) : (
                  <p className="text-gray-100 font-bold text-center">
                    No logs found for selected products.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
