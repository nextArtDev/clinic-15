'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useCallback, useMemo, useState } from 'react'
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

  const handlePresStep = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }, [step])
  const handleNextStep = useCallback(() => {
    if (step < 3) {
      setStep((prev) => prev + 1)
    }
  }, [step])

  return useMemo(
    () => ({ step, setStep, handlePresStep, handleNextStep }),
    [handleNextStep, handlePresStep, step]
  )
}
