'use client'

import { Button } from '@/components/ui/button'
// import Herosvg from './icons/svg/Herosvg'
import { gsap } from 'gsap'
import { Expo } from 'gsap/all'
import { useEffect, useRef } from 'react'
// import Phone from './icons/Phone'
// import HeroWhatsApp from './icons/HeroWhatsApp'
import { slider } from '@/constants'
import { cn } from '@/lib/utils'
import { Phone, PhoneCallIcon } from 'lucide-react'
import Link from 'next/link'
import HeroWhatsApp from '../icons/HeroWhatsApp'
import Carousel from './Carousel'
import IconRipple from './IconRipple'
import PulsatingButton from './PulsatingButton'
import GradualSpacing from '../GradualSpacing'
import RotatingText from '../RotatingText'
import HeroSvg from './HeroSvg'
import Image from 'next/image'
import Logo from '../../../public/images/logo.png'
import LogoSvg from './LogoSvg'
type Props = {}

function Hero({}: Props) {
  const bgRef = useRef(null)
  // useEffect(() => {
  //   const tl = gsap.timeline({ Defaults: { ease: Expo.easeOut } })
  //   // const tl = gsap.timeline({ Defaults: {} })

  //   //    timeline.fromTo(ref.current, { opacity: 0 }, { opacity: 1 })
  //   tl.from(bgRef.current, {
  //     scale: 0.6,
  //     duration: 2,
  //     opacity: 0,
  //     ease: Expo.easeOut,
  //     delay: 0.75,
  //   })
  //     .to(
  //       '.text-reveal',
  //       {
  //         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  //         y: 30,
  //         stagger: 0.3,
  //         duration: 0.5,
  //       },
  //       '-=2.9'
  //     )
  //     .to('.text-reveal', {
  //       clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
  //       y: -70,
  //       duration: 0.2,
  //       delay: 0.25,
  //     })
  //     .to('.text-reveal', {
  //       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  //       stagger: 0.7,
  //       duration: 0.3,
  //       delay: 0.25,
  //     })
  //     .to('.svgLogo', {
  //       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  //       duration: 1,
  //       y: -150,
  //     })
  //     .to(
  //       '.local',
  //       {
  //         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
  //         // xPercent: '100',
  //         stagger: 0.7,
  //         opacity: 1,
  //         duration: 1.2,
  //       },
  //       '-=0.7'
  //     )

  //   return () => {
  //     tl.kill() // Cleanup the timeline when the component unmounts
  //   }
  // }, [])
  return (
    <section className="relative w-full h-[100dvh]">
      {/* <div className="container absolute top-10  inset-0 grid place-items-center  "> */}
      <div className="container absolute  top-[15%] md:top-[20%]  inset-0 flex flex-col justify-between h-[80vh] items-center ">
        <div className="content text-center z-10  ">
          {/* <figure className="relative w-72 h-72 mx-auto">
            <Image src={Logo} fill alt="logo" className="bg-transparent  " />
          </figure> */}

          {/* <div className="content-inner space-y-4">
            <h1 className="title-color custom-box-shadow glass text-reveal text-center text-4xl md:text-5xl font-bold mb-0 py-2 ">
              درمانگاه آئین شفق
            </h1>

            <p className="text-reveal flex flex-col justify-center items-center gap-4 text-center text-xl md:text-3xl  font-semibold sub-title-color">
              پذیرش بیماران درمانگاهی توسط پزشکان عمومی
            </p>
            <Link
              className="local p-0.5 w-full flex items-center justify-center "
              href={'/doctors'}
            >
              <PulsatingButton>رزرو نوبت</PulsatingButton>
            </Link>
          </div> */}
          <div className="h-full  space-y-10 md:space-y-8">
            <article className="flex flex-col mx-auto items-center justify-center gap-2">
              <LogoSvg className=" mx-auto animate-fade-in [--animation-delay:1100ms] opacity-0" />

              {/* <h1 className="!w-fit px-4 mx-auto animate-fade-in [--animation-delay:1300ms] opacity-0 title-color glass !rounded-lg text-center text-4xl md:text-5xl font-bold mb-0 py-2 ">
                مجتمع پزشکی کوثر
              </h1> */}
              <span className="!w-full mx-auto animate-fade-in [--animation-delay:1300ms] opacity-0  glass !rounded-lg mb-0 p-1 ">
                <HeroSvg className=" " />
              </span>
            </article>
            <Link
              className="animate-fade-in [--animation-delay:1800ms] opacity-0 p-0.5 w-full flex items-center justify-center "
              href={'/specialities'}
            >
              <PulsatingButton className=" glass text-sm font-semibold flex flex-col items-center justify-between gap-0.5 rounded-md">
                <p className="">رزرو نوبت</p>
              </PulsatingButton>
            </Link>
            <div className="animate-fade-in  !rounded-md[--animation-delay:1600ms] opacity-0 ">
              {/* پذیرش بیماران درمانگاهی توسط پزشکان عمومی */}
              {/* <p className="sub-title-color ">دارای بخش‌های</p> */}

              <RotatingText
                texts={[
                  'آزمایشگاه',
                  'ترک اعتیاد',
                  'سونوگرافی',
                  'رادیولوژی ',
                  'شنوایی سنجی',
                  'تست سرگیجه‌وتعادل',
                  'بینایی‌سنجی',
                  'لیزر',
                ]}
                mainClassName=" px-2  sm:px-3 md:px-4  overflow-hidden py-1 sm:py-1 md:py-2 justify-center  text-3xl "
                staggerFrom={'last'}
                splitBy="words"
                initial={{ y: '100%' }}
                animate={{ y: '0' }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>

            {/* <GradualSpacing
              className="hidden pt-6 p-0.5 custom-box-shadow  title-color  md:block  text-center text-3xl font-bold tracking-[-0.1em] md:leading-[2rem]"
              text="03137888561"
            /> */}
          </div>
          <div className="hidden !text-green-500/70 sm:flex items-center justify-center gap-1">
            <GradualSpacing
              className="  custom-number-shadow p-0.5 w-fit text-center text-3xl font-bold tracking-[-0.1em] md:leading-[2rem]"
              text="03137888561"
            />
            <PhoneCallIcon className=" animate-fade-in [--animation-delay:1800ms] opacity-0 " />
          </div>

          <div className="sm:hidden animate-fade-in [--animation-delay:2100ms] opacity-0 pt-6 flex w-full   items-center justify-evenly ">
            <Link href="tel:+989352310831" className="w-fit animate-pulse">
              {/* <span className=" text-lg underline underline-offset-2 decoration-red-600 decoration-1 "> */}
              {/* <Button
                variant={'ghost'}
                className={cn('text-lg bg-primary  flex gap-x-2 shadow-2xl ')}
              >
                تماس
                <Phone />
              </Button> */}
              <IconRipple icon={Phone} iconColor="red" />
              {/* <p className="pt-2 text-red-600">تماس</p> */}
            </Link>
            <Link
              href="https://wa.me/+989336756401"
              target="_blank"
              className=" "
            >
              {/* <span className=" text-lg underline underline-offset-2 decoration-green-600 decoration-1 "> */}
              {/* <Button
                variant={'ghost'}
                className={'   text-lg flex gap-x-2 shadow-inner '}
              >
              </Button> */}
              <HeroWhatsApp className="w-8 h-8 mix-blend-multiply text-green-600 " />
              {/* <p className="mt-2 text-green-600">پیام</p> */}
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
