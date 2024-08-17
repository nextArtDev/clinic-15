import { format } from 'date-fns-jalali'

import { formatter } from '@/lib/utils'

import { prisma } from '@/lib/prisma'
import { IllnessColumn } from './components/columns'
import { IllnessesClient } from './components/IllnessClient'

const ProductsPage = async () => {
  const illnesses = await prisma.illness.findMany({
    // where: {},
    //we include them to access them like individual objects and for example we can show them in table
    include: {
      // doctors: true,
      Specialization: true,
      images: true,
    },
    // orderBy: {
    //   createdAt: 'desc',
    // },
  })

  const formattedIllnesses: IllnessColumn[] = illnesses.map((item) => ({
    id: item.id,
    name: item.name,
    description: item?.description,
    // specialization: item.specialization.id,
    // images: item.images.url.map((ur) => ur),
    //Because its Decimal in prisma model, we have to convert it to number by "toNumber"
    // booking: item.bookings.booking_time,
    // reviews: {item.reviews.name ,item.reviews.text , item.reviews.rating },
    createdAt: format(item.created_at, 'dd MMMM yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <IllnessesClient data={formattedIllnesses} />
      </div>
    </div>
  )
}

export default ProductsPage
