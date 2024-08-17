'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor, Illness, Image, Prisma, Specialization } from '@prisma/client'
import { useParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FC, useState, useTransition } from 'react'
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
// import axios from 'axios'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createIllnessSchema } from '@/lib/schemas/dashboard'
import { AlertModal } from '@/components/dashboard/AlertModal'
import { toast } from 'sonner'
import { useFormState } from 'react-dom'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import ImageSlider from '@/components/ImageSlider'
import { MultiSelect } from '@/components/multi-select'
import {
  createIllness,
  deleteIllness,
  editIllness,
} from '@/lib/actions/dashboard/illness'
import { Textarea } from '@/components/ui/textarea'

type IllnessFormValues = z.infer<typeof createIllnessSchema>

interface IllnessFormProps {
  initialData:
    | (Illness & {
        images: Image[]
      } & { Specialization: Specialization[] } & { Doctor: Doctor[] })
    | null
  specialization: Specialization[]
  doctor: Doctor[]
}

const IllnessForm: FC<IllnessFormProps> = ({
  initialData,
  specialization,
  doctor,
}) => {
  const params = useParams()
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const path = usePathname()

  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const title = initialData ? 'ویرایش ' : 'ایجاد بیماری جدید'
  const description = initialData
    ? 'ویرایش اطلاعات دکتر'
    : 'اضافه کردن دکتر جدید'
  const toastMessage = initialData
    ? 'اطلاعات دکتر آپدیت شد.'
    : 'بیماری ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const defaultValues = initialData
    ? {
        ...initialData,
        // name: initialData.name!,
        description: initialData.description || '',
        specializationId:
          initialData.Specialization.map((w: { id: string }) => w.id) || [],
        doctorId: initialData.Doctor.map((w: { id: string }) => w.id) || [],
      }
    : {
        name: '',
        description: '',
        // images: [],
        // specializationId: [],
        // doctorId: [],
      }

  const form = useForm<IllnessFormValues>({
    resolver: zodResolver(createIllnessSchema),
    defaultValues,
  })

  const onSubmit = async (data: IllnessFormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)

    formData.append('description', data.description || '')

    if (data.specializationId && data.specializationId.length > 0) {
      for (let i = 0; i < data.specializationId.length; i++) {
        formData.append('specializationId', data.specializationId[i])
      }
    }
    if (data.doctorId && data.doctorId.length > 0) {
      for (let i = 0; i < data.doctorId.length; i++) {
        formData.append('doctorId', data.doctorId[i])
      }
    }
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }

    try {
      if (initialData) {
        // console.log({ data, initialData })
        startTransition(() => {
          editIllness(formData, initialData.id as string, path)
            .then((res) => {
              if (res?.errors?.name) {
                form.setError('name', {
                  type: 'custom',
                  message: res?.errors.name?.join(' و '),
                })
              } else if (res.errors?.description) {
                form.setError('description', {
                  type: 'custom',
                  message: res?.errors.description?.join(' و '),
                })
              } else if (res.errors?.specializationId) {
                form.setError('specializationId', {
                  type: 'custom',
                  message: res?.errors.specializationId?.join(' و '),
                })
              } else if (res.errors?.doctorId) {
                form.setError('doctorId', {
                  type: 'custom',
                  message: res?.errors.doctorId?.join(' و '),
                })
              } else if (res?.errors?.images) {
                form.setError('images', {
                  type: 'custom',
                  message: res?.errors.images?.join(' و '),
                })
              } else if (res?.errors?._form) {
                toast.error(res?.errors._form?.join(' و '))
              }
              // if (res?.success) {
              //    toast.success(toastMessage)
              // }
            })
            .catch(() => console.log('مشکلی پیش آمده.'))
        })
      } else {
        startTransition(() => {
          createIllness(formData, path)
            .then((res) => {
              if (res?.errors?.name) {
                form.setError('name', {
                  type: 'custom',
                  message: res?.errors.name?.join(' و '),
                })
              } else if (res.errors?.description) {
                form.setError('description', {
                  type: 'custom',
                  message: res?.errors.description?.join(' و '),
                })
              } else if (res.errors?.specializationId) {
                form.setError('specializationId', {
                  type: 'custom',
                  message: res?.errors.specializationId?.join(' و '),
                })
              } else if (res.errors?.doctorId) {
                form.setError('doctorId', {
                  type: 'custom',
                  message: res?.errors.doctorId?.join(' و '),
                })
              } else if (res?.errors?.images) {
                form.setError('images', {
                  type: 'custom',
                  message: res?.errors.images?.join(' و '),
                })
              } else if (res?.errors?._form) {
                toast.error(res?.errors._form?.join(' و '))
              }
              // if (res?.success) {
              //    toast.success(toastMessage)
              // }
            })
            .catch((error) => console.log(error))
        })
      }
    } catch {
      toast.error('مشکلی پیش آمده، لطفا دوباره امتحان کنید!')
    }
  }
  const validUrls =
    initialData && initialData.images
      ? (initialData.images.map((img) => img.url).filter(Boolean) as string[])
      : (files
          .map((file) => URL.createObjectURL(file))
          .filter(Boolean) as string[])

  const [deleteState, deleteAction] = useFormState(
    deleteIllness.bind(null, path, initialData?.id as string),
    {
      errors: {},
    }
  )
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        // onConfirm={onDelete}
        onConfirm={deleteAction}
        isPending={isPending}
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
                  <FormLabel>نام بیماری </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="نام بیماری"
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
                  <FormLabel>توضیحات بیماری</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="توضیحات بیماری"
                      {...field}
                    />
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
                  <FormLabel>تخصص(های) مربوط</FormLabel>
                  <MultiSelect
                    options={specialization.map((special) => ({
                      value: special.id,
                      label: special.name,
                    }))}
                    onValueChange={(data) => field.onChange(data)}
                    defaultValue={[]}
                    placeholder="انتخاب تخصص"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />

                  <FormMessage>
                    {form.getFieldState('specializationId')?.error?.message}
                  </FormMessage>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> دکتر(های) معالج </FormLabel>
                  <MultiSelect
                    options={doctor.map((special) => ({
                      value: special.id,
                      label: special.name,
                    }))}
                    onValueChange={(data) => field.onChange(data)}
                    defaultValue={[]}
                    placeholder="انتخاب دکتر(های) معالج"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />

                  <FormMessage>
                    {form.getFieldState('specializationId')?.error?.message}
                  </FormMessage>
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

export default IllnessForm
