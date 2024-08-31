import React from 'react'
import MarqueeCard, { marquees } from './MarqueeCard'
import Marquee from '../Marquee'
import { Review } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils/date-utils'
import Link from 'next/link'

type Props = {
  reviews: (Review & { doctor: { id: string } | null } & {
    user: { name: string } | null
  })[]
}
// {
//   id: '1',
//   name: 'احمد موسوی',
//   text: 'دکتر بسیار خوبی است و از کارهایش بسیار راضی هستم.',
//   time: 'دیروز',
//   rate: 5,
// },
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

  return (
    <div
      dir="ltr"
      className="mt-10 relative flex h-[400px]  w-full flex-col items-center justify-center overflow-hidden rounded-lg  md:shadow-xl"
    >
      <h1 className="text-2xl text-center font-bold text-pretty title-color mix-blend-multiply">
        {' '}
        نظرات
      </h1>
      <Marquee reverse pauseOnHover className="[--duration:15s]">
        {review.map((marquee) => (
          <Link
            key={marquee.id}
            href={marquee.isFaq ? '/faq' : `/doctors/${marquee.doctorId}`}
          >
            <MarqueeCard {...marquee} />
          </Link>
        ))}
      </Marquee>
      {/* <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  )
}

export default Reviews
