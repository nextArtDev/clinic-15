'use client'
import LogoLoader from '@/components/home/logo-loader'
import { motion } from 'framer-motion'

export default function RippleLoader() {
  // const rippleVariants = {
  //   start: {
  //     opacity: 1,
  //     scale: 0,
  //   },
  //   end: {
  //     opacity: 0,
  //     scale: 3,
  //   },
  // }

  // const rippleTransition = {
  //   duration: 2,
  //   ease: 'easeInOut',
  //   repeat: Infinity,
  //   repeatDelay: 1,
  // }

  return (
    <div className="flex w-full h-screen items-center justify-center from-[#56C2D8] via-[#59c7dd] to-[#9adae8]">
      <LogoLoader />
      {/* <div className="relative h-10 w-10">
        <motion.div
          className="absolute h-full w-full rounded-full bg-[#FFB6C1] opacity-0"
          variants={rippleVariants}
          initial="start"
          animate="end"
          transition={rippleTransition}
        ></motion.div>
        <motion.div
          className="absolute h-full w-full rounded-full bg-[#ADD8E6] opacity-0"
          variants={rippleVariants}
          initial="start"
          animate="end"
          transition={{ ...rippleTransition, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute h-full w-full rounded-full bg-[#FFF8DC] opacity-0"
          variants={rippleVariants}
          initial="start"
          animate="end"
          transition={{ ...rippleTransition, delay: 1 }}
        ></motion.div>
      </div> */}
    </div>
  )
}
