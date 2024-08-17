'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import SvgShadow from '../SvgShadow'

interface CardProps {
  i: number
  title: string
  items: { id: string; text: string }[]
  src: string
  // url?: string
  // color: string
  progress: MotionValue<number>
  range: number[]
  targetScale: number
}
const Card = ({
  i,
  title,
  items,
  src,
  // url,
  // color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  //   const imageRotate = useTransform(scrollYProgress, [0, 1], [360, 0])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className={cn(styles.cardContainer, '')}>
      <motion.div
        style={{
          // backgroundImage: `url(/parallax-images/${src})`,
          // backgroundBlendMode: 'exclusion',
          // backgroundColor: color,
          mixBlendMode: 'multiply',
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={cn(
          styles.card,
          "overflow-hidden relative w-full after:-z-10 after:absolute after:content-[''] after:h-full after:top-0 after:w-full after:left-0 after:opacity-70",
          i % 2 ? 'gradient-base-r' : 'gradient-base'
        )}
      >
        {/* <div className={`absolute w-full h-20 bottom-0 left-0 `}>
          <svg
            id="wave"
            style={{ transform: 'rotate(0deg)', transition: '0.3s' }}
            viewBox="0 0 1440 260"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stop-color="#FFB6C1" offset="0%" />
                <stop stop-color="#add8e6" offset="100%" />
              </linearGradient>
            </defs>
            <path
              style={{ transform: 'translate(0, 0px)', opacity: '1' }}
              fill="url(#sw-gradient-0)"
              d="M0,156L80,130C160,104,320,52,480,60.7C640,69,800,139,960,138.7C1120,139,1280,69,1440,52C1600,35,1760,69,1920,69.3C2080,69,2240,35,2400,56.3C2560,78,2720,156,2880,195C3040,234,3200,234,3360,221C3520,208,3680,182,3840,173.3C4000,165,4160,173,4320,186.3C4480,199,4640,217,4800,216.7C4960,217,5120,199,5280,195C5440,191,5600,199,5760,169C5920,139,6080,69,6240,39C6400,9,6560,17,6720,56.3C6880,95,7040,165,7200,199.3C7360,234,7520,234,7680,208C7840,182,8000,130,8160,91C8320,52,8480,26,8640,21.7C8800,17,8960,35,9120,47.7C9280,61,9440,69,9600,60.7C9760,52,9920,26,10080,17.3C10240,9,10400,17,10560,52C10720,87,10880,147,11040,147.3C11200,147,11360,87,11440,56.3L11520,26L11520,260L11440,260C11360,260,11200,260,11040,260C10880,260,10720,260,10560,260C10400,260,10240,260,10080,260C9920,260,9760,260,9600,260C9440,260,9280,260,9120,260C8960,260,8800,260,8640,260C8480,260,8320,260,8160,260C8000,260,7840,260,7680,260C7520,260,7360,260,7200,260C7040,260,6880,260,6720,260C6560,260,6400,260,6240,260C6080,260,5920,260,5760,260C5600,260,5440,260,5280,260C5120,260,4960,260,4800,260C4640,260,4480,260,4320,260C4160,260,4000,260,3840,260C3680,260,3520,260,3360,260C3200,260,3040,260,2880,260C2720,260,2560,260,2400,260C2240,260,2080,260,1920,260C1760,260,1600,260,1440,260C1280,260,1120,260,960,260C800,260,640,260,480,260C320,260,160,260,80,260L0,260Z"
            />
            <defs>
              <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
                <stop stop-color="#FFB6C1" offset="0%" />
                <stop stop-color="#add8e6" offset="100%" />
              </linearGradient>
            </defs>
            <path
              style={{ transform: 'translate(0, 50px)', opacity: '0.9' }}
              fill="url(#sw-gradient-1)"
              d="M0,52L80,43.3C160,35,320,17,480,26C640,35,800,69,960,108.3C1120,147,1280,191,1440,208C1600,225,1760,217,1920,186.3C2080,156,2240,104,2400,108.3C2560,113,2720,173,2880,169C3040,165,3200,95,3360,65C3520,35,3680,43,3840,78C4000,113,4160,173,4320,169C4480,165,4640,95,4800,95.3C4960,95,5120,165,5280,190.7C5440,217,5600,199,5760,177.7C5920,156,6080,130,6240,130C6400,130,6560,156,6720,169C6880,182,7040,182,7200,160.3C7360,139,7520,95,7680,99.7C7840,104,8000,156,8160,156C8320,156,8480,104,8640,108.3C8800,113,8960,173,9120,195C9280,217,9440,199,9600,169C9760,139,9920,95,10080,69.3C10240,43,10400,35,10560,47.7C10720,61,10880,95,11040,99.7C11200,104,11360,78,11440,65L11520,52L11520,260L11440,260C11360,260,11200,260,11040,260C10880,260,10720,260,10560,260C10400,260,10240,260,10080,260C9920,260,9760,260,9600,260C9440,260,9280,260,9120,260C8960,260,8800,260,8640,260C8480,260,8320,260,8160,260C8000,260,7840,260,7680,260C7520,260,7360,260,7200,260C7040,260,6880,260,6720,260C6560,260,6400,260,6240,260C6080,260,5920,260,5760,260C5600,260,5440,260,5280,260C5120,260,4960,260,4800,260C4640,260,4480,260,4320,260C4160,260,4000,260,3840,260C3680,260,3520,260,3360,260C3200,260,3040,260,2880,260C2720,260,2560,260,2400,260C2240,260,2080,260,1920,260C1760,260,1600,260,1440,260C1280,260,1120,260,960,260C800,260,640,260,480,260C320,260,160,260,80,260L0,260Z"
            />
          </svg>
        </div> */}
        <SvgShadow />
        {/* <h2 className="text-primary text-xl md:text-2xl  "></h2> */}
        <h2 className="text-2xl pb-3 text-center font-bold text-pretty title-color mix-blend-exclusion">
          {' '}
          {title}
        </h2>
        <div
          className={cn(styles.body, 'relative flex flex-col w-full h-full')}
        >
          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image fill src={src} alt={title} />
              <div className="absolute inset-0 gradient-base opacity-30 backdrop-blur-sm z-[1]"></div>
            </motion.div>
          </div>
          <div
            className={cn(
              styles.description,
              'text-lg font-semibold  text-right'
            )}
          >
            <motion.ul className="absolute top-16 left-1/2 w-full space-y-4 -translate-x-1/2 flex flex-col  justify-around items-center text-justify z-[2]">
              {items?.map((item) => (
                <motion.li
                  whileInView={{ opacity: 1 }}
                  transition={{ delayChildren: 1.5, staggerChildren: 0.5 }}
                  key={item.id}
                  className="opacity-15"
                >
                  <Badge className="px-2 py-1 flex gap-1 gradient-base backdrop-blur-md  rounded-full text-sm md:text-base">
                    <CheckCircle
                      className="text-primary"
                      size={16}
                      strokeWidth={2}
                    />
                    <p>{item.text}</p>
                  </Badge>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card
