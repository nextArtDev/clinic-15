import React from 'react'
import { prisma } from '@/lib/prisma'

import { format } from 'date-fns-jalali'
import { getAllBookedDays } from '@/lib/queries/home/booking'
import AvailabilityTable from '@/components/dashboard/booking/AvailabilityTable'
import DisableSpecialDay from '@/components/dashboard/booking/DisableSpecialDay'
import { DataTable } from '@/components/dashboard/booking/data-bable/data-table'
import { columns } from '@/components/dashboard/booking/data-bable/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {}

async function page({}: Props) {
  const doctors = await prisma.doctor.findMany({
    include: {
      availability: {
        include: {
          times: true,
        },
      },
    },
  })
  const initial = doctors.map((availability) =>
    availability.availability.map((av) => {
      return av.availableDay
    })
  )
  // console.log(initial)
  const bookedDays = await getAllBookedDays()

  const formattedBookedDays = bookedDays?.map((item) => ({
    date: item.day,
    doctorName: item.doctor?.name,
    time: item.timeSlot?.slot,
    userName: item.user?.name,
    userPhone: item.user?.phone,
    createdAt: format(item.created_at, 'dd MMMM yyyy'),
  }))

  return (
    <section className="min-h-screen pt-12 ">
      <Tabs
        dir="rtl"
        defaultValue="table"
        className="max-w-[96vw] mx-auto py-8 "
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">وضعیت نوبت‌ها</TabsTrigger>
          <TabsTrigger value="availability">تنظیم نوبتها</TabsTrigger>
          <TabsTrigger value="disableEspecialDay">
            غیرفعال کردن روزانه
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          {bookedDays?.length && formattedBookedDays?.length && (
            <DataTable columns={columns} data={formattedBookedDays} />
          )}
        </TabsContent>
        <TabsContent value="availability">
          <AvailabilityTable doctors={doctors} />
        </TabsContent>
        <TabsContent value="disableEspecialDay">
          <DisableSpecialDay doctors={doctors} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default page
