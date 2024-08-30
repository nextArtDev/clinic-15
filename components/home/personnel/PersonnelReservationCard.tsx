import style from '../Doctor/DoctorReservationCard.module.css'
import { cn } from '@/lib/utils'
import { Personnel } from '@prisma/client'
import Image from 'next/image'
import BoxReveal from '../BoxReveal'
import SvgShadow from '../SvgShadow'

type Props = {
  personnel: Personnel & { images: { url: string | null }[] } & {}
  dir?: string
  isVertical?: boolean
}

function PersonnelReservationCard({
  personnel,
  dir,
  isVertical = false,
}: Props) {
  return (
    <div
      dir={dir}
      style={{
        background:
          // 'linear-gradient(to bottom, #fff8dc 0%, #add8e6 60%, #ffb6c1 100%)',
          'linear-gradient(to bottom, #add8e6 0%, #fff8dc 60%, #30e8bf60 100%)',
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
            <p
              className={` text-xl text-secondary font-semibold ${style.title}`}
            >
              {personnel.name}
            </p>

            <BoxReveal boxColor="transparent">
              <p className={'text-sm px-1 text-muted'}>
                {personnel.description}
              </p>
            </BoxReveal>
          </div>
        </div>
        <div
          className={`${style.eight} ${
            isVertical ? 'flex-col-reverse' : ''
          } w-36 h-36  rounded-full overflow-hidden self-center `}
        >
          <Image
            fill
            alt={personnel.name}
            className="eight object-cover"
            src={personnel?.images?.[0]?.url || '/2.jpeg'}
          />
          {/* <div className="absolute inset-0 bg-[#c33c3345]"></div> */}
        </div>
      </div>
    </div>
  )
}

export default PersonnelReservationCard
