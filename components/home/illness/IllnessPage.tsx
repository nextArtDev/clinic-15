import { Illness } from '@prisma/client'
import React from 'react'
import CarouselOrientation from '../carousel/IllnessCarousel'
import Image from 'next/image'

type Props = {
  illness: Illness & { images: { url: string | null }[] }
}

function IllnessPage({ illness }: Props) {
  // const illnessImages = illness?.images.map((image) => image?.url)
  const illnessImages = illness.images.map((image) => {
    return { alt: illness.name, urls: image?.url }
  })

  return (
    <div>
      <div key={illness.id} className="px-4 py-10 pt-20 sm:px-6 lg:px-8  ">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
          {illnessImages.length > 0 ? (
            <div className="xl:max-w-xl xl:mx-auto">
              <CarouselOrientation images={illnessImages} />
            </div>
          ) : (
            <Image
              src={'/images/parallax/0000.webp'}
              width={250}
              height={250}
              alt={illness.name}
              className="mx-auto"
            />
          )}
          {/* <Gallery images={illnessImages} /> */}
          <div className="mt-10 flex-col text-justify xl:max-w-xl xl:mx-auto items-center justify-center  px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="font-semibold pb-4 lg:text-lg text-blue-950 ">
              {illness.name}{' '}
            </div>
            <div className="text-black/60 lg:text-lg ">
              {' '}
              {illness.description}{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IllnessPage
