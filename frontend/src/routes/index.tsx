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
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#FFFFFF] font-old text-[#141414]">
      <div className="m-10">
        <div className="flex items-center justify-center text-center min-h-[300px]">
          <p className="text-lg">
            You're viewing the unsigned version, please login to start using
            Velma!
          </p>
        </div>
      </div>
    </div>
  )
}
