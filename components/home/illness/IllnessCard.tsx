import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../../ui/button'
import { cn } from '@/lib/utils'
import GlowingCard from '../Doctor/GlowingCard'
import { Illness } from '@prisma/client'

interface IllnessCardProps {
  illness: Illness & { images: { url: string }[] | null }
  className?: string
}

const IllnessCard: FC<IllnessCardProps> = ({ illness, className }) => {
  return (
    <section className={`mt-16   h-auto ${className} `}>
      {/* <Link href={`Diseases/${ill.id}`}>
        <div className=" flex justify-center items-center ">
          <Image
            src={ill.imageUrl[0]}
            width={200}
            height={200}
            className="object-cover aspect-square "
            alt="پروفایل"
          />
        </div> */}
      {/* //animate-fade-in [--animation-delay:600ms] opacity-0 */}
      {/* <div className=" flex flex-col justify-center items-center  max-w-[90%] -mt-1 backdrop-blur-3xl px-2 py-3 rounded-lg text-center ">
          <h2 className="text-base font-semibold">{ill.name}</h2>
          <p className="text-xs text-white/60 pt-2 truncate max-w-[90%] ">
            {ill.description}
          </p>
        </div>
      </Link> */}
      <GlowingCard fromColor="#FFB6C1" viaColor="#ADD8E6" toColor="#FFF8DC">
        <div className=" rounded-2xl   bg-transparent backdrop-blur-sm overflow-hidden ">
          {/* <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2> */}
          <div className=" p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-1">
                <div className="flex-shrink-0 md:ml-8 ">
                  <Image
                    width={200}
                    height={200}
                    className="mx-auto  aspect-square rounded-3xl object-cover shadow-md shadow-gray-400 "
                    src={
                      illness.images?.[0]?.url || '/images/parallax/0000.webp'
                    }
                    alt=""
                  />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-right">
                  <p className="text-xl font-bold pt-4 text-blue-600 sm:text-2xl">
                    {illness.name}
                  </p>
                  <span className="text-black/60 text-right pt-1 px-2 ">
                    <p>
                      {illness.description?.substring(
                        0,
                        illness.description?.indexOf(' ', 100)
                      )}{' '}
                      {'...'}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center text-sm font-medium"
            >
              <span className="text-gray-900">{stat.value}</span>{' '}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))} */}
          <div className=" flex justify-center items-center  py-4 sm:mt-0">
            <Link
              href={`/illnesses/${illness.id}`}
              className={cn(
                buttonVariants(),
                'flex items-center justify-center rounded-md  px-8 py-2 text-sm font-semibold  shadow-md shadow-white text-yellow-500 outline-black outline-dashed -outline-offset-2 ring-1 ring-inset ring-white-300 '
              )}
            >
              صفحه بیماری
            </Link>
          </div>
        </div>
      </GlowingCard>
    </section>
  )
}

export default IllnessCard

// function convertTextToJSX(text) {
//   const lines = text.split('\n')
//   const jsxElements = []

//   for (let i = 0; i < lines.length; i++) {
//     let line = lines[i].trim()

//     if (line.startsWith('- ')) {
//       // Convert numbered list item
//       line = line.replace('- ', '')
//       jsxElements.push(<li key={i}>{line}</li>)
//     } else if (line) {
//       // Convert normal text line
//       jsxElements.push(<p key={i}>{line}</p>)
//     }
//   }

//   return <div>{jsxElements}</div>
// }
//another
// function convertTextToJSX(text) {
//   const lines = text.split('\n')
//   const jsxLines = lines.map((line, index) => {
//     if (line.trim() === '') {
//       return <br key={index} />
//     } else if (/^\d+\. /.test(line)) {
//       const listItemText = line.replace(/^\d+\. /, '')
//       return <li key={index}>{listItemText}</li>
//     }
//     return line
//   })

//   return <div>{jsxLines}</div>
// //
