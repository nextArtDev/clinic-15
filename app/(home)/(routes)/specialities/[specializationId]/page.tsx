import SpecializationPage from '@/components/home/specializations/SpecializationPage'
import { getSpecializationWithId } from '@/lib/queries/home'
import { notFound } from 'next/navigation'

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
