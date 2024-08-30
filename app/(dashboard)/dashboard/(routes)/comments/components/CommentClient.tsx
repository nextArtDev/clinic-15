'use client'

import { Separator } from '@/components/ui/separator'

import { DataTable } from '@/components/dashboard/DataTable'
import { Heading } from '@/components/dashboard/Heading'
import { columns, CommentColumn } from './columns'

// import { ApiList } from '@/components/dashboard/ApiList'

interface CommentClientProps {
  data: CommentColumn[]
}

export const CommentClient: React.FC<CommentClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`کامنت‌ها (${data.length})`}
        description="کامنتها را مدیریت کنید."
      />

      <Separator />
      <DataTable searchKey="comment" columns={columns} data={data} />
      <Separator />
      {/* <ApiList entityName="doctors" entityIdName="doctorId" /> */}
    </>
  )
}
