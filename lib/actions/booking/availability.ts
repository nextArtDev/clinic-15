'use server'

import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SplitterTime } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

import { redirect } from 'next/navigation'
import { sendCancelBookingSms } from '../auth/sms'
import { getUserById } from '@/lib/queries/auth/user'
import { getDoctorById } from '@/lib/queries/home'

export type AvailableDays = {
  dayName: string
  endTime: string
  startTime: string
  selected?: boolean
}

interface CreateAvailability {
  days: AvailableDays[]
  doctorId: string
  slicer: string
}

export const createAvailability = async ({
  days,
  doctorId,
  slicer,
}: CreateAvailability) => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/login')
  }
  if (user.role !== 'ADMIN') {
    return {
      errors: {
        _form: ['شمااجازه دسترسی ندارید!'],
      },
    }
  }
  try {
    const doctorAvailability = await prisma.doctor.findFirst({
      where: {
        id: doctorId,
        availability: {
          some: {},
        },
      },
    })
    // console.log(doctorAvailability)

    if (!doctorAvailability) {
      const newAvailabilityDays = await Promise.all(
        days.map(async (day) => {
          const availability = await prisma.availability.create({
            data: {
              availableDay: day.dayName,
              doctorId: doctorId,
            },
          })
          const slots = SplitterTime({
            range: +slicer,
            start: day.startTime,
            end: day.endTime,
          })
          const times = await Promise.all(
            slots.map(async (slot) => {
              return await prisma.timeSlot.create({
                data: {
                  slot,
                  availabilityId: availability.id,
                },
              })
            })
          )

          // const times = await Promise.all(
          //   slots.map(async (slot) => {
          //     return await prisma.timeSlot.upsert({
          //       where: { slot },
          //       update: {},
          //       create: {
          //         slot,
          //       },
          //     })
          //   })
          // )

          // await prisma.availability.update({
          //   where: { id: availability.id },
          //   data: {
          //     times: { connect: times.map((time) => time) },
          //     doctor: { connect: { id: +doctorId } },
          //   },
          // })
        })
      )
      // console.log('newAvailabilityDays', newAvailabilityDays)
    } else {
      const allAvailabilities = await prisma.availability.findMany({
        where: {
          doctorId,
        },
      })
      // console.log(
      //   'all Availability days',
      //   allAvailabilities.map((all) => all.availableDay)
      // )
      // console.log(
      //   'days',
      //   days.map((day) => day.dayName)
      // )
      const storedAvailabilityDays = allAvailabilities.map(
        (all) => all.availableDay
      )
      const enteredAvailabilityDays = days.map((day) => day.dayName)
      // console.log('enteredAvailabilityDays', enteredAvailabilityDays)

      const commonAvailabilityDays = enteredAvailabilityDays.filter((element) =>
        storedAvailabilityDays.includes(element)
      )
      // console.log('commonAvailabilityDays', commonAvailabilityDays)

      const newAvailabilityDaysEntered = enteredAvailabilityDays.filter(
        (element) => !storedAvailabilityDays.includes(element)
      )

      // console.log('newAvailabilityDaysEntered', newAvailabilityDaysEntered)

      const storedAvailabilityDaysShouldTrashIfNotBooked =
        storedAvailabilityDays.filter(
          (element) => !enteredAvailabilityDays.includes(element)
        )
      // console.log(
      //   'storedAvailabilityDaysShouldTrashIfNotBooked',
      //   storedAvailabilityDaysShouldTrashIfNotBooked
      // )

      if (storedAvailabilityDaysShouldTrashIfNotBooked) {
        await Promise.all(
          storedAvailabilityDaysShouldTrashIfNotBooked?.map(async (d) => {
            const dayToDisconnect = await prisma.availability.findFirst({
              where: {
                availableDay: d,
                doctorId,
              },
              include: {
                times: { include: { bookedDays: true } },
              },
            })

            // Disconnecting all the old stored times

            // console.log('dayToDisconnect', dayToDisconnect)
            // const bookedOldSlots = dayToDisconnect?.times?.filter((slot) =>
            //   slot?.bookedDays.some((booked) => booked.isBooked)
            // )

            // const nonBookedSlotsToDelete = dayToDisconnect?.times.filter(
            //   (slot) => !bookedOldSlots?.includes(slot)
            // )
            if (dayToDisconnect) {
              const allOldSlots = await Promise.all(
                dayToDisconnect.times?.map(async (s) => {
                  return await prisma.timeSlot.findMany({
                    where: { id: s.id },
                    include: {
                      bookedDays: true,
                    },
                    // data: { availabilityId: null },
                  })
                })
              )
              // console.log('allOldSlots', allOldSlots)

              const oldSlotsExceptBooked = allOldSlots.flat().filter((slot) => {
                return !slot.bookedDays || slot.bookedDays.length === 0
              })
              // console.log('OldBookedSlots', oldSlotsExceptBooked)

              const OldBookedSlots = allOldSlots.flat().filter((slot) => {
                return slot.bookedDays && slot.bookedDays.length > 0
              })

              // console.log(
              //   'OldBookedSlots',
              //   OldBookedSlots.map((d) => d.bookedDays)
              // )

              // const sendSmsForBooked = await Promise.all(
              //   OldBookedSlots.map( (slot) => slot.bookedDays.map(async ({id, day, userId})=>{})
              //     return await prisma.timeSlot.findMany({
              //       where: { id: s.id },
              //       include: {
              //         bookedDays: true,
              //       },
              //       // data: { availabilityId: null },
              //     })
              //   })
              // )
              OldBookedSlots.map((slot) =>
                slot.bookedDays.map(async ({ day, userId, doctorId }) => {
                  const user = await getUserById(userId)
                  const doctor = await getDoctorById({ id: doctorId })
                  // console.log('sms', user?.name, user?.phone, day)
                  if (user?.name && user?.phone && doctor?.doctor?.name) {
                    sendCancelBookingSms({
                      values: { phone: user?.phone },
                      name: user?.name,
                      dayTime: day,
                      doctorName: doctor?.doctor?.name,
                    })
                  }
                })
              )

              // console.log('oldSlotsExceptBooked', oldSlotsExceptBooked.flat())
              // console.log('allOldSlots.length', allOldSlots.length)
              // console.log(
              //   'oldSlotsExceptBooked.length',
              //   oldSlotsExceptBooked.length
              // )

              // const oldSlotsBooked = await Promise.all(
              //   allOldSlots?.map(async (slot: any) => {
              //     if (slot.id) {
              //       return await prisma.timeSlot.findMany({
              //         where: {
              //           id: slot.id,
              //           bookedDays: {
              //             some: {
              //               isBooked: true, // Find time slots that have at least one booked day
              //             },
              //           },
              //         },
              //         // data: {
              //         //   availabilityId: null,
              //         // },
              //       })
              //     }
              //   })
              // )

              // Disconnecting booked from timeSlot if needed!

              // if (OldBookedSlots.length > 0) {
              //   const disconnectBooked = await Promise.all(
              //     OldBookedSlots?.flat().map(async (slot: any) => {
              //       return await prisma.bookedDay.updateMany({
              //         where: {
              //           timeSlotId: slot.id,
              //         },
              //         data: {
              //           timeSlotId: null,
              //         },
              //       })
              //     })
              //   )
              //   console.log('disconnectBooked', disconnectBooked)
              // }
              // const oldSlotsBookedDisconnection = await Promise.all(
              //   oldSlotsBooked?.map(async (slot: any) => {
              //     return await prisma.timeSlot.update({
              //       where: {
              //         id: slot.id,
              //       },
              //       data: {
              //         availabilityId: null,
              //       },
              //     })
              //   })
              // )
              // console.log(
              //   'oldSlotsBookedDisconnection',
              //   oldSlotsBookedDisconnection.map((oldBooked) => oldBooked)
              // )

              // if (oldSlotsBooked.length > 0) {
              //   const OldBookedSlots = await Promise.all(
              //     oldSlotsBooked?.map(async (slot: any) => {
              //       return await prisma.timeSlot.update({
              //         where: {
              //           id: slot.id,
              //           bookedDays: {
              //             some: {
              //               isBooked: true,
              //             },
              //           },
              //         },
              //         data: {
              //           availabilityId: null,
              //         },
              //       })
              //     })
              //   )
              //   console.log('OldBookedSlots', OldBookedSlots)
              // }
              if (oldSlotsExceptBooked.length > 0) {
                const deleteOldSlotsExceptBooked = await Promise.all(
                  oldSlotsExceptBooked?.map(async (slot: any) => {
                    return await prisma.timeSlot.deleteMany({
                      where: {
                        id: slot.id,
                      },
                    })
                  })
                )
                // console.log(
                //   'deleteOldSlotsExceptBooked',
                //   deleteOldSlotsExceptBooked
                // )
              }

              // if (OldBookedSlots.length > 0) {
              //   const updatedToDisconnect = await Promise.all(
              //     OldBookedSlots?.map(async (slot: any) => {
              //       return await prisma.bookedDay.update({
              //         where: { id: slot.id },
              //         data: { availabilityId: null },
              //       })
              //     })
              //   )
              //   console.log('updatedToDisconnect', updatedToDisconnect)
              // }
            }

            const disconnectedTimes = await prisma.availability.update({
              where: {
                id: dayToDisconnect?.id,
              },
              data: {
                times: {
                  disconnect: dayToDisconnect?.times?.map((time) => ({
                    id: time.id,
                  })),
                },
              },
            })
            // console.log('disconnectedTimes', disconnectedTimes)
            //   // const findDeletAvblity = await prisma.availability.findFirst({
            //   //   where: {
            //   //     availableDay: day,
            //   //     id:dayToDisconnect?.id,
            //   //   },
            //   // })

            const disconnectedDoctorDays = await prisma.availability.update({
              where: {
                // availableDay: day,
                // doctorId: +doctorId,
                id: dayToDisconnect?.id,
              },
              data: {
                doctorId: null,
              },
              //   // include: {
              //   //   times: { include: { bookedDays: true } },
              //   // },
            })

            // console.log('disconnectedDoctorDays ', disconnectedDoctorDays)

            const deletedAvailability = await prisma.availability.delete({
              where: {
                id: disconnectedDoctorDays?.id,
              },
            })
            // console.log('deletedAvailability', deletedAvailability)
          })
        )
      }
      ///////////////////////////////////////////////////////
      await Promise.all(
        days.map(async (day) => {
          const availability = await prisma.availability.findFirst({
            where: {
              availableDay: day.dayName,
              doctorId,
            },
            include: {
              times: true,
            },
          })
          const enteredSlots = SplitterTime({
            range: +slicer,
            start: day.startTime,
            end: day.endTime,
          })
          if (!availability?.id) {
            const availability = await prisma.availability.create({
              data: {
                availableDay: day.dayName,
                doctorId,
              },
            })
            const times = await Promise.all(
              enteredSlots.map(async (slot) => {
                return await prisma.timeSlot.create({
                  data: {
                    slot,
                    availabilityId: availability.id,
                  },
                })
              })
            )
          } else {
            const storedSlices = availability.times.map((time) => time.slot)
            // console.log('enteredSlots', enteredSlots)
            // console.log('storedSlices', storedSlices)

            const commonSlices = enteredSlots.filter((element) =>
              storedSlices.includes(element)
            )
            // console.log('commonSlices', commonSlices)

            const newSlicesEntered = enteredSlots.filter(
              (element) => !storedSlices.includes(element)
            )
            const storedSlicesShouldTrashIfNotBooked = storedSlices.filter(
              (element) => !enteredSlots.includes(element)
            )
            // console.log('newSlicesEntered', newSlicesEntered)
            // console.log(
            //   'storedSlicesShouldTrashIfNotBooked',
            //   storedSlicesShouldTrashIfNotBooked
            // )

            const newToStoreToDb = await Promise.all(
              newSlicesEntered.map(async (slot: string) => {
                return await prisma.timeSlot.create({
                  data: { slot, availabilityId: availability?.id },
                })
              })
            )
            await prisma.availability.update({
              where: {
                id: availability.id,
              },
              data: {
                times: {
                  connect: newToStoreToDb.map((slot) => slot),
                },
              },
            })
            // console.log('newToStoreToDb to db', newToStoreToDb)
            // const oldToDisconnect = await Promise.all(
            //   storedSlicesShouldTrashIfNotBooked.map(async (slot: string) => {
            //     return await prisma.timeSlot.findFirst({
            //       where: { availabilityId: availability.id, slot },
            //       include: {
            //         bookedDays: {
            //           select: {
            //             isBooked: true,
            //           },
            //         },
            //       },
            //     })
            //   })
            // )
            const oldToDisconnect = await Promise.all(
              storedSlicesShouldTrashIfNotBooked.map(async (slot) => {
                // Find the actual timeSlot object
                const existingSlot = await prisma.timeSlot.findFirst({
                  where: {
                    availabilityId: availability.id,
                    slot,

                    // Add this condition to check for existing slots that are NOT in the new time slots
                    NOT: {
                      id: { in: newToStoreToDb.map((newSlot) => newSlot.id) }, // Check if the slot ID is in the new slots
                    },
                  },
                  include: { bookedDays: true },
                })

                return existingSlot
              })
            )
            // console.log('oldToDisconnect', oldToDisconnect)
            const bookedOldSlots = oldToDisconnect.filter((slot) =>
              slot?.bookedDays.some((booked) => booked.isBooked)
            )

            const nonBookedSlotsToDelete = oldToDisconnect.filter(
              (slot) => !bookedOldSlots.includes(slot)
            )
            // console.log('bookedOldSlots', bookedOldSlots)
            // console.log('nonBookedSlotsToDelete', nonBookedSlotsToDelete)
            const deleted = await Promise.all(
              nonBookedSlotsToDelete.map(async (slot) => {
                if (slot) {
                  await prisma.timeSlot.delete({
                    where: { id: slot.id },
                  })
                }
              })
            )
            // const updated = await prisma.availability.update({
            //   where: {
            //     id: availability.id,
            //   },
            //   data: {
            //     times: {
            //       connect: newToStoreToDb.map((slot) => ({ id: slot.id })),
            //     },
            //   },
            // })
            // console.log('updated', updated)
            if (
              bookedOldSlots
              // &&
              // oldToDisconnect.map((slot) => slot?.slot).length > 0
            ) {
              // const updatedDisconnect = await prisma.availability.update({
              //   where: {
              //     id: availability.id,
              //   },
              //   data: {
              //     times: {
              //       disconnect: bookedOldSlots?.map((slot) => ({
              //         id: slot?.id,
              //       })),
              //     },
              //   },
              // })
              const updatedToDisconnect = await Promise.all(
                bookedOldSlots?.map(async (slot: any) => {
                  return await prisma.timeSlot.update({
                    where: { id: slot.id },
                    data: { availabilityId: null },
                  })
                })
              )
              // console.log('updatedDisconnect', updatedToDisconnect)
            }
          }
        })
      )
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
  revalidatePath('/dashboard/booking')
  redirect('/dashboard/booking')
}
interface DisableDay {
  date: string
  doctorId: string
  day: string
}

export async function disableSpecialDay({ date, doctorId, day }: DisableDay) {
  try {
    const user = await currentUser()
    if (!user?.id) {
      redirect('/login')
    }
    if (user.role !== 'ADMIN') {
      return {
        errors: {
          _form: ['شمااجازه دسترسی ندارید!'],
        },
      }
    }
    // console.log({ doctorId })
    // console.log({ date })
    const disabledDay = await prisma.specialDay.create({
      data: {
        day: date,
      },
    })
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
    const availabilityDay = await prisma.availability.findFirst({
      where: {
        doctorId,
        availableDay: day,
      },
      include: {
        times: {
          include: {
            bookedDays: {
              include: { user: true },
            },
          },
        },
      },
    })
    // console.log({ availabilityDay })
    // console.log(
    //   'availabilityDay?.times.map',
    //   availabilityDay?.times.map((time) => time)
    // )
    if (availabilityDay?.times.map((time) => time.bookedDays.some))
      if (availabilityDay) {
        const findToDisconnect = await Promise.all(
          availabilityDay.times?.map(async (slot: any) => {
            return await prisma.timeSlot.findFirst({
              where: { id: slot.id },
              include: {
                bookedDays: true,
              },
              // data: { availabilityId: null },
            })
          })
        )
        const noDateTimeSlotsThatShouldDisconnect = findToDisconnect
          .flat()
          .map((up) => up?.bookedDays)
          .flat()

        // console.log('findToDisconnect', findToDisconnect)
        // console.log(
        //   'noDatetimeSlotsThatShouldDisconnect',
        //   noDateTimeSlotsThatShouldDisconnect
        // )
        const timeSlotsThatShouldDisconnect =
          noDateTimeSlotsThatShouldDisconnect.filter(
            (bookedDay) => bookedDay?.day === date
          )

        // console.log(
        //   'timeSlotsThatShouldDisconnect',
        //   timeSlotsThatShouldDisconnect
        // )
        if (timeSlotsThatShouldDisconnect.length > 0) {
          const cancelBookedDay = await Promise.all(
            timeSlotsThatShouldDisconnect.map(async (slot: any) => {
              return await prisma.bookedDay.updateMany({
                where: {
                  id: slot.id,
                  // availabilityId: availabilityDay.id,
                },
                data: { isCancelled: true },
              })
            })
          )
          // const updatedToDisconnect = await Promise.all(
          //   timeSlotsThatShouldDisconnect.map(async (slot: any) => {
          //     return await prisma.timeSlot.update({
          //       where: {
          //         id: slot.timeSlotId,
          //         availabilityId: availabilityDay.id,

          //       },
          //       data: { availabilityId: null },
          //     })
          //   })
          // )
          // console.log('updatedToDisconnect', updatedToDisconnect)

          const canceledTimeSlotsWithUser = await Promise.all(
            cancelBookedDay.map(async (slot: any) => {
              return await prisma.bookedDay.findMany({
                where: {
                  id: slot.id,
                  isCancelled: true,
                  day: date,
                },
                include: {
                  timeSlot: true,
                  user: true,
                },
              })
            })
          )

          // console.log(
          //   'canceledTimeSlotsWithUser',
          //   canceledTimeSlotsWithUser.flat().map((t) => console.log(t))
          // )
          const canceledSms = await Promise.all(
            canceledTimeSlotsWithUser.flat().map(async (booking: any) => {
              const { user, doctor, timeSlot, day } = booking
              if (user?.name && user?.phone && doctor?.name) {
                console.log(`${day} ساعت ${timeSlot?.slot}-${user.phone}`)
                await sendCancelBookingSms({
                  values: { phone: user.phone },
                  dayTime: `${day} ساعت ${timeSlot.slot}`,
                  doctorName: doctor.name,
                  name: user.name,
                })
              }
            })
          )
          // canceledTimeSlotsWithUser
          //   .flat()
          //   .map((item) =>
          //     console.log(
          //       `${item.day} ساعت ${item.timeSlot?.slot}-${item.user.phone}`
          //     )
          //   )
          // for (const cancelBooked of canceledTimeSlotsWithUser.flat()) {
          //   if (cancelBooked.user && cancelBooked) {
          //     for (const canceledTimeSlots of cancelBooked?.timeSlot!) {
          //       console.log(
          //         'User found:',
          //         `${cancelBooked.day} ساعت ${canceledTimeSlots.slot}`
          //       )
          //     }
          //   }
          // }
        }

        // for (const time of availabilityDay.times) {
        //   // Loop through booked days for each time slot
        //   for (const bookedDay of time.bookedDays) {
        //     // Check if there's a user associated with the booking
        //     if (bookedDay.user) {
        //       // User exists!
        //       console.log('User found:', `${date} ساعت ${time.slot}`)
        //       if (user.name && user.phone && doctor.name) {
        //         await sendCancelBookingSms({
        //           values: { phone: user.phone },
        //           dayTime: `${date} ساعت ${time.slot}`,
        //           doctorName: doctor.name,
        //           name: user.name,
        //         })
        //       }
        //       // You can now access user data from bookedDay.user
        //       // return true
        //     }
        //   }
        // }
        const availability = await prisma.availability.update({
          where: {
            id: availabilityDay?.id,
          },
          data: {
            disableDays: { connect: { id: disabledDay.id } },
          },
        })
        // console.log('availability', availability)
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
  revalidatePath('/dashboard/booking')
  redirect('/dashboard/booking')
}
