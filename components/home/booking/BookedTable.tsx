import { BookedDay, Doctor, TimeSlot, User } from '@prisma/client'
import { FC } from 'react'

export interface BookedTableProps {
  bookedDays:
    | (BookedDay & { doctor: Doctor | null } & { timeSlot: TimeSlot | null } & {
        user: User | null
      })[]
    | null
}

const BookedTable: FC<BookedTableProps> = ({ bookedDays }) => {
  // const {}=bookedDays
  return (
    <div className="flex flex-col border-b gap-4 max-w-[96%] mx-auto">
      {bookedDays?.map((bookedDay) => (
        <div
          key={bookedDay.id}
          className="flex border  rounded-md py-2 px-1 scroll-x-auto justify-evenly items-center "
        >
          <div>{bookedDay.day}</div>
          <div>دکتر{bookedDay.doctor?.name}</div>
          <div>{bookedDay.user?.name}</div>
          <div>{bookedDay.user?.phone}</div>
          <div>{bookedDay.timeSlot?.slot}</div>
        </div>
      ))}
    </div>
  )
}

export default BookedTable
