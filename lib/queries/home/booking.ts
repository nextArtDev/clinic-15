'use server'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns-jalali'
import moment from 'moment'

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

interface getAllBookedDaysProps {
  page?: number
  pageSize?: number
}
export const getAllBookedDays = async (params: getAllBookedDaysProps) => {
  const { page = 1, pageSize = 100 } = params
  const skipAmount = (page - 1) * pageSize

  try {
    const allBookedDays = await prisma.timeSlot.findMany({
      where: {
        bookedDays: {
          some: {
            isBooked: true,
          },
        },
      },
      skip: skipAmount,
      take: pageSize,
    })

    const allCompleteBookedDays = await Promise.all(
      allBookedDays?.map(async (slot: any) => {
        return await prisma.bookedDay.findMany({
          where: {
            timeSlotId: slot.id,
            day: {
              gte: format(Date.now(), 'yyyy/MM/dd'),
              // gte: '1403/06/28',
            },
          },
          include: {
            doctor: { select: { name: true } },
            timeSlot: {
              select: {
                slot: true,
              },
            },
            user: true,
          },

          orderBy: {
            day: 'desc',
          },
        })
      })
    )
    // allCompleteBookedDays.map((b) =>
    //   b.map((a) => console.log(a.day > '1403/08/30'))
    // )
    // console.log('m', format(Date.now(), 'yyyy/MM/dd'))
    const totalBookedDays = await prisma.bookedDay.count()
    // console.log('totalBookedDays', totalBookedDays)

    // Calculate if there are more questions to be fetched
    const isNext = totalBookedDays > skipAmount + allBookedDays.length
    return { booked: allCompleteBookedDays.flat(), isNext }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCancelledBookedDays = async () => {
  try {
    const cancelledDays = await prisma.timeSlot.findMany({
      where: {
        availabilityId: null,
      },
    })
    if (cancelledDays.length === 0) return null

    const allCancelledBookedDays = await Promise.all(
      cancelledDays?.map(async (slot: any) => {
        return await prisma.bookedDay.findMany({
          where: {
            timeSlotId: slot.id,
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
      })
    )

    return allCancelledBookedDays.flat()
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
