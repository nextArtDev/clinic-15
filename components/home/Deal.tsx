'use client'
import React from 'react'

import Image from 'next/image'
import ScrollVelocity from './ScrollVelocity'
import { deal } from '@/constants'
import Marquee from './Marquee'
import SvgShadow from './SvgShadow'

export default function Deal() {
  return (
    <div className="gradient-base relative flex h-44  w-full flex-col items-center justify-center overflow-hidden    bg-transparent md:shadow-xl">
      <SvgShadow />
      <Marquee className="[--duration:20s]">
        {deal.map(({ id, name, imageUrl }) => (
          <div key={id} className="relative h-36 w-36 ">
            <Image
              src={imageUrl}
              alt={name}
              fill={true}
              className="  object-contain object-center"
            />
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r dark:from-[#FFB6C140] from-[#FFF8DC60]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l dark:from-[#FFB6C140] from-[#FFF8DC60]"></div>
    </div>

    // <div className="w-full grainy">
    //   <ScrollVelocity velocity={5}>
    //     {deal.map(({ id, name, imageUrl }) => (
    //       <div
    //         key={id}
    //         className="relative h-36 w-36 "
    //       >
    //         <Image
    //           src={imageUrl}
    //           alt={name}
    //           fill={true}
    //           className=" object-contain object-center"
    //         />
    //       </div>
    //     ))}
    //   </ScrollVelocity>

    // </div>
  )
}
