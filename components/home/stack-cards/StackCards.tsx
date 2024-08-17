'use client'

import { useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Card from './Card'
import { projects } from './data'
import gsap from 'gsap/all'
import { rooms, special } from '@/constants'

export default function StackCards() {
  const lenisRef = useRef(null)
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    function update(time: any) {
      // @ts-ignore
      container.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  })

  return (
    <ReactLenis ref={lenisRef} autoRaf={false}>
      <section ref={container} className="relative">
        {rooms.map((room, i) => {
          const targetScale = 1 - (rooms.length - i) * 0.05
          return (
            <Card
              key={`p_${i}`}
              i={i}
              {...room}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </section>
    </ReactLenis>
  )
}
