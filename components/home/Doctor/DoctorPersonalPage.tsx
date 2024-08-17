'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { ReviewsWithUserAndImage } from '@/lib/queries/home'
import { cn } from '@/lib/utils'
import { DateTag, Doctor, Illness, User } from '@prisma/client'
import { ForwardIcon } from 'lucide-react'
import Link from 'next/link'
import BoxReveal from '../BoxReveal'
import { StarRating } from '../StarRating'
import DoctorComment from './DoctorComment'
import ReviewCard from './ReviewCard'
import SkewedInfiniteScroll from './SkewedInfiniteScroll'
import UserReviews from './UserReviews'

interface pageProps {
  doctor: Doctor & { illnesses: Illness[] | null } & {
    images: { url: string | null }[]
  } & {
    reviews: ReviewsWithUserAndImage[] | null
  } & { open_time: DateTag[] | null }
  rate: number | null
  user: (User & { image: { url: string } | null }) | null
  beforeRated?: {
    rating: number
  } | null
}
function DoctorPersonalPage({ doctor, user, beforeRated, rate }: pageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.1])
  // const scrollYProgressSpring = useSpring(scrollYProgress, {
  //   stiffness: 300,
  //   damping: 40,
  // }) as MotionValue<number>
  // const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0])
  // const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`
  // const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  return (
    <>
      <div
        ref={ref}
        className=" bg-transparent py-12 pb-32 "
        // style={{
        //   backgroundImage: "url('/noise-svg/noise4.svg')",
        // }}
      >
        <motion.div className=" min-h-[20vh] w-full">
          {/* <Image
            height={128}
            width={128}
            className="h-32 w-full object-cover lg:h-48"
            src="/images/parts/omomi.webp"
            alt=""
          /> */}
          <SkewedInfiniteScroll>
            {doctor.reviews?.map((review) => (
              <ReviewCard
                key={review.id}
                rate={review.rating}
                name={review.user?.name!}
                text={review.comment}
                time={review.created_at}
              />
            ))}
          </SkewedInfiniteScroll>
        </motion.div>

        <div className="  mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 ">
            <div className="flex-col ">
              <motion.figure
                style={{ scale }}
                className="relative h-24 w-24 sm:h-32 sm:w-32 "
              >
                <Image
                  fill
                  className=" object-cover  rounded-full ring-4 ring-white "
                  src={doctor.images?.[0]?.url || '/images/1.jpg'}
                  alt=""
                />
              </motion.figure>
              <div className="mt-6 min-w-0 flex flex-col gap-2 justify-center ">
                <h1 className=" text-2xl font-bold text-blue-950">
                  دکتر {doctor.name}
                </h1>
                {!!rate && (
                  <article className="flex gap-1  ">
                    <StarRating
                      disabled
                      numStars={rate}
                      value={rate}
                      // icon={Heart}
                      iconProps={{ className: 'size-5' }}
                    />
                    <span>{`(${parseFloat(rate.toFixed(1))} از ${
                      doctor.reviews?.length
                    } نفر)`}</span>
                  </article>
                )}
              </div>
            </div>
            <div className=" mt-6  sm:min-w-0 sm:flex-1 sm:items-center sm:justify-between sm:space-x-6 sm:pb-1">
              <div className="mt-6 text-secondary flex flex-col justify-stretch space-y-3 sm:flex-row sm:justify-evenly sm:space-x-4 sm:space-y-0">
                {!!doctor?.description && (
                  <div className="grainy  inline-flex text-center justify-center items-center rounded-md bg-transparent backdrop-blur-sm px-3 py-4 text-sm font-semibold shadow-sm  ">
                    <BoxReveal boxColor="transparent">
                      <span>{doctor.description}</span>
                    </BoxReveal>
                  </div>
                )}
                {!!doctor?.open_time?.length ? (
                  <div className="grainy flex justify-around rounded-md bg-transparent backdrop-blur-sm px-3 py-2 text-sm font-semibold shadow-sm  ">
                    <ul
                      className={cn(
                        'font-semibold',
                        'flex flex-wrap gap-x-2 py-4  items-center '
                      )}
                    >
                      {doctor?.open_time?.map((booking) => (
                        <li
                          key={booking.id}
                          className={'text-base text-muted '}
                        >
                          <BoxReveal boxColor="transparent">
                            <time className=" !custom-box-shadow text-xs rounded-full   px-1 ">
                              {booking.time}
                            </time>
                          </BoxReveal>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {!!doctor?.illnesses && (
            <div className="pt-8 w-full flex-auto">
              {/* <h2 className="text-xl font-bold tracking-tight  sm:text-2xl">
                موارد معالجه{' '}
              </h2> */}

              <ul
                role="list"
                className="mt-4 grid grid-cols-1 place-items-center gap-x-8 gap-y-4 text-base leading-7  sm:grid-cols-2 "
              >
                {doctor?.illnesses.map((illness) => (
                  <Link
                    key={illness.id}
                    href={`/illnesses/${illness.id}`}
                    className={cn(
                      buttonVariants(),
                      'py-8 text-center w-[60%] headGradient outline-blue-300 outline-dashed -outline-offset-3'
                    )}
                  >
                    <li className="mix-blend-multiply text-blue-900  flex  justify-start items-center gap-x-2 ">
                      <ForwardIcon
                        className="opacity-60 h-7 w-5 flex-none"
                        aria-hidden="true"
                      />
                      {illness.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          {!beforeRated && <DoctorComment doctor={doctor} user={user} />}
          <UserReviews reviews={doctor.reviews} />
          {/* <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {profile.name}
            </h1>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default DoctorPersonalPage
