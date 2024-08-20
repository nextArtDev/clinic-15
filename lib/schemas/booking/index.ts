import { z } from 'zod'

export const bookingFormSchema = z.object({
  dob: z.date({
    required_error: 'انتخاب تاریخ الزامی است.',
  }),
})
export const createBookingFormSchema = z.object({
  dob: z.string({
    required_error: 'انتخاب تاریخ الزامی است.',
  }),
})
