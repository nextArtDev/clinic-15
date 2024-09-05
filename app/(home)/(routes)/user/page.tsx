import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { currentUser } from '@/lib/auth'

import React from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input'
import { notFound } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Info, ShieldAlert, Triangle, Verified } from 'lucide-react'
import Link from 'next/link'
import { getUserWithReviewsById } from '@/lib/queries/home'
import ReviewCard from '@/components/home/Doctor/ReviewCard'
import UserBookingCard from '@/components/home/booking/UserBookingCard'

async function page() {
  const user = await currentUser()

  if (!user?.id) return notFound()

  const myUser = await getUserWithReviewsById({ id: user.id })

  if (!myUser?.id) return notFound()

  return (
    <section className="py-24  gradient-base  flex flex-col space-y-4 min-h-screen text-secondary">
      <div className="w-full flex items-center justify-between">
        <h4 className="font-extrabold text-xl  text-center">
          پروفایل شخصی {user?.name!}
        </h4>
        <Link
          href={'/logout'}
          className={cn(buttonVariants({ variant: 'destructive' }))}
        >
          خروج
        </Link>
      </div>
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
        className="w-full  bg-transparent px-2"
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
    </section>
  )
}

export default page
