import { FC } from 'react'
import { days, DoctorType } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import {
  BracketsIcon,
  CircleEllipsisIcon,
  FlagIcon,
  StarIcon,
} from 'lucide-react'
import GlowingCard from './GlowingCard'
import { buttonVariants } from '@/components/ui/button'
import { Doctor } from '@prisma/client'

interface DoctorCardProps {
  doctor: Doctor & { images: { url: string | null }[] }
  className?: string
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor, className }) => {
  return (
    // <section className={`mt-16 w-[60vw] md:w-[40vw] h-[60vh] ${className}`}>
    //   <Link href={`doctors/${doctor.id}`}>
    //     <div className=" flex justify-center items-center  ">
    //       <Image
    //         src={doctor.imageSrc}
    //         width={150}
    //         height={150}
    //         className="object-cover  "
    //         alt="پروفایل"
    //       />
    //     </div>
    //     {/* //animate-fade-in [--animation-delay:600ms] opacity-0 */}
    //     <div className=" flex flex-col gap-y-1 justify-center items-center text-white/60 max-w-[90%] lg:max-w-[60%] mx-auto -mt-8 backdrop-blur-3xl px-2 py-2 rounded-lg text-center ">
    //       <h2 className="text-sm md:text-lg font-semibold text-white ">
    //         دکتر {doctor.name}
    //       </h2>
    //       <p className="text-sm md:text-base pt-2 text-white/80">
    //         {doctor.specialty}
    //       </p>
    //       {doctor?.booking?.map((book) => {
    //         return days.map((day) => {
    //           if (book.dayId === day.id) {
    //             return (
    //               <p key={day.id} className="text-center pt-1 ">
    //                 {`${day.name} از ساعت ${book.hours[0]} تا ${book.hours[1]}`}
    //               </p>
    //             )
    //           }
    //         })
    //       })}
    //     </div>
    //   </Link>
    // </section>
    // <section className={`mt-16 w-[60vw] md:w-[40vw] h-[60vh] ${className}`}>
    <section className={` mt-16 pb-4  ${className}`}>
      <GlowingCard
        fromColor="#FFF8DC"
        viaColor="#ADD8E6"
        toColor="#FFB6C1"
        className=" "
      >
        <div className=" rounded-2xl min-h-[50vh] sm:min-h-[30vh]  bg-transparent backdrop-blur-sm overflow-hidden">
          {/* <div className=" rounded-none overflow-hidden min-h-[50vh] sm:min-h-[30vh]  "> */}
          <div className="p-2 md:p-6 ">
            {/* <div className="p-3 md:p-6 grainy w-[var(---slide-size)]"> */}
            <div className=" sm:flex sm:items-center sm:justify-between ">
              <div className="sm:flex sm:justify-center md:justify-around sm:items-center sm:space-x-5 ">
                <div className="flex-shrink-0 md:ml-4 ">
                  <Image
                    width={120}
                    height={120}
                    className="mx-auto shadow-md   rounded-full object-contain cursor-none"
                    src={doctor.images?.[0]?.url || '/images/doctor.png'}
                    alt=""
                  />
                </div>
                <div className="mt-4 sm:pr-4 text-center sm:mt-0 sm:pt-1 sm:text-right">
                  {/* <p className="text-sm font-medium text-black/60"></p> */}
                  <p className="inline-block py-3 text:sm md:text-lg xl:text-lg font-bold text-blue-600 sm:text-2xl">
                    دکتر {doctor.name}
                  </p>
                  <p className="text-sm font-medium text-muted">
                    {doctor.description}
                  </p>
                  <div className=" ">
                    {/* <Link
                  href={`/doctors/${doctor.id}`}
                  className={cn(
                    buttonVariants(),
                    ' flex items-center justify-center rounded-md  px-3 py-2 text-sm font-semibold text-yellow-500 outline-black outline-dashed -outline-offset-2 shadow-md shadow-white ring-1 ring-inset ring-white-300 '
                  )}
                > */}
                    <Link
                      href={`/doctors/${doctor.id}`}
                      className={cn(buttonVariants(), '  ')}
                    >
                      صفحه شخصی
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="  flex mb-0 gap-x-4 justify-around text-black/80 border-t border-gray-200  "> */}
          {/* {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center text-sm font-medium"
            >
              <span className="text-gray-900">{stat.value}</span>{' '}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))} */}

          {/* {doctor?.booking?.map((book) => {
              return days.map((day) => {
                if (book.dayId === day.id) {
                  return (
                    <div
                      key={day.id}
                      className=" px-2 py-5 text-center text-sm font-medium"
                    >
                      <span className=" text-center ">
                        <p>{day.name}</p>
                        <Badge className=" bg-white/20 text-blue-500 pt-1">
                          {' '}
                          {`${book.hours[0]} تا ${book.hours[1]}`}
                        </Badge>
                      </span>
                    </div>
                  )
                }
              })
            })} */}
          {/* </div> */}
        </div>
      </GlowingCard>
    </section>
  )
}

export default DoctorCard
