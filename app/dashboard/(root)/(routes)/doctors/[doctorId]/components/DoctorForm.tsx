'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor, Image, Specialization } from '@prisma/client'
import { usePathname } from 'next/navigation'

import { FC, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AlertModal } from './AlertModal'
import { Button, buttonVariants } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import axios from 'axios'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createDoctorSchema } from '@/lib/schemas/dashboard'
import { toast } from 'sonner'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import ImageSlider from '@/components/dashboard/ImageSlider'
import { cn } from '@/lib/utils'

type DoctorFormValues = z.infer<typeof createDoctorSchema>

interface DoctorFormProps {
  initialData:
    | (Doctor & {
        images: Image[]
      })
    | null
  specialization: Specialization[]
}

const DoctorForm: FC<DoctorFormProps> = ({ initialData, specialization }) => {
  const [files, setFiles] = useState<File[]>([])
  const path = usePathname()

  const [open, setOpen] = useState(false)

  const [isPending, startTransition] = useTransition()
  console.log(specialization)

  const title = initialData ? 'ویرایش ' : 'ایجاد دکتر جدید'
  const description = initialData
    ? 'ویرایش اطلاعات دکتر'
    : 'اضافه کردن دکتر جدید'
  const toastMessage = initialData ? 'اطلاعات دکتر آپدیت شد.' : 'دکتر ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const defaultValues = initialData
    ? {
        ...initialData,
        //In prisma mysql price is Decimal but here it has to be a float
        price: parseFloat(String(initialData?.price)),
        phone: initialData.phone || '',
        website: initialData.website || '',
        open_time: initialData.open_time || '',
        close_time: initialData.close_time || '',
        main_image: initialData.main_image || '',
        description: initialData.description || '',
        specializationId: initialData.specialization_id || '',
      }
    : {
        name: '',
        phone: '',
        website: '',
        description: '',
        // main_image: undefined,
        // images: [],
        // booking: [],
        open_time: '',
        close_time: '',
        price: 0,
        specializationId: '',
      }

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues,
  })

  const onSubmit = async (data: DoctorFormValues) => {
    console.log(data)
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('phone', data.phone || '')
    formData.append('website', data.website || '')
    formData.append('description', data.description || '')
    formData.append('open_time', data.open_time || '')
    formData.append('close_time', data.close_time || '')
    formData.append('price', String(data.price))
    formData.append('specializationId', data.specializationId || '')
    formData.append('description', data.description || '')
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }

    //  try {
    //    if (initialData) {
    //      // console.log({ data, initialData })
    //      startTransition(() => {
    //        editDoctor(
    //          formData,
    //          initialData.id as string,
    //          path
    //        )
    //          .then((res) => {
    //            if (res?.errors?.name) {
    //              form.setError('name', {
    //                type: 'custom',
    //                message: res?.errors.name?.join(' و '),
    //              })
    //            } else if (res.errors?.billboardId) {
    //              form.setError('billboardId', {
    //                type: 'custom',
    //                message: res?.errors.billboardId?.join(' و '),
    //              })
    //            } else if (res?.errors?.images) {
    //              form.setError('images', {
    //                type: 'custom',
    //                message: res?.errors.images?.join(' و '),
    //              })
    //            } else if (res?.errors?._form) {
    //              toast.error(res?.errors._form?.join(' و '))
    //            }
    //            // if (res?.success) {
    //            //    toast.success(toastMessage)
    //            // }
    //          })
    //          // TODO: fixing Through Error when its ok
    //          // .catch(() => toast.error('مشکلی پیش آمده.'))
    //          .catch(() => console.log('مشکلی پیش آمده.'))
    //      })
    //    } else {
    //      startTransition(() => {
    //        createDoctor(formData,  path)
    //          .then((res) => {
    //            if (res?.errors?.name) {
    //              form.setError('name', {
    //                type: 'custom',
    //                message: res?.errors.name?.join(' و '),
    //              })
    //            } else if (res?.errors?.images) {
    //              form.setError('billboardId', {
    //                type: 'custom',
    //                message: res?.errors.billboardId?.join(' و '),
    //              })
    //            } else if (res?.errors?.images) {
    //              form.setError('images', {
    //                type: 'custom',
    //                message: res?.errors.images?.join(' و '),
    //              })
    //            } else if (res?.errors?._form) {
    //              toast.error(res?.errors._form?.join(' و '))
    //              form.setError('root', {
    //                type: 'custom',
    //                message: res?.errors?._form?.join(' و '),
    //              })
    //            }

    //          })
    //          .catch(() => toast.error('مشکلی پیش آمده.'))
    //      })
    //    }
    //  } catch {
    //    toast.error('مشکلی پیش آمده، لطفا دوباره امتحان کنید!')
    //  }
  }

  const validUrls =
    initialData && initialData.images
      ? (initialData.images.map((img) => img.url).filter(Boolean) as string[])
      : (files
          .map((file) => URL.createObjectURL(file))
          .filter(Boolean) as string[])

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        // onConfirm={onDelete}
        onConfirm={() => {}}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="col-span-2 lg:col-span-4 max-w-md ">
            {files.length > 0 ? (
              <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                <AspectRatio ratio={1 / 1} className="relative h-full">
                  <ImageSlider urls={validUrls} />
                </AspectRatio>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange }, ...field }) => (
                  <FormItem>
                    <FormLabel className="mx-auto cursor-pointer bg-transparent rounded-xl flex flex-col justify-center gap-4 items-center border-2 border-black/20 dark:border-white/20 border-dashed w-full h-24 shadow  ">
                      {/* <FileUp size={42} className=" " /> */}
                      <span
                        className={cn(buttonVariants({ variant: 'ghost' }))}
                      >
                        انتخاب عکس
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        multiple={true}
                        disabled={form.formState.isSubmitting}
                        {...field}
                        onChange={async (event) => {
                          // Triggered when user uploaded a new file
                          // FileList is immutable, so we need to create a new one
                          const dataTransfer = new DataTransfer()

                          // Add old images
                          if (files) {
                            Array.from(files).forEach((image) =>
                              dataTransfer.items.add(image)
                            )
                          }

                          // Add newly uploaded images
                          Array.from(event.target.files!).forEach((image) =>
                            dataTransfer.items.add(image)
                          )

                          // Validate and update uploaded file
                          const newFiles = dataTransfer.files

                          setFiles(Array.from(newFiles))

                          onChange(newFiles)
                        }}
                      />
                    </FormControl>

                    {/* <FormMessage className="dark:text-rose-400" /> */}
                    <FormMessage>
                      {/* @ts-ignore */}
                      {form.getFieldState('images')?.error?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی دکتر </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="نام و نام خانوادگی "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="شماره تماس"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس وبسایت</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="آدرس وبسایت"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="توضیحات"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>قیمت ویزیت</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specializationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تخصص</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={`${field.value}`}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="انتخاب تخصص"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialization.map((special) => (
                        <SelectItem key={special.id} value={`${special.id}`}>
                          {special.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default DoctorForm
