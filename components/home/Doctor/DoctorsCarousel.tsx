'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import style from './DoctorsCarousel.module.css'
import { doctors, DoctorType } from '@/constants'
import DoctorCard from './DoctorCard'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouseelArrowButtons'
import { DateTag, Doctor } from '@prisma/client'
import DoctorReservationCard from './DoctorReservationCard'
import Link from 'next/link'

type PropType = {
  slides: (Doctor & { images: { url: string | null }[] } & {
    open_time: DateTag[] | null
  } & { averageRating: number | null })[]
  options?: EmblaOptionsType
}

const DoctorCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({}) as any,
  ])
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi as any)

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi as any)
    emblaApi
      .on('reInit', onScroll as any)
      .on('scroll', onScroll as any)
      .on('slideFocus', onScroll as any)
  }, [emblaApi, onScroll])

  return (
    <div dir="ltr" className={`${style.embla} cursor-grab`}>
      <div className={`${style.embla__controls}`}>
        <div className={`${style.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <h2 className="text-2xl text-center font-bold text-pretty title-color mix-blend-multiply ">
          {' '}
          کادر درمان
        </h2>
        <div className={`${style.embla__progress} grainy `}>
          <div
            className={`${style.embla__progress__bar} !gradient-base `}
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
      <div className={`${style.embla__viewport}`} ref={emblaRef}>
        <div className={`${style.embla__container}`}>
          {slides.map((doctor) => (
            <div className={`${style.embla__slide}`} key={doctor.id}>
              <div className={`relative pt-6 ${style.embla__slide__number}`}>
                {/* <DoctorCard doctor={doctor} /> */}
                <Link href={`/doctors/${doctor.id}`}>
                  <DoctorReservationCard dir="ltr" doctor={doctor} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorCarousel
