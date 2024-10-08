'use client'
import Link from 'next/link'
import React, { useState } from 'react'
// import Logo from './Logo'
import { usePathname, useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
import { ExtendedUserWithoutEmail } from '@/types/next-auth'
import { Button } from '@/components/ui/button'
import { signOut } from '@/auth'

// import useThemeSwitcher from './hooks/useThemeSwitcher'

// Links wor desktop
// interface Links {
//   href: string
//   title: string
//   className?: string
// }
// const CustomLink = ({ href, title, className = '' }: Links) => {
//   const pathname = usePathname()
//   const router = useRouter()
//   return (
//     <Link href={href} className={`${className} relative group`}>
//       {title}
//       <span
//         className={`h-[2px] inline-block bg-[#C69B7B] absolute right-0 -bottom-0.5
//           group-hover:w-full transition-[width] ease duration-300 ${
//             pathname === href ? 'w-full' : 'w-0'
//           } dark:bg-light `}
//       >
//         &nbsp;
//       </span>
//     </Link>
//   )
// }

// Links for mobile view
interface MobileLinks {
  href: string
  title: string
  className?: string
  toggle: () => void
}
const CustomMobileLink = ({
  href,
  title,
  className = '',
  toggle,
}: MobileLinks) => {
  const pathname = usePathname()
  const router = useRouter()
  const handleClick = () => {
    router.push(href)
    toggle()
  }
  return (
    <Link
      href={href}
      className={`${className} relative group text-xl sub-title-color  my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[2px] inline-block gradient-base-r absolute right-0 -bottom-0.5
        group-hover:w-full transition-[width] ease duration-300 ${
          pathname === href ? 'w-full' : 'w-0'
        } `}
      >
        &nbsp;
      </span>
    </Link>
  )
}
function MobileNav({ user }: { user?: ExtendedUserWithoutEmail }) {
  //   const [mode, setMode] = useThemeSwitcher()

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <header className="">
      {/* Hamberguer Menue */}
      <button
        className="z-50 flex-col pt-6 justify-center items-center md:hidden"
        onClick={handleClick}
      >
        <span
          className={`bg-primary/60 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
            isOpen
              ? '!bg-red-500 text rotate-45 translate-y-1'
              : '-translate-y-0.5'
          } `}
        ></span>
        <span
          className={`bg-primary/60 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          } `}
        ></span>
        <span
          className={`bg-primary/60 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
            isOpen ? '!bg-red-500 -rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        ></span>
      </button>

      {/* Large Menu */}

      {/* Mobile Menu */}
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className=" custom-box-shadow bg-white/30 backdrop-blur-sm overflow-hidden min-w-[75vw] z-30 flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg  py-20 "
        >
          <nav className="flex items-center flex-col justify-center sub-title-color ">
            <CustomMobileLink href="/" title="خانه" toggle={handleClick} />
            {/* <CustomMobileLink
              href="/about"
              title="درباره ما"
              toggle={handleClick}
            /> */}
            <CustomMobileLink
              href="/faq"
              title="نظرات و سوالات"
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/specialities"
              title="تخصص‌ها"
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/doctors"
              title="دکترها"
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/illnesses"
              title="بیماری‌ها"
              toggle={handleClick}
            />
            {/* {user?.phone && (
              <CustomMobileLink
                href="/user"
                title="پروفایل شخصی"
                toggle={handleClick}
              />
            )} */}
            {!!user?.phone ? (
              <CustomMobileLink
                href="/user"
                title="پروفایل شخصی"
                toggle={handleClick}
              />
            ) : (
              <CustomMobileLink
                href="/login"
                title="ورود/عضویت"
                toggle={handleClick}
              />
            )}

            {/* <CustomMobileLink
              href="/inography"
              title="اینوگرافی بیماریها"
              toggle={handleClick}
            /> */}

            {/* <UserNavbar /> */}
          </nav>
        </motion.div>
      ) : null}
      {/* <div className="absolute left-[50%] top-2 translate-x-[-50%] ">
        <Logo />
      </div> */}
    </header>
  )
}

export default MobileNav
