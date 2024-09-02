import IllnessPage from '@/components/home/illness/IllnessPage'
import { getIllnessesById } from '@/lib/queries/home'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { illnessId: string }
}): Promise<Metadata> {
  const illness = await getIllnessesById({
    id: params.illnessId,
  })

  return {
    title: illness?.name,
    description: illness?.description,
    openGraph: {
      images: [
        {
          url: illness?.images[0].url || '',
        },
      ],
    },
  }
}

const page = async ({ params }: { params: { illnessId: string } }) => {
  const illness = await getIllnessesById({ id: params.illnessId })

  if (!illness?.id) notFound()

  return (
    <div className="min-h-screen gradient-base-r pb-16 ">
      <IllnessPage illness={illness} />
    </div>
  )
}

export default page
