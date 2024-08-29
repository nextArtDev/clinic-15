'use client'

import { useRef } from 'react'
import DoctorImage from '@/public/images/1.jpg'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import ImageEffect from './ImageEffect'
import { special } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { Doctor, Specialization } from '@prisma/client'
import { Badge } from '../ui/badge'
import Link from 'next/link'

interface SingleProps {
  item: Specialization & { images: { url: string }[] | null } & {
    doctors: (Doctor & { images: { url: string }[] | null })[] | null
  }
}
const Single = ({ item }: SingleProps) => {
  // Its container is image section, not the whole section, imageRef
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // the bigger numbers, the faster response to reference point (here img)
  // const sm = useTransform(scrollYProgress, [0, 1], [0, -50])
  // const md = useTransform(scrollYProgress, [0, 1], [0, 30])
  const lg = useTransform(scrollYProgress, [0, 1], [0, -350])

  const smScale = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  // const lgScale = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section>
      <div className="container flex items-center justify-center w-full h-full overflow-hidden">
        <Link
          href={`/specialities/${item.id}`}
          className="wrapper relative max-w-[1366px] m-auto flex items-center justify-center gap-12 "
        >
          <motion.div
            className="imageContainer  p-4  flex-1 m h-full  shrink-0"
            ref={ref}
            // style={{ y }}
          >
            {/* <img
              src={item.img}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className=""
            /> */}
            <ImageEffect
              imageSrc={item.images?.[0]?.url || '/images/parallax/0003.webp'}
            />
          </motion.div>
          <motion.div
            className="textContainer absolute inset-0 top-2 left-1/2 -translate-x-1/2   min-h-[600px] z-[1] text-center"
            // initial="hidden"
            // whileInView="visible"
            // variants={{
            //   visible: {
            //     transition: { staggerChildren: 0.4, delay: 0.4 },
            //   },
            // }}
            style={
              {
                // y: sm,
                // backgroundImage: item.images[0]?.url,
              }
            }
          >
            <motion.h2
              className="  text-2xl sub-title-color font-bold"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
            >
              {item.name}
            </motion.h2>
          </motion.div>
          <motion.div
            className={`z-[2] absolute w-full left-1/2 h-full top-3   -translate-x-1/2  border-none   cursor-pointer overflow-hidden   `}
          >
            <motion.article className="flex absolute bottom-4 left-1/2 -translate-x-1/2  gap-4 ">
              {item?.doctors?.map((doctor, index) => {
                return (
                  <motion.div
                    style={{
                      // x: index % 2 == 0 ? lg : md,
                      left:
                        index % 2 == 0
                          ? `${100 / index + 25}%`
                          : `${100 / index - 25}%`,

                      y: lg,
                      scale: smScale,
                    }}
                    initial="hidden"
                    whileInView="visible"
                    key={doctor.id}
                  >
                    <Link
                      href={`/doctors/${doctor.id}`}
                      className="flex flex-col items-center justify-center gap-0.5 "
                    >
                      <Avatar className={'h-32 w-32 border-4 border-white '}>
                        <AvatarImage
                          className="object-cover rounded-full "
                          src={doctor?.images?.[0]?.url || DoctorImage.src}
                          alt={doctor.name}
                        />
                        <AvatarFallback>{doctor.name}</AvatarFallback>
                      </Avatar>
                      <Badge className="custom-box-shadow backdrop-blur-md bg-white/30 ring-2 ring-white rounded-md text-sm text-center flex items-center justify-center">
                        دکتر {doctor.name}
                      </Badge>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.article>
          </motion.div>
        </Link>
      </div>
    </section>
  )
}

type SliderProps = {
  specializations: (Specialization & {
    images:
      | {
          url: string
        }[]
      | null
  } & {
    doctors: (Doctor & { images: { url: string }[] | null })[] | null
  })[]
}

const Slider = ({ specializations }: SliderProps) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // the line at the beginning is 100%: end end, and at the end is 0%
    offset: ['end end', 'start start'],
  })

  // Its like useTransform, but for spring behavior
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  })

  return (
    <div
      className="portfolio relative "
      ref={ref}
      style={{ position: 'relative' }}
    >
      <div className="progress z-30 sticky top-8 left-0  py-8 text-center text-primary text-xl font-semibold ">
        <h1 className="text-3xl md:text-5xl title-color mix-blend-multiply ">
          کلینیک‌ها
        </h1>
        <motion.div
          style={{ scaleX }}
          className="progressBar mt-3 rounded-full custom-box-shadow backdrop-blur-md bg-white/30 h-2.5   "
        ></motion.div>
      </div>
      {specializations.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Slider
