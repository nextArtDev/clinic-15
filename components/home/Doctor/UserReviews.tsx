'use client'
import { FC } from 'react'

import { ReviewsWithUserAndImage } from '@/lib/queries/home'

import TestimonialCarousel from '../Testemonial'
interface UserReviewsProps {
  reviews: ReviewsWithUserAndImage[] | null
}

const UserReviews: FC<UserReviewsProps> = ({ reviews }) => {
  const testimonials = reviews?.map((review) => {
    return {
      text: review.comment,
      author: review.user!.name!,
      rating: review.rating,
      created_time: review.created_at,
    }
  })
  if (!testimonials?.length) return <div></div>
  return (
    <section className="pb-36 pt-6 ">
      {/* <h2 className=" py-8  text-xl font-semibold">نظرات</h2> */}
      <section className="flex flex-col gap-4 justify-center items-center col-span-2">
        {testimonials?.length > 0 ? (
          <TestimonialCarousel testimonials={testimonials} />
        ) : null}
      </section>
    </section>
  )
}

export default UserReviews
