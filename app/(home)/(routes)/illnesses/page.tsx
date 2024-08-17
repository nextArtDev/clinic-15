import DoctorCard from '@/components/home/Doctor/DoctorCard'
import IllnessCard from '@/components/home/illness/IllnessCard'
import IllnessShowCard from '@/components/home/illness/IllnessShowCard'

import LocalSearchbar from '@/components/search/LocalSearchbar'
import Pagination from '@/components/search/Pagination'
import { getAllDoctors, getAllIllnesses } from '@/lib/queries/home'
import SearchIcon from '@/public/icons/search.svg'

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const illnesses = await getAllIllnesses({
    searchQuery: searchParams.q,

    page: searchParams.page ? +searchParams.page : 1,
  })
  // console.log(illnesses)
  if (!illnesses?.illnesses)
    return (
      <p className="w-full h-full flex items-center justify-center text-muted text-2xl">
        هیچ بیماری‌ای اضافه نشده است.
      </p>
    )
  return (
    <div className="gradient-base-r min-h-screen py-20">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">بیماری‌ها</h2>
        <div className="my-8 pt-20 flex flex-col gap-6 max-w-lg mx-auto">
          <LocalSearchbar
            route="/doctors"
            iconPosition="left"
            imgSrc={SearchIcon}
            placeholder="جست‌وجوی بیماری "
            otherClasses="flex-1 max-w-md mx-auto "
          />
        </div>
        <div className=" w-full h-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {illnesses.illnesses.map((illness) => (
            // <IllnessCard key={illness.id} illness={illness} />
            <IllnessShowCard key={illness.id} illness={illness} />
          ))}
          <div className="mt-10">
            <Pagination
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              isNext={illnesses.isNext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
