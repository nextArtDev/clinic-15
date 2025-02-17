import React from 'react'
import { prisma } from '@/lib/prisma'

import { format } from 'date-fns-jalali'
import {
  getAllBookedDays,
  getAllCancelledBookedDays,
} from '@/lib/queries/home/booking'
import AvailabilityTable from '@/components/dashboard/booking/AvailabilityTable'
import DisableSpecialDay from '@/components/dashboard/booking/DisableSpecialDay'
import { DataTable } from '@/components/dashboard/booking/data-bable/data-table'
import { columns } from '@/components/dashboard/booking/data-bable/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const page = searchParams.page ? +searchParams.page : 1

  const doctors = await prisma.doctor.findMany({
    include: {
      availability: {
        include: {
          times: true,
        },
      },
    },
  })

  const bookedDays = await getAllBookedDays({ page })
  const cancelledBookedDays = await getAllCancelledBookedDays()

  const cancelledIdentifiers = new Set(
    cancelledBookedDays?.map(
      (item) => `${item.day}|${item.timeSlot?.slot}|${item.user.phone}`
    )
  )

  const formattedBookedDays = bookedDays?.booked?.map((item) => ({
    date: item.day,
    doctorName: item.doctor?.name,
    time: item.timeSlot?.slot,
    userName: item.user?.name,
    userPhone: item.user?.phone,
    isCancelled: cancelledIdentifiers.has(
      `${item.day}|${item.timeSlot?.slot}|${item.user.phone}`
    ),
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
          <TabsTrigger value="table">نوبتها</TabsTrigger>
          <TabsTrigger value="availability">تنظیم</TabsTrigger>
          <TabsTrigger value="disableEspecialDay">کنسلی روزانه</TabsTrigger>
          {/* <TabsTrigger value="disabledBooks">کنسلی‌ها</TabsTrigger> */}
        </TabsList>
        <TabsContent value="table">
          {!!bookedDays?.booked.length && !!formattedBookedDays?.length && (
            <DataTable
              columns={columns}
              data={formattedBookedDays}
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              isNext={bookedDays.isNext}
            />
          )}
        </TabsContent>
        <TabsContent value="availability">
          <AvailabilityTable doctors={doctors} />
        </TabsContent>
        <TabsContent value="disableEspecialDay">
          <DisableSpecialDay doctors={doctors} />
        </TabsContent>
        {/* <TabsContent value="disabledBooks">
          {cancelledBookedDays?.length &&
            formattedCancelledBookedDays?.length && (
              <DataTable
                columns={columns}
                data={formattedCancelledBookedDays}
              />
            )}
        </TabsContent> */}
      </Tabs>
    </section>
  )
}

export default page
