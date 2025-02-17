'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = '#FFF8DC',
  duration = '2s',
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        'text-primary-foreground relative text-center cursor-pointer flex justify-center items-center rounded-lg px-4 py-2 ',
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
      <div className="relative z-10">
        {children}
        <figure className="relative text-center w-8 h-8 mx-auto">
          <Image
            fill
            src={'/icons/booking-icon.png'}
            alt="booking icon"
            className="object-contain opacity-90  rounded-md "
          />
        </figure>
      </div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-md bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  )
}
