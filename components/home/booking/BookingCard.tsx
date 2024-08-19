'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns-jalali'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { faIR } from 'date-fns/locale'
import jalaali from 'jalaali-js'
import { cn, convertDaysToArray, getDayNameFromIndex } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { motion } from 'framer-motion'
import style from './BookingCard.module.css'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Availability, BookedDay, Doctor, TimeSlot } from '@prisma/client'
import { FC, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

 
import { holidayDays } from '../../../constants/holidays'

 
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { createBooking } from '@/lib/actions/booking/booking'
interface BookingCardProps {
  availabilities:
    | (Availability & {
        times: (TimeSlot & { bookedDays: (BookedDay | null)[] })[] | null
      })[]
    | null
  doctorId: string
  disabledDaysByDoctor?: string[][]
}

const BookingCard: FC<BookingCardProps> = ({
  availabilities,
  doctorId,
  disabledDaysByDoctor,
}) => {
  // console.log(
  //   'dd',
  //   disabledDaysByDoctor?.flatMap((d) => d)
  // )
  const formSchema = z.object({
    dob: z.date({
      required_error: 'A date of birth is required.',
    }),
  })

  const [modal, setModal] = useState('')
  console.log(modal)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [disabledDays, setDisabledDays] = useState<number[] | undefined>([])
  useEffect(() => {
    const disabledDayIndexes = convertDaysToArray(
      availabilities?.map((availability) => availability.availableDay)
    )
    // console.log(disabledDayIndexes)
    setDisabledDays(disabledDayIndexes)
  }, [availabilities])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const handleSlotClick = async ({
    timeId,
    availabilityId,
  }: {
    timeId: string
    availabilityId: string
  }) => {
    // await createBooking({ timeId, availabilityId, doctorId })
    // setTimeSlots(timeSlots.filter((time) => !time.isSame(slot)))
    // setRemovedSlots([...removedSlots, slot])
  }
  const handleTimeClick = (time: any) => {
    setSelectedTime(time === selectedTime ? null : time)

    // setDefaultResultOrder(time)
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await createBooking({
      time: selectedTime,
      availabilityDay: data.dob.getDay().toString(),
      doctorId,
      day: format(data.dob, 'yyyy/MM/dd'),
    })
    console.log(format(data.dob, 'yyyy/MM/dd'))
    console.log(getDayNameFromIndex(data.dob.getDay()))
    // console.log(jalaali.toJalaali(data.dob))
  }
  return (
    <div>
      {/* <Tabs dir="rtl" defaultValue="account" className=" ">
        <TabsList className="flex w-full flex-wrap gap-4">
          {availabilities?.map((availability) => (
            <TabsTrigger
              defaultValue={availability.availableDay?.[0]}
              className=" "
              key={availability.id}
              value={availability.availableDay}
            >
              {availability.availableDay}
            </TabsTrigger>
          ))}
        </TabsList>

        {availabilities?.map((availability) => (
          <TabsContent key={availability.id} value={availability.availableDay}>
            <ul className="flex flex-wrap gap-0.5  ">
              {availability?.times?.map((time) => (
                <li
                  key={time.id}
                  onClick={() =>
                    handleSlotClick({
                      timeId: time.id,
                      availabilityId: availability.id,
                    })
                  }
                  className="space-y-0.5"
                >
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    className="relative w-12"
                  >
                    {time.slot}
                     
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {!selectedTime ? (
            <div className="">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>تاریخ نوبت</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              // format(field.value, '')
                              new Intl.DateTimeFormat('fa-IR').format(
                                field.value
                              )
                            ) : (
                              <span>انتخاب روز</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          classNames={style}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          onDayClick={(date) =>
                            setModal(format(date, 'yyyy/MM/dd'))
                          }
                          disabled={(date) =>
                            date <= new Date() ||
                            date < new Date('1900-01-01') ||
                            !disabledDays?.includes(date.getDay()) ||
                            holidayDays.some(
                              (d) => d === format(date, 'yyyy/MM/dd')
                            ) ||
                            !!disabledDaysByDoctor?.some((d) =>
                              d.includes(format(date, 'yyyy/MM/dd'))
                            )
                          }
                          locale={faIR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      تاریخ نوبت خود را مشخص کنید.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            selectedTime && (
              <article className=" flex flex-col items-center justify-between font-semibold">
                <Card>
                  <CardContent className="flex justify-between min-h-[180px] flex-col max-w-sm mx-auto ">
                    <p className="text-sm text-right ">
                      {' '}
                      {`شما برای روز ${
                        jalaali.toJalaali(form.getValues('dob')).jy
                      }/${jalaali.toJalaali(form.getValues('dob')).jm}/${
                        jalaali.toJalaali(form.getValues('dob')).jd
                      } ساعت ${selectedTime} نوبت رزرو  می‌کنید؟`}
                    </p>
                    <CardFooter>
                      <Button className="w-full" type="submit">
                        تایید نوبت
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              </article>
            )
          )}
          <Dialog open={!!modal} onOpenChange={() => setModal('')}>
            <DialogContent className="w-full mx-auto">
              {/* <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader> */}

              <ScrollArea
                scrollHideDelay={5000}
                className=" h-[270px] flex flex-col justify-between rounded-md "
              >
                {availabilities?.map((availability) => {
                  const selectedDayName = getDayNameFromIndex(
                    form.getValues('dob')?.getDay()
                  )
                  if (availability.availableDay === selectedDayName) {
                    return (
                      <div
                        key={availability.id}
                        className=" h-auto  flex w-full mx-auto flex-wrap gap-1.5 rounded-md "
                      >
                        {/* ... (Optional: Display the availableDay) ... */}
                        {availability?.times?.map((time) => (
                          <Button
                            key={time.id}
                            variant={
                              selectedTime === time.slot ? 'default' : 'outline'
                            }
                            disabled={
                              time.bookedDays.some(
                                (bookDay) => bookDay?.timeSlotId === time.id
                              ) &&
                              time.bookedDays?.some(
                                (bookedDay) =>
                                  bookedDay?.day ===
                                  format(form.getValues('dob'), 'yyyy/MM/dd')
                              )
                            }
                            onClick={() => {
                              handleTimeClick(time.slot)

                              // Handle button click here
                              console.log(time.slot)
                            }}
                            className="text-sm max-w-16 "
                          >
                            {time.slot}
                          </Button>
                        ))}
                      </div>
                    )
                  }
                  return null // Return null if the day doesn't match
                })}
              </ScrollArea>
              <Button
                className="w-full mt-8  "
                // type="submit"
                onClick={() => setModal('')}
                disabled={!selectedTime}
              >
                تایید روز
              </Button>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  )
}

export default BookingCard
