import Deal from '@/components/home/Deal'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/landing/Hero'
import Carousel from '@/components/home/landing/Carousel'
import StackCards from '@/components/home/stack-cards/StackCards'
import { illness, slider } from '@/constants'
import Slider from '@/components/home/Slider'
import DoctorCarousel from '@/components/home/Doctor/DoctorsCarousel'

import IllnessCarousel from '@/components/home/illness/IllnessCarousel'
import Reviews from '@/components/home/review/Reviews'
import {
  getAllDoctors,
  getAllIllnesses,
  getAllReviews,
  getAllSpecializations,
  getAllPersonnel,
} from '@/lib/queries/home'
import { prisma } from '@/lib/prisma'
import PersonnelCarousel from '@/components/home/personnel/PersonnelCarousel'
import { Suspense } from 'react'
import LogoLoader from '@/components/home/logo-loader'
import ThumnailSlider from '@/components/home/thumnail-slider'

const HomePage = async () => {
  const specializationsPromise = getAllSpecializations({})
  const doctorsPromise = getAllDoctors({})
  const illnessesPromise = getAllIllnesses({})
  const personnelPromise = getAllPersonnel()
  const reviewsPromise = getAllReviews()

  const [specializations, doctors, illnesses, personnel, reviews] =
    await Promise.all([
      specializationsPromise,
      doctorsPromise,
      illnessesPromise,
      personnelPromise,
      reviewsPromise,
    ])
  return (
    <div className="relative gradient-base">
      {/* <LogoLoader /> */}
      <Hero />
      {/* <Suspense fallback={null}>
      </Suspense> */}
      <Deal />
      <StackCards />

      <ThumnailSlider />

      {!!doctors?.doctors?.length && (
        <section className="relative my-24">
          <DoctorCarousel slides={doctors.doctorsWithRatings} />
        </section>
      )}
      {!!personnel?.length && (
        <section className="relative my-24">
          <PersonnelCarousel slides={personnel} />
        </section>
      )}
      {!!specializations?.specializations?.length && (
        <section className="relative ">
          <Slider specializations={specializations.specializations} />
        </section>
      )}

      {!!illnesses?.illnesses?.length && (
        <IllnessCarousel slides={illnesses?.illnesses} />
      )}
      {!!reviews?.length && <Reviews reviews={reviews} />}
      <Footer
        specializations={specializations?.specializations}
        doctors={doctors?.doctors}
        illnesses={illnesses?.illnesses}
      />
    </div>
  )
}
export default HomePage
