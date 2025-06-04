/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link, createFileRoute } from '@tanstack/react-router'
import { enUS } from 'date-fns/locale'
import { format, isSameDay } from 'date-fns'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import type { Log } from '@/types'
import { useGetAllLogs } from '@/hooks/log/useGetAllLogs'
import LogCard from '@/components/LogCard'

export const Route = createFileRoute('/logs/')({
  component: LogsPage,
})

function LogsPage() {
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetAllLogs()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [hasClicked, setHasClicked] = useState(false)

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
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] font-old text-[#141414]">
      <div className="m-10">
        <h1 className="text-2xl font-semibold mb-5">Your Log History</h1>

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
                ? 'Failed to fetch logs'
                : error.message}
            </p>
          </div>
        )}

        {/* Show Add button only when there's no error */}
        {!error && !isPending && (
          <div className="mb-5">
            <Link
              to="/logs/new"
              className="bg-[#141414] text-white px-4 py-3 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              + Add New Log
            </Link>
          </div>
        )}

        {!error && data && data.length === 0 ? (
          <p className="text-gray-500 mt-5">
            You have no logs yet. Start logging to track your progress.
          </p>
        ) : (
          <div className="space-y-4">
            {data?.map((log: Log) => (
              <LogCard
                key={log.id}
                id={log.id}
                dateTime={log.dateTime}
                notes={log.notes}
                productsUsed={log.productsUsed}
                routineType={log.routineType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
