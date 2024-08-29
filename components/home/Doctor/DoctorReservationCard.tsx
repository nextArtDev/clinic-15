import Image from 'next/image'
import style from './DoctorReservationCard.module.css'
import { DateTag, Doctor } from '@prisma/client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import BoxReveal from '../BoxReveal'
import { StarRating } from '../StarRating'
import { Heart } from 'lucide-react'
import SvgShadow from '../SvgShadow'

type Props = {
  doctor: Doctor & { images: { url: string | null }[] } & {
    open_time: DateTag[] | null
    averageRating?: number | null
  }
  dir?: string
  isVertical?: boolean
}

function DoctorReservationCard({
  doctor,
  dir = 'rtl',
  isVertical = false,
}: Props) {
  return (
    <div
      dir={dir}
      style={{
        background:
          'linear-gradient(to bottom, #fff8dc 0%, #add8e6 60%, #ffb6c1 100%)',
      }}
      className={cn(
        ` relative  rounded-xl overflow-hidden  `,
        isVertical ? 'max-w-sm w-[94vw] h-[50vh]' : 'w-[400px] h-48'
      )}
    >
      <SvgShadow />
      <div
        className={cn(
          ' w-full h-full flex   px-1.5  ',
          isVertical ? 'flex-col   ' : 'justify-around items-center'
        )}
      >
        <div
          className={cn(
            ' flex flex-col items-center ',
            isVertical ? 'h-fit pb-2' : 'pt-2 justify-between h-full'
          )}
        >
          <div className="pt-6 flex flex-col gap-2 items-center text-center ">
            {doctor.averageRating && (
              <article className="pb-2 -mt-2">
                <BoxReveal boxColor="transparent" duration={0.7}>
                  <StarRating
                    disabled
                    numStars={doctor.averageRating}
                    value={doctor.averageRating}
                    // icon={Heart}
                    iconProps={{ className: 'size-5' }}
                  />
                </BoxReveal>
              </article>
            )}
            <p
              className={` text-xl text-secondary font-semibold ${style.title}`}
            >
              دکتر {doctor.name}
            </p>

            <BoxReveal boxColor="transparent">
              <p className={'text-sm px-1 text-muted'}>{doctor.description}</p>
            </BoxReveal>
            {/* <Separator className="my-1 text-muted opacity-40 " /> */}
          </div>
          <ul
            className={cn(
              'font-semibold',
              isVertical
                ? 'flex flex-wrap gap-x-2 py-4 order-4 items-center '
                : 'absolute inset-0 bottom-1.5 z-[1] flex items-end pb-1  gap-1 ',
              dir === 'ltr' ? 'left-4' : 'right-4'
            )}
          >
            {doctor?.open_time?.map((booking) => (
              <li key={booking.id} className={'text-base text-muted '}>
                <BoxReveal boxColor="transparent">
                  <span
                    style={{ borderRadius: '7px' }}
                    className=" !custom-box-shadow text-xs border border-green-700/40 text-green-700 px-1 "
                  >
                    {booking.time}
                  </span>
                </BoxReveal>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${style.eight} ${
            isVertical ? 'flex-col-reverse' : ''
          } w-36 h-36  rounded-full overflow-hidden self-center `}
        >
          <Image
            fill
            alt={doctor.name}
            className="eight object-cover"
            src={doctor?.images?.[0]?.url || '/2.jpeg'}
          />
          {/* <div className="absolute inset-0 bg-[#c33c3345]"></div> */}
        </div>
      </div>
    </div>
  )
}

export default DoctorReservationCard
