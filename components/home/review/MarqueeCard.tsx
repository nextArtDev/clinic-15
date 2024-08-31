import React from 'react'
import { GlareCard } from '../GlareCard'
import BoxReveal from '../BoxReveal'
import SvgShadow from '../SvgShadow'

export const marquees = [
  {
    id: '1',
    name: 'احمد موسوی',
    text: 'دکتر بسیار خوبی است و از کارهایش بسیار راضی هستم.',
    time: 'دیروز',
    rate: 5,
  },
  {
    id: '2',
    name: 'فاطمه احمدی',
    text: 'دکتر بسیار خوبی است و از کارهایش بسیار راضی هستم.',
    time: 'سه روز پیش',
    rate: 3,
  },
  {
    id: '3',
    name: 'محمد موسوی',
    text: 'از خدمات بیمارستان تشکر میکنم.',
    time: 'دو روز پیش',
    rate: 4,
  },
  {
    id: '4',
    name: 'حسین مجیدی',
    text: 'دکتر بسیار خوبی است و هفته پیش ویزیت شده بودم و بسیار راضی هستم.',
    time: 'هفته‌ پیش',
    rate: 5,
  },
]
type Props = {
  id: string
  name: string
  text: string
  time: string
  rate: number
}

const renderStars = (rating: number) => {
  const stars = []
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  }
  return stars
}

function MarqueeCard({ id, name, text, time, rate }: Props) {
  return (
    <div
      dir="rtl"
      className=" overflow-y-hidden   rounded-xl py-6 sm:py-2 lg:py-6"
    >
      <article
        style={{
          background:
            'linear-gradient(to bottom, #fff8dc 0%, #add8e6 60%, #ffb6c1 100%)',
        }}
        className=" relative mx-auto rounded-xl overflow-hidden   px-2 md:px-4"
      >
        <SvgShadow />
        <div className="  w-[250px] md:w-[450px] h-[150px] flex flex-col justify-between gap-3 rounded-xl p-4 md:p-6">
          <div className="w-full flex items-center justify-center gap-0.5">
            {renderStars(rate)}
          </div>

          <p className=" line-clamp-2 text-center md:text-sm text-xs font-semibold lg:text-base text-muted xl:line-clamp-1">
            {text}
          </p>
          <div className="z-[1] flex justify-between">
            <BoxReveal boxColor="transparent">
              <span className="block text-muted md:text-sm text-xs  lg:text-base">
                {name}
              </span>
            </BoxReveal>
            <BoxReveal boxColor="transparent">
              <span className="block md:text-sm text-xs lg:text-base text-muted-foreground">
                {time}
              </span>
            </BoxReveal>
          </div>
        </div>
      </article>
    </div>
  )
}

export default MarqueeCard
