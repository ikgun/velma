import { Link } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import ClerkHeader from '../integrations/clerk/header-user'

export default function Header() {
  const { isSignedIn } = useUser()
  const homeOrDash = isSignedIn ? 'Dashboard' : 'Home'
  return (
    <nav className="bg-[#1f1f1f] text-white shadow-sm px-4 py-4 font-old sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto p-3 max-w-screen-xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:bg-[#333333] px-2 py-1 rounded"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <polygon points="396.31 32 264 32 348.19 144.26 396.31 32" />
            <polygon points="115.69 32 163.81 144.26 248 32 115.69 32" />
            <polygon points="256 74.67 192 160 320 160 256 74.67" />
            <polygon points="422.95 51.06 376.26 160 488 160 422.95 51.06" />
            <polygon points="89.05 51.06 23 160 135.74 160 89.05 51.06" />
            <polygon points="146.68 192 24 192 246.8 480 247.33 480 146.68 192" />
            <polygon points="365.32 192 264.67 480 265.2 480 488 192 365.32 192" />
            <polygon points="329.39 192 182.61 192 256 400 329.39 192" />
          </svg>
          <span className="text-xl font-semibold">Velma</span>
        </Link>
        {/* Desktop Nav */}
        {isSignedIn && (
          <ul className="hidden md:flex flex-row items-center justify-center gap-2 text-sm font-medium ml-5">
            <li>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded hover:bg-[#333333]"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/logs" className="px-3 py-2 rounded hover:bg-[#333333]">
                Logs
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="px-3 py-2 rounded hover:bg-[#333333]"
              >
                Products
              </Link>
            </li>
          </ul>
        )}
  )
}
