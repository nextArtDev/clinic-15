import { HoverEffect } from '@/components/home/CardHoverEffect'
import DoctorCard from '@/components/home/Doctor/DoctorCard'

import LocalSearchbar from '@/components/search/LocalSearchbar'
import Pagination from '@/components/search/Pagination'
import { getAllDoctors, getAllSpecializations } from '@/lib/queries/home'
import SearchIcon from '@/public/icons/search.svg'

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const specializations = await getAllSpecializations({
    searchQuery: searchParams.q,

    page: searchParams.page ? +searchParams.page : 1,
  })
  if (!specializations?.specializations)
    return (
      <p className="w-full h-screen flex items-center justify-center text-muted text-2xl">
        هیچ متخصصی اضافه نشده است.
      </p>
    )
  return (
    <div className="mx-auto w-full gradient-base-r min-h-screen pt-8 pb-16">
      <div className="max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">دکترها</h2>
        <div className="my-8 pt-20 flex flex-col gap-6 max-w-lg mx-auto">
          <LocalSearchbar
            route="/specialities"
            iconPosition="left"
            imgSrc={SearchIcon}
            placeholder="جست‌وجوی تخصص "
            otherClasses="flex-1 max-w-md mx-auto "
          />
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect
            items={specializations.specializations.map((special) => {
              return {
                title: special.name,
                // description: special.description,
                link: `/specialities/${special.id}`,
                url: special.images?.[0]?.url,
              }
            })}
          />
        </div>
      </div>
    </div>
  )
}

export default page
