'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor, Illness, Image, Prisma, Specialization } from '@prisma/client'
import { useParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
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

import { AlertModal } from '@/app/dashboard/(root)/(routes)/doctors/[doctorId]/components/AlertModal'
import { createSpecializationSchema } from '@/lib/schemas/dashboard'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import ImageSlider from '@/components/ImageSlider'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import {
  createSpecialization,
  editSpecialization,
} from '@/lib/actions/dashboard/specialization'
import NextImage from 'next/image'

type SpecializationFormValues = z.infer<typeof createSpecializationSchema>

interface SpecializationFormProps {
  initialData:
    | (Specialization & {
        images: Image[]
      })
    | null
  // illness: Illness[]
  // doctor: Doctor[]
}

const SpecializationForm: FC<SpecializationFormProps> = ({
  initialData,
  // illness,
  // doctor,
}) => {
  const path = usePathname()
  const [files, setFiles] = useState<File[]>([])

  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    console.log(files)
  }, [files])

  const title = initialData ? 'ویرایش ' : 'ایجاد تخصص جدید'
  const description = initialData
    ? 'ویرایش اطلاعات تخصص'
    : 'اضافه کردن تخصص جدید'
  const toastMessage = initialData ? 'اطلاعات تخصص آپدیت شد.' : 'تخصص ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const defaultValues = initialData
    ? {
        ...initialData,
        name: initialData.name!,
        description: initialData?.description!,
        // illnessId: initialData?.illness_id,
        // doctorId: parseFloat(String(initialData?.doctorId)),
      }
    : {
        name: '',
        description: '',
        // images: [],
        // illnessId: 0,
        doctorId: 0,
      }

  const form = useForm<SpecializationFormValues>({
    resolver: zodResolver(createSpecializationSchema),
    defaultValues,
  })

  //   const [deleteState, deleteAction] = useFormState(
  //   deleteCategory.bind(
  //     null,
  //     path,
  //     params.storeId as string,
  //     categoryId as string
  //   ),
  //   {
  //     errors: {},
  //   }
  // )

  const onSubmit = async (data: SpecializationFormValues) => {
    console.log(data)
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description || '')
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }
    try {
      if (initialData) {
        // console.log({ data, initialData })
        startTransition(() => {
          editSpecialization(formData, initialData.id as string, path)
            .then((res) => {
              if (res?.errors?.name) {
                form.setError('name', {
                  type: 'custom',
                  message: res?.errors.name?.join(' و '),
                })
              } else if (res?.errors?.images) {
                form.setError('images', {
                  type: 'custom',
                  message: res?.errors.images?.join(' و '),
                })
              } else if (res?.errors?._form) {
                toast.error(res?.errors._form?.join(' و '))
              }
            })
            // TODO: fixing Through Error when its ok
            // .catch(() => toast.error('مشکلی پیش آمده.'))
            .catch(() => console.log('مشکلی پیش آمده.'))
        })
      } else {
        startTransition(() => {
          createSpecialization(formData, path)
            .then((res) => {
              if (res?.errors?.name) {
                form.setError('name', {
                  type: 'custom',
                  message: res?.errors.name?.join(' و '),
                })
              } else if (res?.errors?.images) {
                form.setError('images', {
                  type: 'custom',
                  message: res?.errors.images?.join(' و '),
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
      }
    } catch {
      toast.error('مشکلی پیش آمده، لطفا دوباره امتحان کنید!')
    }

    // try {
    //   setLoading(true)
    //   if (initialData) {
    //     await axios.patch(
    //       `/api/specializations/${params.specializationId}`,
    //       data
    //     )
    //   } else {
    //     console.log(data)
    //     await axios.post(`/api/specializations`, data)
    //   }
    //   router.refresh()
    //   router.push(`/dashboard/specialization`)
    //   toast({ title: toastMessage, variant: 'default' })
    // } catch (error: any) {
    //   toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    // } finally {
    //   setLoading(false)
    // }
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
                  <FormLabel>نام تخصص </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="نام تخصص"
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
                  <FormLabel>توضیحات تخصص</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="توضیحات تخصص"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="illnessId"
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
            /> */}
            {/* <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> دکتر معالج </FormLabel>
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
                          placeholder="انتخاب دکتر معالج"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctor.map((special) => (
                        <SelectItem key={special.id} value={`${special.id}`}>
                          {special.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SpecializationForm
