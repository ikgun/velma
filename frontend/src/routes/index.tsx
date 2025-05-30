import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Youre viewing the unsigned version</div>
  }
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/dashboard' })
  }, [navigate])
}
