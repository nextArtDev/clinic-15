import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const createDoctorSchema = z.object({
  name: z.string().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  phone: z
    .string()
    .regex(new RegExp('^(09|۰۹)\\d{9}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .optional(),
  website: z
    .string()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .optional(),
  description: z.string().optional(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  //   main_image: z
  //     .string()
  //     .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //     .url()
  //     .optional(),
  images: z.any().optional(),
  // .array()  satisfies Prisma.ImagesUncheckedCreateNestedManyWithoutDoctorInput,
  // booking: z.object({ booking_time: z.date() }).array().optional(),
  //Because we're working with Decimal, we should add "coerce"
  price: z.coerce.number().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  specializationId: z
    .string()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .optional(),
}) satisfies z.Schema<Prisma.DoctorUncheckedCreateInput>

export const createIllnessSchema = z.object({
  name: z.string().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  description: z.string(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  //   main_image: z
  //     .string()
  //     .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //     .url()
  //     .optional(),
  images: z.any().optional(),
  // .array()  satisfies Prisma.ImagesUncheckedCreateNestedManyWithoutDoctorInput,
  // booking: z.object({ booking_time: z.date() }).array().optional(),
  //Because we're working with Decimal, we should add "coerce"
  specializationId: z
    .string()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .optional(),
  doctorId: z
    .string()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .optional(),
}) satisfies z.Schema<Prisma.IllnessUncheckedCreateInput>

export const createSpecializationSchema = z.object({
  name: z.string().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  description: z.string(),
  // open_time: z.string().optional(),
  // close_time: z.string().optional(),
  //   main_image: z
  //     .string()
  //     .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //     .url()
  //     .optional(),
  images: z.any().optional(),
  // .array()  satisfies Prisma.ImagesUncheckedCreateNestedManyWithoutDoctorInput,
  // booking: z.object({ booking_time: z.date() }).array().optional(),
  //Because we're working with Decimal, we should add "coerce"
  // illnessId: z.coerce
  //   .number()
  //   .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //   .optional(),
  // doctorId: z
  //   .string()
  //   .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //   .optional(),
}) satisfies z.Schema<Prisma.SpecializationUncheckedCreateInput>
