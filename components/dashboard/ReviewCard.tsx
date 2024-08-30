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
  const [loading, setLoading] = useState(false)

  const [deleteState, deleteAction] = useFormState(
    deleteComment.bind(null, path, review?.id as string),
    {
      errors: {},
    }
  )

  const onDelete = async () => {
    //  startTransition(() => {
    //    deleteComment(formData, path)
    //      .then((res) => {
    //        if (res?.errors?.commentId) {
    //          form.setError('commentId', {
    //            type: 'custom',
    //            message: res?.errors.commentId?.join(' و '),
    //          })
    //        }  else if (res?.errors?._form) {
    //          toast.error(res?.errors._form?.join(' و '))
    //          form.setError('root', {
    //            type: 'custom',
    //            message: res?.errors?._form?.join(' و '),
    //          })
    //        }
    //      })
    //      .catch(() => console.log('مشکلی پیش آمده.'))
    //  })
    // try {
    //   setLoading(true)
    //   // await axios.delete(`/api/comments`, { data: review.id })
    //   router.refresh()
    //   toast({ title: 'کامنت حذف شد.', variant: 'default' })
    //   // router.push(`/doctors`)
    // } catch (error: any) {
    //   toast({
    //     title: 'مشکلی پیش آمده.',
    //     variant: 'destructive',
    //   })
    // } finally {
    //   setLoading(false)
    //   setOpen(false)
    // }
  }

  return (
    <div className="relative border-b pb-7 mb-7">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteAction}
        isPending={loading}
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
