import SpecializationPage from '@/components/home/specializations/SpecializationPage'
import { getSpecializationWithId } from '@/lib/queries/home'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { specializationId: string }
}): Promise<Metadata> {
  const specialization = await getSpecializationWithId({
    id: params.specializationId,
  })

  return {
    title: specialization?.name,
    description: specialization?.description,
    openGraph: {
      images: [
        {
          url:
            specialization?.images?.[0]?.url ||
            '/images/no-specialization-photo.webp',
        },
      ],
    },
  }
}

const page = async ({ params }: { params: { specializationId: string } }) => {
  const specialization = await getSpecializationWithId({
    id: params.specializationId,
  })
  if (!specialization?.id) notFound()
  return (
    <div className="min-h-screen pt-10 gradient-base-r pb-16 ">
      <SpecializationPage specialization={specialization} />
    </div>
  )
}

export default page
