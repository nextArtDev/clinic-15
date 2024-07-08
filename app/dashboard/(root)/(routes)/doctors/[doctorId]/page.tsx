import React from 'react'

import { prisma } from '@/lib/prisma'
import DoctorForm from './components/DoctorForm'

const DoctorPage = async ({ params }: { params: { doctorId: string } }) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: params.doctorId,
    },
    //Because array of images is separate model we have to include it, because we want row of url's not array of id's
    include: {
      images: true,
      // bookings: true,
      specialization: true,
    },
  })

  const specialization = await prisma.specialization.findMany({
    where: {
      doctors: { some: { id: params.doctorId } },
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorForm initialData={doctor} specialization={specialization} />
        {/* <DoctorForm initialData={doctor} specialization={specialization} /> */}
      </div>
    </div>
  )
}

export default DoctorPage
