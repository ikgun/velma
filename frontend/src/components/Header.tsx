import { Link, useRouterState } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import ClerkUser from '../integrations/clerk/header-user'

export default function Header() {
  const { isSignedIn } = useUser()
  const location = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav className="bg-[#1f1f1f] text-white shadow-md shadow-gray-400 font-old sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto p-3 max-w-screen-xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 hover:bg-[#333333] px-2 py-1 rounded"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 w-6 h-6"
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

          <span className="text-3xl font-semibold">Velma</span>
        </Link>

        {/* Desktop Nav */}
        {isSignedIn && (
          <ul className="hidden md:flex flex-row items-center justify-center gap-2 text-lg font-medium ml-5">
            <li>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded hover:bg-[#333333] ${
                  location === '/dashboard' ? 'bg-[#333333]' : ''
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/logs"
                className={`px-3 py-2 rounded hover:bg-[#333333] ${
                  location === '/logs' ? 'bg-[#333333]' : ''
                }`}
              >
                Logs
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`px-3 py-2 rounded hover:bg-[#333333] ${
                  location === '/products' ? 'bg-[#333333]' : ''
                }`}
              >
                Products
              </Link>
            </li>
          </ul>
        )}

        {/* User on desktop */}
        <div className="hidden md:block ml-auto">
          <ClerkUser />
        </div>

        {!isSignedIn && (
          <div className="md:hidden ml-auto">
            <ClerkUser />
          </div>
        )}

        {isSignedIn && (
          <div className="md:hidden ml-auto">
            <div className="drawer drawer-end">
              <input
                id="mobile-drawer"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label htmlFor="mobile-drawer" className="drawer-button px-2">
                  <svg
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(180)matrix(1, 0, 0, 1, 0, 0)"
                    stroke="#ffffff"
                    className='w-8 h-8'
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="0.15"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75V13.25ZM5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM14.833 9.25C15.2472 9.25 15.583 8.91421 15.583 8.5C15.583 8.08579 15.2472 7.75 14.833 7.75V9.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM14.833 17.25C15.2472 17.25 15.583 16.9142 15.583 16.5C15.583 16.0858 15.2472 15.75 14.833 15.75V17.25ZM5.5 13.25H19.5V11.75H5.5V13.25ZM5.5 9.25H14.833V7.75H5.5V9.25ZM5.5 17.25H14.833V15.75H5.5V17.25Z"
                        fill="#ffffff"
                      ></path>{' '}
                    </g>
                  </svg>
                </label>
              </div>
              <div className="drawer-side z-50">
                <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
                <ul className="menu items-center justify-center text-lg w-40 min-h-full bg-[#1f1f1f] text-white space-y-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className={location === '/dashboard' ? 'bg-[#333333] rounded px-2 py-1' : ''}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logs"
                      className={location === '/logs' ? 'bg-[#333333] rounded px-2 py-1' : ''}
                    >
                      Logs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className={location === '/products' ? 'bg-[#333333] rounded px-2 py-1' : ''}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="pt-4">
                    <ClerkUser />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
