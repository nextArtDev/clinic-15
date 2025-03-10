import DoctorPersonalPage from '@/components/home/Doctor/DoctorPersonalPage'
import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getDoctorById } from '@/lib/queries/home'
import { getAllAvailabilitiesByDoctorId } from '@/lib/queries/home/booking'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { doctorId: string }
}): Promise<Metadata> {
  const doctor = await getDoctorById({ id: params.doctorId })

  return {
    title: 'دکتر' + ' ' + doctor?.doctor?.name,
    description: doctor?.doctor?.description,
    openGraph: {
      images: [
        {
          url:
            doctor?.doctor?.images?.[0]?.url ||
            '/images/blank-profile-picture.png',
        },
      ],
    },
  }
}
const DoctorPage = async ({ params }: { params: { doctorId: string } }) => {
  const doctor = await getDoctorById({ id: params.doctorId })
  if (!doctor?.doctor) notFound()

  const user = await currentUser()
  const userWithPic = await prisma.user.findFirst({
    where: { id: user?.id },
    include: { image: { select: { url: true } } },
  })
  const beforeRated = await prisma.review.findFirst({
    where: {
      userId: user?.id,
      doctorId: doctor?.doctor?.id,
    },
    select: {
      rating: true,
    },
  })

  const availabilities = await getAllAvailabilitiesByDoctorId(params.doctorId)
  // console.log(availabilities)
  const disabledDaysByDoctor = availabilities?.map((availability) =>
    availability.disableDays.map((disabled) => disabled.day)
  )

  // const bookedDays = await prisma.bookedDay.findMany({
  //   where: {
  //     timeSlot: {
  //       Availability: {
  //         doctorId: doctor.doctor.id,
  //       },
  //     },
  //   },
  //   include: {
  //     timeSlot: true,
  //   },
  // })

  return (
    <div className="grainy min-h-screen ">
      <DoctorPersonalPage
        doctor={doctor.doctor}
        rate={doctor.rate}
        beforeRated={beforeRated}
        user={userWithPic}
        availabilities={availabilities}
        disabledDaysByDoctor={disabledDaysByDoctor}
        // bookedDays={bookedDays}
      />
    </div>
  )
}

export default DoctorPage
