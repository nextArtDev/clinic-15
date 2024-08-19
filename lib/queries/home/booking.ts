import { prisma } from '@/lib/prisma'

export const getAllAvailabilitiesByDoctorId = async (id: string) => {
  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        doctorId: id,
      },
      include: {
        times: {
          include: { bookedDays: true },
          orderBy: {
            slot: 'asc',
          },
        },
        disableDays: true,
      },
    })

    // console.log('Availabilities for doctorId:', id, availabilities)
    return availabilities
  } catch (error) {
    console.log(error)
  }
  //   const availabilities = prisma.availability.findMany({
  //     where: {
  //       doctorId: id,
  //     },
  //   })
}

export const getAllBookedDays = async () => {
  try {
    const bookedDays = await prisma.bookedDay.findMany({
      where: {},
      include: {
        doctor: true,
        timeSlot: true,
        user: true,
      },
      orderBy: {
        day: 'desc',
      },
    })

    // console.log('bookedDays for doctorId:', bookedDays)
    return bookedDays
  } catch (error) {
    console.log(error)
  }
}

export const getAllBookedDaysByDoctorId = async (id: string) => {
  try {
    const bookedDays = await prisma.bookedDay.findMany({
      where: {
        doctorId: id,
      },
      include: {
        doctor: true,
        timeSlot: true,
        user: true,
      },
      orderBy: {
        day: 'desc',
      },
    })

    // console.log('bookedDays for doctorId:', id, bookedDays)
    return bookedDays
  } catch (error) {
    console.log(error)
  }
  //   const availabilities = prisma.availability.findMany({
  //     where: {
  //       doctorId: id,
  //     },
  //   })
}
