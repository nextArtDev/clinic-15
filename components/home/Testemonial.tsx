'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { StarRating } from './StarRating'
import { Dot, Heart } from 'lucide-react'
import { formatTimeToNow } from '@/lib/utils/date-utils'
import SvgShadow from './SvgShadow'

const testimonials = [
  {
    text: 'First testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Ansub',
    rating: 4,
  },
  {
    text: 'Another testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Lex Collins',

    rating: 3,
  },
  {
    text: 'Third testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Alex Jones',
    rating: 5,
  },
  {
    text: 'Fourth testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'John Doe',
    rating: 4,
  },
]
interface TestimonialCarouselProps {
  testimonials: {
    text: string
    author: string
    rating: number
    created_time: Date
  }[]
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial(
        (prevTestimonial) => (prevTestimonial + 1) % testimonials.length
      )
    }, 3000) // Change Time here

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const { text, author, rating, created_time } =
    testimonials[currentTestimonial]

  const variants = {
    initial: { opacity: 0, y: '100%', scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: '100%', scale: 0.1 },
  }
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: '#45f88a' },
    inactive: { scale: 1, backgroundColor: '#D1D5DB' },
  }

  return (
    <section className=" py-12 md:py-24 max-w-2xl">
      <article className="relative overflow-hidden  bg-secondary/10 gradient-base-r shadow-2xl backdrop-blur-md rounded-2xl px-8 py-10  w-[90vw] max-w-[90vh]  ">
        <SvgShadow className="!opacity-75" />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentTestimonial}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className=" flex w-full flex-col items-center justify-center"
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          >
            <div className="pb-4">
              <StarRating value={rating} disabled icon={Heart} />
            </div>
            <p className="m-0 text-center text-2xl font-medium tracking-tight">
              &quot;{text}&quot;
            </p>
            <div className="mx-auto mt-5">
              <div className="flex flex-col items-center justify-center space-x-3">
                {/* <div className="font-regular text-sm text-gray-900/80">
                  {author}
                </div> */}

                <div className="flex justify-center items-center">
                  <span className=" text-[1rem] ">{author}</span>
                  <Dot className="" />

                  <span className=" text-sm ">
                    {formatTimeToNow(new Date(created_time))}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="mt-8 flex justify-center">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className="mx-1.5 h-2.5 w-2.5 cursor-pointer rounded-full"
                variants={dotVariants}
                animate={index === currentTestimonial ? 'active' : 'inactive'}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </AnimatePresence>
      </article>
    </section>
  )
}

export default TestimonialCarousel
