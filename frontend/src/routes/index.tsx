import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate({ to: '/dashboard' })
    }
  }, [isSignedIn, navigate])

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  return <div className="p-4">You're viewing the unsigned version</div>
}
