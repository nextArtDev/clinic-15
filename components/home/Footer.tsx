import Link from 'next/link'

import { Doctor, Illness, Specialization } from '@prisma/client'
import { cn, shuffleArray } from '@/lib/utils'
import { ArrowBigDownIcon, ArrowLeft, ForwardIcon } from 'lucide-react'
import Location from './location'

type FooterProps = {
  specializations?: Partial<Specialization>[]
  doctors?: Partial<Illness>[]
  illnesses?: Partial<Doctor>[]
}
const Footer = ({ specializations, doctors, illnesses }: FooterProps) => {
  const limitedDoctors =
    doctors?.slice(0, 5).map((doctor) => {
      return { title: doctor.name, url: `/doctors/${doctor.id}` }
    }) || []
  const limitedSpecializations =
    specializations?.slice(0, 5).map((specialization) => {
      return {
        title: specialization.name,
        url: `/specialities/${specialization.id}`,
      }
    }) || []

  const randomIllness = () => {
    if (!doctors || doctors.length === 0) return []

    const shuffledIllnesses = shuffleArray([...(illnesses || [])]) // Shuffle a copy of the doctors array
    return shuffledIllnesses.slice(0, 5).map((illness) => ({
      title: illness.name,
      url: `/illnesses/${illness.id}`,
    }))
  }
  const limitedIllnesses = randomIllness() || []

  const footerLinks = [
    {
      title: 'دکترها',
      links: [...limitedDoctors, { title: 'همه دکترها', url: '/doctors' }],
    },
    {
      title: 'تخصص‌ها',
      links: [
        ...limitedSpecializations,
        { title: 'همه تخصص‌ها', url: '/specialities' },
      ],
    },
    {
      title: 'بیماری‌ها',
      links: [
        ...limitedIllnesses,
        { title: 'همه بیماری‌ها', url: '/illnesses' },
      ],
    },
  ]
  return (
    // <div
    //   className="gradient-base relative min-h-screen h-[550px]"
    //   style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    // >
    //   <div className="fixed bottom-0  h-[530px] w-full">
    <section className="  text-black px-8 flex items-center justify-start flex-col paddings w-full gap-20  shadow-2xl ">
      <div className="flex flex-col gap-8 w-full text-xs md:text-sm lg:text-base ">
        <div className="flex items-start flex-col gap-4 ">
          {/* <Image src="/logo-purple.svg" width={116} height={38} alt="logo" /> */}

          <p className="mix-blend-multiply text-blue-600 text-start text-lg md:text-lg font-bold mt-5 max-w-xs">
            درمانگاه شبانه روزی
          </p>
          <div className="flex flex-col items-center justify-between md:justify-around">
            <p className="mix-blend-multiply text-start text-xs font-normal max-w-md">
              اصفهان-ابتدای اتوبان ذوب‌آهن کوچه 12- پلاک 13
              <br />
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-12">
          {footerLinks?.[0].links.length > 0 && (
            <FooterColumn
              title={footerLinks[0].title}
              links={footerLinks[0].links}
            />
          )}

          <div className="flex-1 flex flex-col gap-4 flex-wrap  ">
            {footerLinks?.[1].links.length > 0 && (
              <FooterColumn
                title={footerLinks[1].title}
                links={footerLinks[1].links}
              />
            )}
          </div>
          <div className="flex-1 justify-between items-center">
            <div className=" flex flex-col gap-4 flex-wrap ">
              {footerLinks?.[2].links.length > 0 && (
                <FooterColumn
                  title={footerLinks[2].title}
                  links={footerLinks[2].links}
                />
              )}
            </div>
          </div>

          {/* <FooterColumn
          title={footerLinks[3].title}
          //   links={footerLinks[3].links.url}
          />
          
          <FooterColumn
          title={footerLinks[6].title}
          //   links={footerLinks[6].links.url}
          /> */}
        </div>
        <Location />
        <p className=" font-semibold  text-center text-black/40 text-sm py-12 ">
          کلیه حقوق مادی و معنوی این وب سایت برای سعید مهمانپرست محفوظ می باشد.
          {/* ©{new Date().getFullYear()} */}
        </p>
      </div>
      {/* <p dir="ltr" className="hidden xl:block text-center text-black/40   ">
        @2023 Saeid_Mehmanparast: +989352310831. All rights reserved
      </p> */}

      {/* <div className="flex justify-between items-center max-sm:flex-col w-full text-sm font-normal  "> */}
      {/* <p className="text-gray">
        <span className="text-black font-semibold">10,214</span> projects
        submitted
        </p> */}
      {/* </div> */}
    </section>
    //   </div>
    // </div>
  )
}
export default Footer

type ColumnProps = {
  title: string
  links: Array<{ title?: string; url: string }>
}

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex-1 flex flex-col gap-2 md:text-sm text-xm min-w-max">
    <h3 className="font-bold text-lg md:text-xl mix-blend-multiply text-blue-400 ">
      {title}
    </h3>
    <ul className="flex flex-col gap-1 font-normal  ">
      {links?.map((link, index) => (
        <Link
          href={link.url}
          key={link.title}
          className={cn(
            'hover:text-gray-600 ',
            index === links.length - 1
              ? 'opacity-70 text-primary pt-2 underline underline-primary  underline-offset-4 font-semibold flex gap-0.5 items-center  '
              : ''
          )}
        >
          {index === links.length - 1 && (
            <ForwardIcon
              className="rotate-270 h-6 w-4 flex-none"
              aria-hidden="true"
            />
          )}
          {link.title}
        </Link>
      ))}
    </ul>
  </div>
)
