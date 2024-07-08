import React from 'react'

import { prisma } from '@/lib/prisma'
import IllnessForm from './components/IllnessForm'

const IllnessPage = async ({ params }: { params: { illnessId: string } }) => {
  const illness = await prisma.illness.findUnique({
    where: {
      id: params.illnessId,
    },
    //Because array of images is separate model we have to include it, because we want row of url's not array of id's
    include: {
      images: true,
      Doctor: true,
      Specialization: true,
    },
  })

  const specialization = await prisma.specialization.findMany({
    // where: {
    //   doctors: { some: { id: +params.doctorId } },
    // },
  })
  const doctor = await prisma.doctor.findMany({
    // where: {
    //   doctors: { some: { id: +params.doctorId } },
    // },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IllnessForm
          initialData={illness}
          specialization={specialization}
          doctor={doctor}
        />
        {/* <DoctorForm initialData={doctor} specialization={specialization} /> */}
      </div>
    </div>
  )
}

export default IllnessPage
