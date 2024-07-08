'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor, Illness, Image, Prisma, Specialization } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
import { Button } from '@/components/ui/button'
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
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ImageUpload from '@/app/dashboard/(dashboard)/(root)/(routes)/doctors/components/ImageUpload'
import { AlertModal } from '@/app/dashboard/(root)/(routes)/doctors/[doctorId]/components/AlertModal'
import { createIllnessSchema } from '@/lib/schemas/dashboard'

type IllnessFormValues = z.infer<typeof createIllnessSchema>

interface IllnessFormProps {
  initialData:
    | (Illness & {
        images: Image[]
      })
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

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(params)

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
        // description: initialData.description!,
        specializationId: parseFloat(String(initialData?.specializationId)),
        doctorId: parseFloat(String(initialData?.doctorId)),
      }
    : {
        name: '',
        description: '',
        images: [],
        specializationId: undefined,
        doctorId: 0,
      }

  const form = useForm<IllnessFormValues>({
    resolver: zodResolver(createIllnessSchema),
    defaultValues,
  })

  const onSubmit = async (data: IllnessFormValues) => {
    // try {
    //   setLoading(true)
    //   if (initialData) {
    //     await axios.patch(`/api/illnesses/${params.illnessId}`, data)
    //   } else {
    //     console.log(data)
    //     await axios.post(`/api/illnesses`, data)
    //   }
    //   router.refresh()
    //   router.push(`/dashboard/illness`)
    //   toast({ title: toastMessage, variant: 'default' })
    // } catch (error: any) {
    //   toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    // } finally {
    //   setLoading(false)
    // }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        // onConfirm={onDelete}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {initialData && (
          <Button
            disabled={loading}
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عکس‌</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام بیماری </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
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
                    <Input
                      disabled={loading}
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
                  <FormLabel>تخصص</FormLabel>
                  <Select
                    disabled={loading}
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
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> دکتر معالج </FormLabel>
                  <Select
                    disabled={loading}
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
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default IllnessForm
