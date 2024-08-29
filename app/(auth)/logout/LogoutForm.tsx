'use client'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/actions/auth/logout'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function LogoutForm({ children }: Props) {
  const router = useRouter()
  return (
    <form
      action={async () => {
        const logput = await logout()
        console.log('lg', logput)
        router.refresh()
      }}
    >
      <Button type="submit">{children}</Button>
    </form>
  )
}

export default LogoutForm
