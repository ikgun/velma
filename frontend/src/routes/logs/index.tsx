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
  return (
    <SignedIn>
      <div>this is where the log history is</div>
      <div className="px-2 font-bold">
        <Link to="/logs/new">Add new log</Link>
      </div>
    </SignedIn>
  )
}
