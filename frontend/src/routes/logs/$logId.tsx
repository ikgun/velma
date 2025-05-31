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
  return (
    <SignedIn>
      <div>Hello "/logs/$logId"!</div>
    </SignedIn>
  )
}
