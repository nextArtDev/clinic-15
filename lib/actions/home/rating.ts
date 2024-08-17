'use server'

import { auth } from '@/auth'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createReviewActionSchema } from '@/lib/schemas/rating'

interface CreateReviewFormState {
  errors: {
    comment?: string[]
    rating?: string[]
    _form?: string[]
  }
}

export async function createReview(
  formData: FormData,
  path: string,
  userId: string,
  doctorId: string
): Promise<CreateReviewFormState> {
  const result = createReviewActionSchema.safeParse({
    comment: formData.get('comment'),
    rating: formData.get('rating'),
  })
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }
  const session = await auth()
  if (!session || !session.user) {
    redirect('/login')
    // return {
    //   errors: {
    //     _form: ['برای نظر دهی ابتدا باید عضو شوید.']
    //   },
    // }
  }
  if (!doctorId) {
    return {
      errors: {
        _form: ['لطفا بعدا امتحان کنید!'],
      },
    }
  }

  const doctor = await prisma.doctor.findFirst({
    where: {
      id: doctorId,
    },
  })

  let reviewId
  if (doctor?.id) {
    reviewId === doctor.id
  } else {
    return {
      errors: {
        _form: ['صفحه حذف شده است!'],
      },
    }
  }

  try {
    if (doctor?.id) {
      const alreadyRated = await prisma.review.findFirst({
        where: {
          doctorId,
          userId,
        },
      })
      if (alreadyRated) {
        return {
          errors: {
            _form: ['شما قبلا نظر خود را ثبت کرده‌اید!'],
          },
        }
      }

      const review = await prisma.review.create({
        data: {
          comment: result.data.comment,
          rating: +result.data.rating,
          userId: session.user.id,
          doctorId: doctor.id,
        },
      })
    }
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
  redirect(path)
}

interface CreateClinicReviewFormState {
  errors: {
    comment?: string[]
    rating?: string[]
    _form?: string[]
  }
}

export async function createClinicReview(
  formData: FormData,
  path: string,
  userId: string
): Promise<CreateClinicReviewFormState> {
  const result = createReviewActionSchema.safeParse({
    comment: formData.get('comment'),
    rating: formData.get('rating'),
  })
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }
  const session = await auth()
  if (!session || !session.user) {
    redirect('/login')
    // return {
    //   errors: {
    //     _form: ['برای نظر دهی ابتدا باید عضو شوید.']
    //   },
    // }
  }

  try {
    const alreadyRated = await prisma.review.findFirst({
      where: {
        isFaq: true,
        userId,
      },
    })
    if (alreadyRated) {
      return {
        errors: {
          _form: ['شما قبلا نظر خود را ثبت کرده‌اید!'],
        },
      }
    }

    await prisma.review.create({
      data: {
        comment: result.data.comment,
        rating: +result.data.rating,
        userId: session.user.id,
        isFaq: true,
      },
    })
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
  redirect(path)
}
