import { Link, createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import type { Log } from '@/types'
import { useGetAllLogs } from '@/hooks/log/useGetAllLogs'
import LogCard from '@/components/LogCard'

export const Route = createFileRoute('/logs/')({
  component: LogsPage,
})

function LogsPage() {
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetAllLogs()

  if (!isLoaded) {
    return <div className="p-4">Loading user...</div>
        <span className="loading loading-dots loading-xl"></span>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-300 px-4">
        <p className="text-lg mb-4">Loading logs...</p>
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-300 px-4 text-center">
        <p className="text-lg mb-4">
          {error.message === 'Failed to fetch'
            ? 'Failed to fetch logs'
            : error.message}
        </p>
      </div>
    )
  }
            <span className="loading loading-dots loading-xl"></span>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Log History</h1>
        <Link
          to="/logs/new"
          className="text-blue-500 hover:underline font-medium"
        >
          Add new log
        </Link>
      </div>

      {data && data.length === 0 ? (
        <p className="text-center text-gray-400">No logs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 place-items-center">
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
  )
}
