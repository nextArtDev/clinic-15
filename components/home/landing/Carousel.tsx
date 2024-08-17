'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Slider } from '@/constants'
import Image from 'next/image'

type PropType = {
  slides: Slider[]
  options?: EmblaOptionsType
}
const DELAY = 3

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, axis: 'y' }, [
    //@ts-ignore
    Autoplay({
      delay: DELAY * 1000,
      // stopOnInteraction: false,
      // stopOnFocusIn: false,
    }),
  ])

  return (
    <section className="embla pointer-events-none ">
      <div className="relative embla__viewport" ref={emblaRef}>
        <div className=" embla__container  ">
          {slides.map((slide) => (
            <div className=" embla__slide " key={slide.id}>
              <div className=" relative embla__slide__number">
                <motion.div
                  initial={{ height: 'auto' }}
                  whileInView={{ height: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 gradient-base opacity-40 backdrop-blur-sm z-[1]"
                ></motion.div>
                <Image
                  src={slide.imageUrl}
                  alt={slide.name}
                  fill
                  className="object-cover"
                />
                <motion.div className="absolute inset-0 bg-blue-300/10 backdrop-blur-[2.5px] z-[2]"></motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* <motion.div
          className="bg-gray-500 origin-top absolute top-1/2 -translate-y-1/2 right-12 w-[0.1rem] rounded-full "
          initial={{ height: '50px' }}
          whileInView={{ height: 0 }}
          transition={{ duration: DELAY, repeat: Infinity }}
        /> */}
        <svg
          width="14"
          height="163"
          viewBox="0 0 25 163"
          fill="none"
          className={`mix-blend-hard-light animate-pulse  absolute top-[85%] -translate-y-1/2 left-4`}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            strokeWidth={0.8}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: DELAY, repeat: Infinity }}
            d="M16 0V29.3034L10 41.2079L19.5 54.0281L1 68.6798L24 88.8258L12.5 100.73L16 115.382V163"
            stroke="#ff0808"
          />
        </svg>
      </div>
    </section>
  )
}

export default Carousel

//  <svg width="450px" height="450px" viewBox="0 0 32.666 32.666">
//             <motion.path
//               strokeWidth={0.2}
//               fill="none"
//               initial={{ pathLength: 0 }}
//               //   whileInView doesn't work with "path"
//               animate={isInView && { pathLength: 1 }}
//               transition={{ duration: 3 }}
