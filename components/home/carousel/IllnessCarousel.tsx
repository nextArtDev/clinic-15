'use client'

import Image from 'next/image'
// https://mixcn-ui.vercel.app/docs/custom/carousel
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from './EmbolaCarousel'

interface ImageItem {
  alt: string
  urls: string[] | null // Adjusted to match the format of illness.images
}

interface CarouselOrientationProps {
  images: { urls: string | null; alt: string }[]
}

const CarouselOrientation = ({ images }: CarouselOrientationProps) => {
  return (
    <Carousel dir="ltr">
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="h-60">
        {images?.map((image, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <div
              className="relative outline outline-1 outline-border size-full flex items-center justify-center
            rounded-xl bg-background overflow-hidden"
            >
              <Image
                src={image.urls || '/images/parallax/0000.webp'}
                fill
                alt={image.alt}
                className="object-cover gradient-base"
              />
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {images?.map((image, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <div
              className="relative outline outline-1 outline-border size-full flex items-center
            justify-center rounded-xl bg-background overflow-hidden"
            >
              {/* Slide {index + 1} */}
              <Image
                src={image.urls || '/images/parallax/0000.webp'}
                fill
                alt={image.alt}
                className="object-cover gradient-base"
              />
            </div>{' '}
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  )
}

export default CarouselOrientation
