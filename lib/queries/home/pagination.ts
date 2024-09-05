'use server'

import { prisma } from '@/lib/prisma'

export interface GetBookedDaysByUserIdParams {
  id: string
  page?: number
  pageSize?: number
}

export const getBookedDaysByUserId = async (
  params: GetBookedDaysByUserIdParams
) => {
  try {
    const { id, page = 1, pageSize = 10 } = params

    const skipAmount = (page - 1) * pageSize

    const bookedDays = await prisma.bookedDay.findMany({
      where: { userId: id },
      include: {
        doctor: {
          select: {
            name: true,
          },
        },
      },
      skip: skipAmount,
      take: pageSize,
    })

    const totalBookedDays = await prisma.bookedDay.count({
      where: { userId: id },
    })

    // Calculate if there are more questions to be fetched
    const isNext = totalBookedDays > skipAmount + bookedDays.length

    return { bookedDays, isNext }
  } catch (error) {
    console.log(error)
  }
}
