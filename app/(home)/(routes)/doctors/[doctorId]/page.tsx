import DoctorPersonalPage from '@/components/home/Doctor/DoctorPersonalPage'
import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getDoctorById } from '@/lib/queries/home'
import { notFound } from 'next/navigation'

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

  return (
    <div className="grainy min-h-screen ">
      <DoctorPersonalPage
        doctor={doctor.doctor}
        rate={doctor.rate}
        beforeRated={beforeRated}
        user={userWithPic}
      />
    </div>
  )
}

export default DoctorPage
