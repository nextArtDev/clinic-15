'use client'
import { special } from '@/constants'
import Image from 'next/image'

import sun from '@/public/icons/sun.png'
// import BagImage from '@/public/v1/images/bag.svg'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import StickyNav from './StickyNav'

import GlobalSearch from '@/components/search/GlobalSearch'
import { HomeIcon, User } from 'lucide-react'
import { DockDemo } from './Doc'
import { NavigationMenuDemo } from './NavigationMenuDemo'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max)

function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll()
  let scrollYBounded = useMotionValue(0)
  let scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious() || 0
      let diff = current - previous
      let newScrollYBounded = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}

const Navbar = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const path = usePathname()
  let isMainNav
  path === '/' ? (isMainNav = true) : false
  let { scrollYBoundedProgress } = useBoundedScroll(400)
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.85, 1],
    [0, 0, 1]
  )
  return (
    <section className="relative mx-auto flex w-full max-w-3xl flex-1 overflow-hidden">
      <Link
        className="fixed border animate-pulse  z-50 bg-primary bottom-8 left-2 w-fit h-auto px-2 py-1 rounded-md "
        href={'/dashboard'}
      >
        دشبورد
      </Link>
      <article className="z-50 fixed top-0 lg:top-0   max-w-full px-4 py-8 font-semibold  dark:text-light w-full h-12 bg-transparent grid place-content-center grid-cols-6 md:hidden ">
        <div className="col-span-1">
          <MobileNav />
        </div>
        <div className="col-span-4">
          <GlobalSearch />
        </div>
        <Link href={'/'} className="m-auto col-span-1">
          <HomeIcon />
        </Link>
      </article>

      <div className="hidden md:flex z-50 flex-1 overflow-y-scroll">
        <motion.header
          className="fixed inset-x-0 grid grid-rows-2 h-32 py-auto w-full "
          style={{
            height: useTransform(
              scrollYBoundedProgressThrottled,
              [0, 1],
              // [max , min] height
              isMainNav ? [120, 50] : [50, 50]
            ),
            background: useMotionTemplate`
              linear-gradient(
                to top,
                rgba(255, 182, 193, ${useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 0.85, 1],
                  [0.1, 0.2, 1]
                )}) 0%,

                rgba(173, 216, 230, ${useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 0.85, 1],
                  [0.1, 0.2, 1]
                )}) 50%,

                rgba(255, 248, 220, ${useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 0.85, 1],
                  [0.1, 0.2, 1]
                )}) 100%

              )

            `,
          }}
        >
          <nav className="flex flex-col justify-center w-full pt-4  md:mt-4 screen-max-width">
            <section className="flex justify-between items-center ">
              <div className="flex justify-between items-center ">
                <Link href={'/'}>
                  <motion.figure
                    style={{
                      scale: useTransform(
                        scrollYBoundedProgressThrottled,
                        [0, 1],
                        // [max , min] height
                        [1, 0.6]
                      ),
                    }}
                  >
                    <Image src={sun} alt="Sun" width={48} height={48} />
                  </motion.figure>
                </Link>
              </div>

              {/* <Menu
              setActive={setActive}
              className={'flex flex-1   justify-center  max-sm:hidden '}
            >
              <MenuItem setActive={setActive} active={active} item="خدمات">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/web-dev">Web Development</HoveredLink>
                  <HoveredLink href="/interface-design">
                    Interface Design
                  </HoveredLink>
                  <HoveredLink href="/seo">
                    Search Engine Optimization
                  </HoveredLink>
                  <HoveredLink href="/branding">Branding</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="دکترها">
                <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                  {doctors.map((nav) => (
                    <ProductItem
                      key={nav.id}
                      title={nav.name}
                      href={`/doctors/${nav.id}`}
                      src={nav.imageSrc}
                      description="Prepare for tech interviews like never before."
                    />
                  ))}
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="تخصصها">
                <div className="flex flex-col space-y-4 text-sm">
                  {special.map((sp) => (
                    <HoveredLink key={sp.id} href={`/specials/${sp.id}`}>
                      {sp.name}
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            </Menu> */}
              <div className=" flex-1 px-6">
                <NavigationMenuDemo />
              </div>

              <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                <motion.div
                  style={{
                    scale: useTransform(
                      scrollYBoundedProgressThrottled,
                      [0, 1],
                      // [max , min] height
                      [1, 1.1]
                    ),
                  }}
                >
                  {/* <Search size={'sm'} className="w-4" /> */}

                  {/* <Image src={SearchImage} alt="search" width={18} height={18} /> */}
                </motion.div>

                <motion.figure
                  style={{
                    scale: useTransform(
                      scrollYBoundedProgressThrottled,
                      [0, 1],
                      // [max , min] height
                      [1, 1.3]
                    ),
                  }}
                >
                  {/* <Image src={BagImage} alt="bag" width={18} height={18} /> */}
                  <Link href={'/login'}>
                    <User size={'sm'} className="ml-4 w-6" />
                  </Link>
                </motion.figure>
              </div>
            </section>
            {/* <motion.ul
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }))
              }}
              className=" flex flex-1 space-x-4 pb-2.5 justify-center  max-sm:hidden "
            ></motion.ul> */}
          </nav>

          <motion.div
            style={{
              scale: useTransform(
                scrollYBoundedProgressThrottled,
                [0, 1],
                [1, 0]
              ),
            }}
            className={cn(
              isMainNav ? '' : '!hidden !w-0',
              'relative mx-auto self-center w-[325px]'
            )}
          >
            <GlobalSearch />
          </motion.div>
        </motion.header>
        {/* <div className="mx-auto ">
          <StickyNav> */}
        {/* {special.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? '' : 'hover:text-background'
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground bg-transparent  transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  borderRadius: 9999,
                }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-white mix-blend-difference"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.name}
              </button>
            ))} */}
        {/* <DockDemo />
          </StickyNav>
        </div> */}
      </div>
    </section>
  )
}

export default Navbar
