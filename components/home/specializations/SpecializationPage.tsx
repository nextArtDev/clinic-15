'use client'
import { DateTag, Doctor, Illness, Specialization } from '@prisma/client'
import React, { useRef } from 'react'

import IllnessShowCard from '../illness/IllnessShowCard'
import DoctorReservationCard from '../Doctor/DoctorReservationCard'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

type Props = {
  specialization: Specialization & {
    illness: (Illness & { images: { url: string | null }[] })[] | null
  } & { images: { url: string | null }[] | null } & {
    doctors: (Doctor & { images: { url: string | null }[] } & {
      open_time: DateTag[] | null
    })[]
  }
}

function SpecializationPage({ specialization }: Props) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5])
  return (
    <section
      ref={ref}
      className="mx-auto pt-4 max-w-7xl w-full h-full flex flex-col "
    >
      <motion.figure
        style={{ scale }}
        className="relative w-full h-44 rounded-md overflow-hidden"
      >
        <Image
          unoptimized
          fill
          className=" object-cover  rounded-md ring-1 ring-white "
          src={
            specialization.images?.[0]?.url ||
            '/images/blank-profile-picture.png'
          }
          alt={specialization.name}
        />
        <div className="absolute bg-black/20 backdrop-blur-sm px-1 mx:px-2 text-center flex flex-col items-center justify-center gap-1 md:gap-2 inset-0">
          <h1 className="text-xl md:text-4xl title-color text-center ">
            {specialization.name}
          </h1>
          <p className="text-white/80 text-base md:text-xl">
            {specialization.description}
          </p>
        </div>
      </motion.figure>

      <div className="mx-auto px-1 py-8 max-w-7xl w-full h-full flex flex-col gap-12">
        {!!specialization.doctors.length && (
          <article className="flex flex-col gap-4">
            <h2 className="text-xl sub-title-color py-4 text-center  md:text-2xl ">
              دکترهای مرتبط ({specialization.doctors.length})
            </h2>
            <div className="grid place-items-center place-content-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {specialization.doctors.map((doctor) => (
                <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
                  <DoctorReservationCard doctor={doctor} isVertical={true} />
                </Link>
              ))}
            </div>
          </article>
        )}
        {!!specialization?.illness?.length && (
          <article className="flex flex-col gap-4">
            <h2 className="text-xl sub-title-color py-4 text-center  md:text-2xl ">
              بیماری‌های مرتبط ({specialization.illness.length})
            </h2>
            <div className="grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
              {specialization?.illness?.map((illness) => (
                <IllnessShowCard illness={illness} key={illness.id} />
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  )
}

export default SpecializationPage
