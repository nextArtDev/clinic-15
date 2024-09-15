'use client'
import { motion } from 'framer-motion'
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
    // className="animate-fade-in [--animation-delay:1300ms] opacity-0"
    // initial={{ y: -300, opacity: 0 }}
    // animate={{ y: 0, opacity: 1 }}
    // transition={{ ease: 'easeInOut', duration: 0.75 }}
    >
      {children}
    </div>
  )
}
