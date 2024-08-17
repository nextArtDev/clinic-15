'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, startTransition } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import * as z from 'zod'

import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { createClinicReview } from '@/lib/actions/home/rating'
import { createReviewSchema } from '@/lib/schemas/rating'
import { User } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { StarRating } from '../StarRating'

interface FaqProps {
  user: User | null
}
const FaqComment: FC<FaqProps> = ({ user }) => {
  const path = usePathname()

  const form = useForm<z.infer<typeof createReviewSchema>>({
    //enforcing post validator client side
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      comment: '',
      rating: 5,
    },
  })

  async function onSubmit(data: z.infer<typeof createReviewSchema>) {
    const formData = new FormData()

    formData.append('comment', data.comment)
    formData.append('rating', String(data.rating))
    try {
      startTransition(() => {
        createClinicReview(formData, path, user?.id as string)
          .then((res) => {
            if (res?.errors?.comment) {
              form.setError('comment', {
                type: 'custom',
                message: res?.errors.comment?.join(' و '),
              })
            } else if (res?.errors?.rating) {
              form.setError('rating', {
                type: 'custom',
                message: res?.errors.rating?.join(' و '),
              })
            } else if (res?.errors?._form) {
              toast.error(res?.errors._form?.join(' و '))
              form.setError('root', {
                type: 'custom',
                message: res?.errors?._form?.join(' و '),
              })
            }
            // if (res?.success) {
            //    toast.success(toastMessage)
            // }
          })
          .catch(() => toast.error('مشکلی پیش آمده.'))
      })
    } catch (error) {}
  }

  return (
    <article className="flex flex-col items-center justify-center ">
      <Dialog>
        <DialogTrigger asChild className="">
          <Button className="grainy fixed  left-[50%] -translate-x-1/2 bottom-8  w-[50%] max-w-xl p-8 mb-8 shadow-2xl z-50 ">
            ثبت نظر
          </Button>
        </DialogTrigger>
        <DialogContent className="grainy max-w-[95%] rounded-xl ">
          <DialogHeader className="flex items-center justify-center space-y-4">
            <DialogTitle className=" ">ثبت نظر </DialogTitle>
            <DialogDescription className="text-black/50">
              نظر یا پیشنهاد خود راجع به کلینیک را بنویسد.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-12 text-center text-black/80 "
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="mx-auto">
                    <FormControl className="h-36">
                      <TextareaAutosize
                        placeholder="درج دیدگاه..."
                        className="w-full md:w-[70%] text-blue-950 resize-none appearance-none overflow-hidden bg-white/70 p-2 border rounded-lg text-xl font-bold focus:outline-none"
                        {...field}
                        // {...rest}
                      />
                    </FormControl>
                    <FormDescription className="text-black/60">
                      دیدگاه شما در صفحه عمومی دکتر نمایش داده خواهد شد.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl className="w-full  !text-center  ">
                      <StarRating
                        wrapperProps={{
                          className:
                            'pb-2 flex !items-center !justify-center w-full text-center',
                        }}
                        value={field.value}
                        setValue={(d) => field.onChange(d)}
                      />
                    </FormControl>
                    <DialogDescription className="text-black/50">
                      به کلینیک از یک تا پنج ستاره بدهید.
                    </DialogDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogTrigger asChild className="">
                <Button
                  type="submit"
                  variant="default"
                  className=" w-full md:w-[50%] text-yellow-600 "
                >
                  ارسال
                </Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </article>
  )
}

export default FaqComment
