import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

interface SimpleDesktopMenuProps {}

interface MobileLinks {
  href: string
  title: string
  className?: string
}
const CustomMobileLink = ({ href, title, className = '' }: MobileLinks) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={`${className}  relative group text-lg  sub-title-color  my-2`}
    >
      {title}
      <span
        className={`h-[3px] inline-block glass absolute right-0 -bottom-0.5
        group-hover:w-full transition-[width] ease duration-300 ${
          pathname === href ? 'w-full' : 'w-0'
        } `}
      >
        &nbsp;
      </span>
    </Link>
  )
}
const SimpleDesktopMenu: FC<SimpleDesktopMenuProps> = ({}) => {
  return (
    <div>
      <article className="self-start flex w-full max-w-lg items-center justify-evenly">
        <CustomMobileLink title="تخصصها" className="" href={'/specialities'} />

        <CustomMobileLink title="دکترها" className="" href={'/doctors'} />
        <CustomMobileLink title="بیماری‌ها" className="" href={'/illnesses'} />
        <CustomMobileLink title="نظرات و سوالات" className="" href={'/faq'} />
      </article>
    </div>
  )
}

export default SimpleDesktopMenu
