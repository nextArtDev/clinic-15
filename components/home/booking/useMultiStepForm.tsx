'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const bookingFormSchema = z.object({
  dob: z.date({
    required_error: 'انتخاب تاریخ الزامی است.',
  }),
  time: z.string().optional(),
})

export const useMultiStepForm = () => {
  const [step, setStep] = useState(1)
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      dob: undefined,
      time: '',
    },
  })

  async function onSubmit(data: z.infer<typeof bookingFormSchema>) {
    // console.log(data)
    console.log('data', data)
    const formData = new FormData()

    formData.append('dob', data.dob.getDay().toString())
    // try {
    //   startTransition(() => {
    //     createBooking(
    //       formData,
    //       selectedTime,
    //       format(data.dob, 'yyyy/MM/dd'),
    //       doctorId,
    //       path
    //     )
    //       .then((res) => {
    //         if (res?.errors?.dob) {
    //           form.setError('dob', {
    //             type: 'custom',
    //             message: res?.errors.dob?.join(' و '),
    //           })
    //         } else if (res?.errors?._form) {
    //           form.setError('root', {
    //             type: 'custom',
    //             message: res?.errors?._form?.join(' و '),
    //           })
    //           toast.error(res?.errors._form?.join(' و '))
    //         } else {
    //           toast.success('نوبت شما رزرو شد')
    //         }
    //       })
    //       .catch(() => console.log('مشکلی پیش آمده.'))
    //   })
    // } catch (error) {
    //   toast.error('مشکلی پیش آمده، لطفا دوباره امتحان کنید!')
    // }
  }

  const handlePresStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }
  const handleNextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1)
    }
  }
  return {
    step,
    setStep,
    form,
    onSubmit,
    handlePresStep,
    handleNextStep,
  }
}
