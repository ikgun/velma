import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import bgImage from '../background.png'
import LogsSection from '@/components/LogsSection'
import ProductsSection from '@/components/ProductsSection'
import { useGetAllLogs } from '@/hooks/log/useGetAllLogs'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser()

  const {
    data: logs = [],
    isLoading: logsAreLoading,
    isError,
  } = useGetAllLogs()

  const {
    data: products,
    isLoading: productsAreLoading,
    isError: errorLoadingProducts,
  } = useGetAllProducts()

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-old text-[#141414] px-4 text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-old text-[#141414] px-4 text-center">
        <p className="text-base sm:text-lg mb-4">Sign in to view this page</p>
      </div>
    )
  }

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center bg-opacity-80% min-h-screen flex flex-col font-old text-[#141414]"
    >
      <div className=" px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
        {/* Greeting */}
        <p className="text-shadow-lg/10 text-5xl mt-5 mb-3 sm:mt-0 sm:mb-0">
          Hello <span className=" font-bold">{user.firstName?.trim()}</span>,
        </p>

        {/* Logs Section */}
        {logsAreLoading ? (
          <div className="flex items-center gap-2">
            <p className="text-base sm:text-lg">Loading logs</p>
            <span className="loading loading-dots loading-sm sm:loading-md"></span>
          </div>
        ) : isError ? (
          <p className="text-base sm:text-lg">Failed to load logs</p>
        ) : (
          <LogsSection logs={logs} />
        )}

        {productsAreLoading ? (
          <div className="flex items-center gap-2">
            <p className="text-base sm:text-lg">Loading products</p>
            <span className="loading loading-dots loading-sm sm:loading-md"></span>
          </div>
        ) : errorLoadingProducts ? (
          <p className="text-base sm:text-lg">Failed to load products</p>
        ) : (
          <div className="">
            <ProductsSection products={products} />
          </div>
        )}
      </div>
    </div>
  )
}
