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
    return <div className="p-4">Loading...</div>
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

  return (
    <SignedIn>
      <div>this is where the log history is</div>
      <div className="px-2 font-bold">
        <Link to="/logs/new">Add new log</Link>
      </div>
    </SignedIn>
  )
}
