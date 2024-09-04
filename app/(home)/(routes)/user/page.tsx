import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// <div className="flex flex-col text-2xl pt-10">
//   <p>{user?.name}</p>
//   <p>{user?.isVerified}</p>
//   <p>{user?.phone}</p>
//   <p>{user?.role}</p>
//   {myUser?.Review.map((booked) => (
//     <p key={booked.id}>{booked.comment}</p>
//   ))}
//   {myUser?.BookedDay.map((booked) => (
//     <p key={booked.id}>{booked.day}</p>
//   ))}
// </div>
import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import React from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input'
import { notFound } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Info, ShieldAlert, Triangle, Verified } from 'lucide-react'
import Link from 'next/link'
import { getDoctorById } from '@/lib/queries/home'
import ReviewCard from '@/components/home/Doctor/ReviewCard'
import UserBookingCard from '@/components/home/booking/UserBookingCard'

const tabs = [
  { title: 'اطلاعات شخصی', value: 'profile', component: <p>2</p> },
  { title: 'نوبتها', value: 'bookings', component: <p>5</p> },
  { title: 'کامنتها', value: 'comments', component: <p>8</p> },
]
async function page() {
  const user = await currentUser()

  if (!user?.id) return notFound()

  const myUser = await prisma.user.findFirst({
    where: {
      id: user?.id,
      phone: user?.phone,
    },
    include: {
      BookedDay: {
        include: {
          doctor: true,
        },
      },
      Review: true,
    },
  })

  if (!myUser?.id) return notFound()

  return (
    <section className="py-24  gradient-base  flex flex-col space-y-4 min-h-screen text-secondary">
      <h4 className="font-extrabold text-xl  text-center">
        پروفایل شخصی {user?.name!}
      </h4>
      <article className="flex flex-col gap-4 container py-12 ">
        <div className="flex w-fit gap-2 items-center justify-center">
          <Label> شماره:</Label>
          <Input disabled value={user?.phone!} />
          {myUser.isVerified ? (
            <Verified className="text-green-500 w-8 h-8" />
          ) : (
            <Link href={`/otp/${user.phone}/reactive`}>
              <ShieldAlert className="text-red-500 w-8 h-8" />
            </Link>
          )}
        </div>
      </article>
      <Tabs
        dir="rtl"
        defaultValue="bookings"
        className="w-full bg-transparent px-2"
      >
        <TabsList className="flex h-14 !glass rounded-none bg-transparent ">
          <TabsTrigger className="flex-1 h-full " value="bookings">
            نوبتها
          </TabsTrigger>
          <TabsTrigger className="flex-1 h-full " value="comments">
            کامنتها
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="bookings"
          className="flex flex-wrap  gap-1 mx-auto p-4"
        >
          {myUser.BookedDay.map((book) => (
            // <div className="flex gap-2" key={book.id}>
            //   <p>{book.day}</p>
            //   <p>{book.doctor.name}</p>
            // </div>
            <UserBookingCard
              key={book.id}
              day={book.day}
              doctorName={book.doctor.name}
            />
          ))}
        </TabsContent>
        <TabsContent
          className="flex flex-wrap gap-1 p-4 mx-auto "
          value="comments"
        >
          {myUser.Review.map((review) => (
            <ReviewCard
              key={review.id}
              name=""
              rate={review.rating}
              text={review.comment}
              time={review.created_at}
            />
          ))}
        </TabsContent>
      </Tabs>
      {/* <Tabs
        dir="rtl"
        defaultValue="edit-profile"
        className=" w-[200] min-h-screen fixed space-y-8 right-0 top-0  h-full sm:flex flex-col lg:border-r px-6 py-12"
        orientation="vertical"
      >
        <TabsList className="flex flex-col items-start justify-start h-full bg-transparent">
          {tabs.map((tab) => (
            <>
              <TabsTrigger
                dir="rtl"
                key={tab.value}
                value={tab.value}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  ' data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-neutral-800 dark:hover:bg-neutral-900 w-full justify-start !px-3 text-right text-xs sm:text-sm md:text-base '
                )}
              >
                {tab.title}
              </TabsTrigger>
              <TabsContent value={tab.value} className="text-red-900 text-3xl">
                {tab.component}
              </TabsContent>
            </>
          ))}
        </TabsList>
      </Tabs> */}

      {/* <div className="flex-1 sm:ml-[200px] md:ml-32 min-h-screen bg-white dark:bg-neutral-950">
        {children}
      </div> */}
    </section>
  )
}

export default page
