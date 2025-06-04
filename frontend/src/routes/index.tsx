import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import homeimg from '../homeimg.png' // adjust path if needed


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
  <div className="min-h-screen bg-[#FFFFFF] font-old text-[#141414]">
    <div className="w-full">
      <img
        src={homeimg}
        alt="Velma Home"
        className="w-full h-[calc(100vh)] object-[11%_center] sm:object-[3%_center] xl:object-center xl:h-[calc(120vh)] object-cover"
      />
    </div>
    
  </div>
)

}
