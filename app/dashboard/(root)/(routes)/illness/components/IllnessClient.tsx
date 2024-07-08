'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { IllnessColumn, columns } from './columns'
import { Heading } from '@/components/dashboard/Heading'
import { DataTable } from '@/components/dashboard/DataTable'
// import { ApiList } from '@/components/dashboard/ApiList'

interface IllnessesClientProps {
  data: IllnessColumn[]
}

export const IllnessesClient: React.FC<IllnessesClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`بیماریها (${data.length})`}
          description="اطلاعات بیماری‌ها را مدیریت کنید."
        />
        <Button onClick={() => router.push(`/dashboard/illness/0`)}>
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      {/* <ApiList entityName="illnesses" entityIdName="illnessId" /> */}
    </>
  )
}
