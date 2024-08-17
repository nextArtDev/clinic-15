'use client'

import { Button, buttonVariants } from '@/components/ui/button'
// import Herosvg from './icons/svg/Herosvg'
import Image from 'next/image'
import logoSrc from '../../public/vercel.svg'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Expo } from 'gsap/all'
// import Phone from './icons/Phone'
// import HeroWhatsApp from './icons/HeroWhatsApp'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import partOneSrcImage from '../public/images/page2.png'
import HeroSmImage from '@/public/images/header-sm.jpg'
import HeroLgImage from '@/public/images/header-lg.jpg'
import { MapPin, Phone } from 'lucide-react'
import HeroWhatsApp from '../icons/HeroWhatsApp'
import sun from '@/public/icons/sun.png'
import Carousel from './Carousel'
import { slider, special } from '@/constants'
import RotateBetween from './RevealWord'
import GlobalSearch from '@/components/search/GlobalSearch'
type Props = {}
const words = ['CREATE', 'LEARN', 'ENJOY', 'IMPRESS']
function Hero({}: Props) {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline({ Defaults: { ease: Expo.easeOut } })
    // const tl = gsap.timeline({ Defaults: {} })

    //    timeline.fromTo(ref.current, { opacity: 0 }, { opacity: 1 })
    tl.from(bgRef.current, {
      scale: 0.6,
      duration: 2,
      opacity: 0,
      ease: Expo.easeOut,
      delay: 0.75,
    })
      .to(
        '.text-reveal',
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 30,
          stagger: 0.3,
          duration: 0.5,
        },
        '-=2.9'
      )
      .to('.text-reveal', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        y: -60,
        duration: 0.2,
        delay: 0.25,
      })
      .to('.text-reveal', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        stagger: 0.7,
        duration: 0.3,
        delay: 0.25,
      })
      .to('.svgLogo', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1,
        y: -150,
      })
      .to(
        '.local',
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          // xPercent: '100',
          stagger: 0.7,
          opacity: 1,
          duration: 1.2,
        },
        '-=0.7'
      )

    return () => {
      tl.kill() // Cleanup the timeline when the component unmounts
    }
  }, [])
  return (
    <section className="relative w-full h-[calc(h-screen-5rem)]">
      <div className="container absolute top-10 inset-0 grid place-items-center  ">
        <div className="content text-center z-10 ">
          {/* <div className="flex justify-center items-center">
            <Image
              src={sun}
              width={28}
              height={28}
              // className="svgLogo block m-8 top-[20%] w-16 h-16"
              className="svgLogo block w-24 h-24"
              alt="logo"
            />
          </div> */}
          <div className="content-inner space-y-4">
            <h1 className="title-color text-reveal text-center text-3xl font-bold   mb-0 py-1 ">
              درمانگاه آئین شفق
            </h1>
            <p className="text-reveal flex flex-col justify-center items-center gap-4 text-center text-xl   font-semibold bg-gradient-to-r from-primary  via-black/80 to-primary  bg-clip-text text-transparent">
              پذیرش بیماران درمانگاهی توسط پزشکان عمومی
            </p>
          </div>
          <div className=" text-reveal pt-8 flex gap-x-4 justify-center items-center ">
            <a href="tel:03137888561" className="flex  gap-1">
              {/* <span className=" text-lg underline underline-offset-2 decoration-red-600 decoration-1 "> */}
              <Button
                variant={'ghost'}
                className={cn('text-lg bg-primary  flex gap-x-2 shadow-2xl ')}
              >
                تماس
                <Phone />
              </Button>
            </a>
            <Link
              href="https://wa.me/+989386472694"
              target="_blank"
              className="flex  gap-1"
            >
              {/* <span className=" text-lg underline underline-offset-2 decoration-green-600 decoration-1 "> */}
              <Button
                variant={'ghost'}
                className={
                  ' border border-white-70 text-lg flex gap-x-2 shadow-inner '
                }
              >
                پیام
                <HeroWhatsApp className="mix-blend-multiply text-green-600 " />
              </Button>
            </Link>
          </div>
          {/* <div className="z-10 text-center w-full rounded-lg   ">
            <div className="flex h-20 items-center justify-start space-x-1 px-2 text-2xl font-normal text-neutral-800 dark:text-gray-300">
              <p> دارای متخصص</p>
              <RotateBetween
                words={special.map((spec) => spec.title)}
                className="text-balance bg-gradient-to-tr from-black from-30% to-black/60 bg-clip-text px-1 py-2 font-bold leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40"
              />
            </div>
          </div> */}
          {/* <GlobalSearch /> */}
        </div>
      </div>

      {/* <div className="videoContainer relative w-full h-screen after:-z-10 after:absolute after:content-[''] after:h-full after:top-0 after:w-full after:left-0 after:opacity-70 "></div> */}
      <Carousel slides={slider} />
    </section>
  )
}

export default Hero
