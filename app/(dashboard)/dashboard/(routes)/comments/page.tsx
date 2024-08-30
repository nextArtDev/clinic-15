// import ReviewCard from '@/components/dashboard/ReviewCard'
// import { prisma } from '@/lib/prisma'
// import { FC } from 'react'

// interface pageProps {}

// const page: FC<pageProps> = async ({}) => {
//   const reviews = await prisma.review.findMany({})
//   //   console.log(reviews)

//   return (
//     <div>
//       <h1 className="font-bold text-2xl mt-10 mb-7 border-b pb-5">
//         {reviews?.length} نظر
//       </h1>
//       <div>
//         {reviews.map((review) => (
//           <ReviewCard key={review.id} review={review} isAdmin={true} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default page

import { format } from 'date-fns-jalali'

import { formatter } from '@/lib/utils'

import { prisma } from '@/lib/prisma'
import { CommentColumn } from './components/columns'
import { CommentClient } from './components/CommentClient'

const DoctorPage = async () => {
  const comments = await prisma.review.findMany({
    where: {},
    include: {
      user: true,
    },
    // orderBy: {
    //   createdAt: 'desc',
    // },
  })

  const formattedComments: CommentColumn[] = comments.map((item) => ({
    id: item.id,
    name: item.user?.name!,
    comment: item?.comment,
    createdAt: format(item.created_at, 'dd MMMM yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CommentClient data={formattedComments} />
      </div>
    </div>
  )
}

export default DoctorPage
