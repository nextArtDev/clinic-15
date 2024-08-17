'use client'

import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState, useRef } from 'react'

import { FC } from 'react'

interface StickyNavProps {
  children: React.ReactNode
  className?: string
  isTop?: boolean
}

const StickyNav: FC<StickyNavProps> = ({
  children,
  className,
  isTop = false,
}) => {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 180) {
      setHidden(difference > 0)
      lastYRef.current = y
    }
  })

  return (
    <motion.div
      animate={hidden ? 'hidden' : 'visible'}
      initial="visible"
      whileHover={hidden ? 'peeking' : 'visible'}
      // added for mobile
      //   whileTap={hidden ? 'peeking' : 'visible'}
      onFocusCapture={hidden ? () => setHidden(false) : undefined}
      variants={
        {
          visible: { y: isTop ? '0%' : '0%' },
          hidden: { y: isTop ? '-90%' : '90%' },
          peeking: { y: '0%', cursor: 'pointer' },
        } as Variants
      }
      transition={{ duration: 0.2 }}
      //   className=" fixed top-0 z-10 flex w-full justify-center pt-3"
      className={`fixed ${
        isTop ? 'top-0 pt-3' : '-bottom-0 pb-0.5'
      } z-10 flex w-full justify-center `}
    >
      <nav className={`min-w-[180px] max-w-full  ${className} `}>
        {children}
      </nav>
    </motion.div>
  )
}

export default StickyNav
