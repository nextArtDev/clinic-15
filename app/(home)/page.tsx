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
  getAllSpecializations,
} from '@/lib/queries/home'

const HomePage = async () => {
  const specializations = await getAllSpecializations({})
  const doctors = await getAllDoctors({})
  const illnesses = await getAllIllnesses({})

  return (
    <div className="relative gradient-base">
      <Hero />
      <Deal />
      {/* <Carousel slides={slider} /> */}
      <StackCards />

      {doctors?.doctors?.length && (
        <section className="relative my-24">
          <DoctorCarousel slides={doctors.doctorsWithRatings} />
        </section>
      )}
      {specializations?.specializations?.length && (
        <section className="relative ">
          <Slider specializations={specializations.specializations} />
        </section>
      )}
      {/* <DoctorCarousel slides={doctors} /> */}
      <IllnessCarousel slides={illnesses?.illnesses} />
      <Reviews />
      <Footer
        specializations={specializations?.specializations}
        doctors={doctors?.doctors}
        illnesses={illnesses?.illnesses}
      />
    </div>
  )
}
export default HomePage
