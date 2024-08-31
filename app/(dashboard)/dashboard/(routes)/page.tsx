import { Heading } from '@/components/dashboard/Heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  getAllDoctors,
  getAllPersonnel,
  getAllReviews,
  getAllSpecializations,
} from '@/lib/queries/home'
// import { getGraphRevenue } from '@/lib/queries/dashboard/get-graph-revenue'
// import { getSalesCount } from '@/lib/queries/dashboard/get-sales-count'
// import { getStockCount } from '@/lib/queries/dashboard/get-stock-count'
// import { getTotalRevenue } from '@/lib/queries/dashboard/get-total-revenue'
// import { formatter } from '@/lib/utils'
import { Command, CreditCard, DollarSign, Package, PenLine } from 'lucide-react'
// import { LuCreditCard, LuDollarSign, LuPackage } from 'react-icons/lu'

const DashboardPage = async () => {
  // const totalRevenuePromise = getTotalRevenue(params.storeId)
  // const graphRevenuePromise = getGraphRevenue(params.storeId)
  // const salesCountPromise = getSalesCount(params.storeId)
  // const stockCountPromise = getStockCount(params.storeId)
  const totalDoctorsPromise = getAllDoctors({})
  const totalSpecializationPromise = getAllSpecializations({})
  const totalPersonnelPromise = getAllPersonnel()
  const totalReviewsPromise = getAllReviews()

  const [totalDoctors, totalSpecialization, totalPersonnel, totalReviews] =
    await Promise.all([
      totalDoctorsPromise,
      totalSpecializationPromise,
      totalPersonnelPromise,
      totalReviewsPromise,
    ])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="دشبورد" description="وضعیت کلی" />
        <Separator />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">کادر درمان</CardTitle>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-8 text-lg md:text-2xl font-bold text-center text-red-500 ">
                {totalDoctors?.doctors.length} نفر
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تعداد پرسنل</CardTitle>
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-8 text-lg md:text-2xl font-bold text-center text-red-500 ">
                {totalPersonnel?.length} نفر
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تعداد تخصص</CardTitle>
              <Package className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-8 text-lg md:text-2xl font-bold text-center text-red-500 ">
                {totalSpecialization?.specializations.length} تخصص
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تعداد نظرات</CardTitle>
              <PenLine className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-8 text-lg md:text-2xl font-bold text-center text-red-500 ">
                {totalReviews?.length} نظر
              </div>
            </CardContent>
          </Card>
        </div>
        {/* <Card className="col-span-4">
          <CardHeader>
            <CardTitle>کامنت‌ها</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}

export default DashboardPage
