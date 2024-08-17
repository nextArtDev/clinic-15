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

const items = [
  {
    id: 1,
    title: 'React Commerce',
    img: '/images/parallax/0015.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 2,
    title: 'Next.js Blog',
    img: '/images/parallax/0016.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 3,
    title: 'Vanilla JS App',
    img: '/images/parallax/0014.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 4,
    title: 'Music App',
    img: '/images/parallax/0013.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
]

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
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50])
  const md = useTransform(scrollYProgress, [0, 1], [0, 30])
  const lg = useTransform(scrollYProgress, [0, 1], [0, -150])

  const smScale = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const lgScale = useTransform(scrollYProgress, [0, 1], [1, 0])

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
            {/* <img
              src={item.img}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className=""
            /> */}
          </motion.div>
          <motion.div
            className="textContainer absolute inset-0 top-2 left-1/2 -translate-x-1/2   min-h-[600px] z-[1] text-center"
            initial="hidden"
            whileInView="visible"
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
              className="  text-2xl text-primary font-bold"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
            >
              {item.name}
            </motion.h2>
            {/* <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="opacity-0 scale-0 text-muted-foreground text-lg "
              style={{ y: y0 }}
            >
              {item.description}
            </motion.p> */}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            // variants={{
            //   hidden: { opacity: 0 },
            //   visible: { opacity: 1 },
            // }}
            className={`z-[2] absolute w-fit h-fit bottom-3 left-1/2  -translate-x-1/2  border-none   cursor-pointer overflow-hidden   `}
            style={{
              x: lg,

              y: sm,
              scale: smScale,
            }}
          >
            <motion.article className="flex   gap-4 ">
              {item?.doctors?.map((doctor) => {
                return (
                  <Link
                    href={`/doctors/${doctor.id}`}
                    key={doctor.id}
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
                    <Badge className="gradient-base ring-2 ring-white rounded-full text-sm text-center flex items-center justify-center">
                      دکتر {doctor.name}
                    </Badge>
                  </Link>
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
        <h1 className="text-2xl title-color mix-blend-multiply ">کلینیک‌ها</h1>
        <motion.div
          style={{ scaleX }}
          className="progressBar mt-3 rounded-full gradient-base-r h-2.5   "
        ></motion.div>
      </div>
      {specializations.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Slider
