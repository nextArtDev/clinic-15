'use server'

import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  bookingFormSchema,
  createBookingFormSchema,
} from '@/lib/schemas/booking'
import { getDayNameFromIndex } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sendBookingSms } from '../auth/sms'
import { PhoneSchema } from '@/lib/schemas/auth'
import { z } from 'zod'

interface CreateBookingFormState {
  // success?: string
  errors: {
    dob?: string[]
    time?: string[]
    // day?: string[]
    // doctorId?: string[]

    _form?: string[]
  }
}
interface CreateBooking {
  time: string
  availabilityDay: string
  doctorId: string
  day: string
}
//  createBooking(
//    formData,
//    selectedTime,
//    format(data.dob, 'yyyy/MM/dd'),
//    doctorId,
//    path
//  )
export async function createBooking(
  formData: FormData,
  // time: string,
  day: string,
  doctorId: string,
  path: string
): Promise<CreateBookingFormState> {
  const result = createBookingFormSchema.safeParse({
    dob: formData.get('dob'),
    time: formData.get('time'),
  })
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  // console.log('res', result.data)
  try {
    const user = await currentUser()
    // console.log(!user?.id)
    if (!user?.id)
      return {
        errors: {
          _form: ['شمااجازه دسترسی ندارید، به حساب کاربری خود وارد شوید.'],
        },
      }

    // if (!user) {
    //   return {
    //     errors: {
    //       _form: ['شمااجازه دسترسی ندارید!'],
    //     },
    //   }
    // }
    // if (user.role !== 'ADMIN') {
    //   return {
    //     errors: {
    //       _form: ['شمااجازه دسترسی ندارید!'],
    //     },
    //   }
    // }

    const doctor = await prisma.doctor.findFirst({
      where: {
        id: doctorId,
      },
    })
    if (!doctor)
      return {
        errors: {
          _form: ['این نوبت در دسترس نیست!'],
        },
      }
    const availability = await prisma.availability.findFirst({
      where: {
        availableDay: getDayNameFromIndex(+result.data.dob),
        doctorId: doctorId,
      },
    })
    // console.log(availability)
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        slot: result.data.time,
        availabilityId: availability?.id,
      },
    })
    const isBookedBefore = await prisma.bookedDay.findFirst({
      where: {
        day,
        timeSlotId: timeSlot?.id,
        doctorId,
        userId: user.id,
      },
    })
    if (isBookedBefore)
      return {
        errors: {
          _form: ['این نوبت قبلا رزرو شده است!'],
        },
      }
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
    if (user.name && user.phone && doctor.name) {
      const sms = await sendBookingSms({
        values: { phone: user.phone },
        dayTime: `${day} ساعت ${result.data.time}`,
        doctorName: doctor.name,
        name: user.name,
      })
      // console.log('OK', sms)
    }
    // console.log(bookedDayUpdate)
    // revalidatePath(path)
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['مشکلی پیش آمده، لطفا دوباره امتحان کنید!'],
        },
      }
    }
  }

  revalidatePath(path)

  redirect(`/user`)
}
