import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'

export default function HeaderUser() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="hover:cursor-pointer px-3 py-2 rounded transition-colors duration-200 ease-in-out hover:bg-[#333333]">
            Log in
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="hover:cursor-pointer px-3 py-2 rounded transition-colors duration-200 ease-in-out hover:bg-[#333333]">
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>
    </>
  )
}
