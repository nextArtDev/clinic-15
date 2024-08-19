'use server'

import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getDayNameFromIndex } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface CreateBooking {
  time: string
  availabilityDay: string
  doctorId: string
  day: string
}

export const createBooking = async ({
  time,
  availabilityDay,
  doctorId,
  day,
}: CreateBooking) => {
  try {
    // console.log({ time, availabilityDay, doctorId, day })
    const user = await currentUser()
    if (!user?.id) redirect('/login')
    const availability = await prisma.availability.findFirst({
      where: {
        availableDay: getDayNameFromIndex(+availabilityDay),
        doctorId: doctorId,
      },
    })
    console.log(availability)
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        slot: time,
        availabilityId: availability?.id,
      },
    })

    const bookedDayUpdate = await prisma.bookedDay.create({
      data: {
        day,
        timeSlotId: timeSlot?.id,
        isBooked: true,
        // availabilityId: availability?.id,
        doctorId,
        userId: user.id,
      },
    })
    console.log(bookedDayUpdate)
    console.log('OK')
    revalidatePath(`/doctor/${doctorId}`)
  } catch (error) {
    console.log(error)
  }
}
