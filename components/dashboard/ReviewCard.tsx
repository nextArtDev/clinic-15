'use client'
import { FC, useState, useTransition } from 'react'
import { Review } from '@prisma/client'
import Stars from '@/components/Stars'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { useParams, usePathname, useRouter } from 'next/navigation'

import { toast } from '@/components/ui/use-toast'
import { AlertModal } from './AlertModal'
import { deleteComment } from '@/lib/actions/dashboard/comments'
import { useFormState } from 'react-dom'

interface ReviewCardProps {
  review: Review
  isAdmin?: boolean
}

const ReviewCard: FC<ReviewCardProps> = ({ review, isAdmin }) => {
  const path = usePathname()
  const [isPending, startTransition] = useTransition()

  const [open, setOpen] = useState(false)

  const [deleteState, deleteAction] = useFormState(
    deleteComment.bind(null, path, review?.id as string),
    {
      errors: {},
    }
  )

  return (
    <div className="relative border-b pb-7 mb-7">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteAction}
        isPending={isPending}
      />
      <div className="flex">
        {/* <div className="w-1/6 flex flex-col items-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-center text-2xl uppercase flex items-center justify-center ">
              <span className="flex items-center justify-center">
                {review.name }
              </span>
            </h2>
          </div>
          <p className="text-center py-2 opacity-60 font-semibold ">
            {review?.name}
          </p>
        </div> */}
        <div className="mr-10 w-5/6">
          <div className="flex items-center  ">
            {/* <div className="flex mr-5">*****</div> */}
            {/* <Stars rating={review?.rating} reviews={[]} /> */}
          </div>
          <div className="mt-5">
            <p className="text-lg font-light">{review?.comment}</p>
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className="z-10 absolute top-2 left-10">
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ReviewCard
