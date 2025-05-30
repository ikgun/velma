import { Link } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import ClerkHeader from '../integrations/clerk/header-user'

export default function Header() {
  const { isSignedIn } = useUser()
  const homeOrDash = isSignedIn ? 'Dashboard' : 'Home'
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <h1 className='px-2 font-bold'>LOGO </h1>
        <div className="px-2 font-bold">
          <Link to="/">{homeOrDash}</Link>
        </div>

        {isSignedIn ? (
          <>
            <div className="px-2 font-bold">
              <Link to="/logs">Logs</Link>
            </div>
            <div className="px-2 font-bold">
              <Link to="/products">Products</Link>
            </div>
          </>
        ) : null}
      </nav>

      <div>
        <ClerkHeader />
      </div>
    </header>
  )
}
