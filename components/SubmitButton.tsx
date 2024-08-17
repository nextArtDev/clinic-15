'use client'

import { ReactNode } from 'react'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './ui/button'

interface SubmitButtonProps extends ButtonProps {
  children: ReactNode
  className?: string
}
export const SubmitButton = ({
  children,
  className,
  variant,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      variant={variant}
      className={className}
      disabled={pending}
      type="submit"
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  )
}
