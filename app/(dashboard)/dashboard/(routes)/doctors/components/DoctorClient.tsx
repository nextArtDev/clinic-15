'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { DoctorColumn, columns } from './columns'
import { Heading } from '@/components/dashboard/Heading'
import { DataTable } from '@/components/dashboard/DataTable'
import Link from 'next/link'
import { cn } from '@/lib/utils'
// import { ApiList } from '@/components/dashboard/ApiList'

interface DoctorsClientProps {
  data: DoctorColumn[]
}

export const DoctorsClient: React.FC<DoctorsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`پزشکان (${data.length})`}
          description="اطلاعات پزشکان را مدیریت کنید."
        />
        <Link href={`/dashboard/doctors/new`} className={cn(buttonVariants())}>
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      {/* <ApiList entityName="doctors" entityIdName="doctorId" /> */}
    </>
  )
}
