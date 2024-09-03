import React from 'react'
import MarqueeCard, { marquees } from './MarqueeCard'
import Marquee from '../Marquee'
import { Review } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils/date-utils'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BorderBeam } from '../BorderBeam'

type Props = {
  reviews: (Review & { doctor: { id: string } | null } & {
    user: { name: string } | null
  })[]
}

function Reviews({ reviews }: Props) {
  const review = reviews.map((review) => {
    return {
      id: review.id,
      name: review.user?.name!,
      text: review.comment,
      time: formatTimeToNow(review.created_at),
      rate: review.rating,
      isFaq: review.isFaq,
      doctorId: review.doctorId,
    }
  })
  const doctorReviews = review.filter((review) => !review.isFaq).slice(0, 7)
  const clinicReviews = review.filter((review) => review.isFaq).slice(7, 14)

  return (
    <div
      dir="ltr"
      className={cn(
        'relative flex   w-full flex-col items-center justify-center overflow-hidden rounded-lg  md:shadow-xl',
        reviews.length > 6 ? 'h-[600px]' : 'h-[350px]'
      )}
    >
      <h1 className="text-2xl  text-center font-bold text-pretty p-2 title-color mix-blend-multiply">
        {' '}
        نظرات
        <BorderBeam size={120} duration={6} delay={3} />
      </h1>
      <div className="flex flex-col mt-8">
        <Marquee reverse pauseOnHover repeat={7} className="[--duration:30s]">
          {review.slice(0, 7).map((marquee) => (
            <Link
              key={marquee.id}
              href={marquee.isFaq ? '/faq' : `/doctors/${marquee.doctorId}`}
            >
              <MarqueeCard {...marquee} />
            </Link>
          ))}
        </Marquee>

        <Marquee pauseOnHover repeat={7} className="[--duration:30s] ">
          {review.slice(7, 14).map((marquee) => (
            <Link
              key={marquee.id}
              href={marquee.isFaq ? '/faq' : `/doctors/${marquee.doctorId}`}
            >
              <MarqueeCard {...marquee} />
            </Link>
          ))}
        </Marquee>
      </div>
      {/* <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  )
}

export default Reviews
