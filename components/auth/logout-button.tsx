import { logout } from '@/lib/actions/auth/logout'
import { usePathname } from 'next/navigation'
import { useFormState } from 'react-dom'
import { SubmitButton } from '../SubmitButton'
import { Button } from '../ui/button'
import { signOut } from '@/auth'

// or we can use import {signOut} from 'next-auth/react'
interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const path = usePathname()

  // const [logoutState, logoutAction] = useFormState(logout.bind(null, path), {
  //   errors: {},
  // })

  // const onClick = () => {
  //   logout()
  // }

  return (
    // <span onClick={onClick} className="cursor-pointer">
    //   {children}
    // </span>
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button
        type="submit"
        className="cursor-pointer bg-transparent border-none outline-none"
      >
        {children}
      </button>
    </form>
  )
}
