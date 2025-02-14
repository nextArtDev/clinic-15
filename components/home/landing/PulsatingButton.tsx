'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = '#56C2D8',
  duration = '2s',
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        'text-primary-foreground relative text-center cursor-pointer flex justify-center items-center rounded-lg px-4 py-2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c5d4a3] via-[#56C2D8] to-[#FFF8DC]',
        className
      )}
      style={
        {
          '--pulse-color': pulseColor,
          '--duration': duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  )
}
