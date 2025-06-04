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

  // Filter logs by selected day
  const logsForSelectedDay = sortedLogs?.filter((log: Log) =>
    selectedDate
      ? isSameDay(
          new Date(log.dateTime).setHours(0, 0, 0, 0),
          new Date(selectedDate).setHours(0, 0, 0, 0),
        )
      : false,
  )

  function formatCustomDate(dateStr: string) {
    const date = new Date(dateStr)
    return format(date, "EEEE, do 'of' MMMM", { locale: enUS })
  }

  const d = selectedDate?.toDateString()

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

        {!error && sortedLogs && sortedLogs.length === 0 ? (
          <p className="text-gray-500 mt-5">
            You have no logs yet. Start logging to track your progress.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Calendar
              view="month"
              maxDetail="month"
              minDetail="month"
              prev2Label={null}
              next2Label={null}
              prevLabel={
                <span className="p-1 rounded-2xl hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-xl font-bold mr-3">
                  {'←'}
                </span>
              }
              nextLabel={
                <span className="p-1 rounded-2xl hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-xl font-bold ml-3 ">
                  {'→'}
                </span>
              }
              onChange={(date) => {
                setSelectedDate(date as Date)
                setHasClicked(true)
              }}
              value={selectedDate}
              navigationLabel={({ date, label, locale, view }) => {
                return (
                  <div className="text-lg sm:text-xl font-bold uppercase mt-5 mb-6">
                    {date.toLocaleDateString(locale, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                )
              }}
              tileClassName={({ date, view }) => {
                if (view !== 'month') return ''
                const hasLog = sortedLogs?.some((log: Log) =>
                  isSameDay(
                    new Date(log.dateTime).setHours(0, 0, 0, 0),
                    new Date(date).setHours(0, 0, 0, 0),
                  ),
                )
                return `hover:cursor-pointer hover:bg-gray-200 border transition-colors duration-200 border-black h-16 w-16 sm:h-20 sm:w-20
 flex items-center justify-center ${hasLog ? 'relative' : ''}`
              }}
              tileContent={({ date, view }) => {
                if (view !== 'month') return null

                const logsOnDate = data?.filter((log: Log) =>
                  isSameDay(new Date(log.dateTime), date),
                )

                if (!logsOnDate || logsOnDate.length === 0) return null

                return (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#E59E8B] text-white text-xs text-center p-1 rounded-2xl">
                      {logsOnDate.length}
                    </span>
                  </div>
                )
              }}
              className="my-5 text-center"
            />

            {hasClicked &&
              (logsForSelectedDay && logsForSelectedDay.length > 0 ? (
                <div className="mt-6 space-y-4">
                  <h2 className="text-lg font-semibold">
                    Logs on {formatCustomDate(d)}
                  </h2>
                  {logsForSelectedDay.map((log: Log) => (
                    <LogCard key={log.id} {...log} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-6 text-center">
                  No logs for this day.
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
