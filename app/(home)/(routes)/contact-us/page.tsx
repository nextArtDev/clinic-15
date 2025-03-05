import Location from '@/components/home/location'
import { WorldMap } from './components/world-map'
import { MobileIcon } from '@radix-ui/react-icons'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import PhoneLink from './components/phone-link'
import Neshan from '@/components/home/neshan/Neshan'

function page() {
  return (
    <div className="griny py-24 text-center  w-full">
      <h1 className="title-color font-bold text-xl md:text-4xl py-8  ">
        ارتباط با ما
      </h1>
      <article className="relative">
        <WorldMap
          dots={[
            {
              start: {
                lat: 34.0522,
                lng: -118.2437,
              },
              end: {
                lat: 31.950784,
                lng: 49.288696,
              }, // mis
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: {
                lat: 31.950784,
                lng: 49.288696,
              }, // mis
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: {
                lat: 31.950784,
                lng: 49.288696,
              }, // mis
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: {
                lat: 31.950784,
                lng: 49.288696,
              }, // mis
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: {
                lat: 31.950784,
                lng: 49.288696,
              }, // mis
            },
            {
              start: { lat: 31.950784, lng: 49.288696 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
        <p className="font-semibold absolute glass w-2/3 bottom-0 left-1/2 -translate-x-1/2 h-1/3 md:h-1/5 text-sm md:text-lg text-neutral-700 max-w-2xl mx-auto rounded-t-md py-0.5 md:py-1.5 px-2">
          مسجدسلیمان، خیابان آزادی، جنب سازمان تبلیغات اسلامی، ساختمان هلال
          احمر، مجتمع پزشکی کوثر
        </p>
      </article>
      <article className=" max-w-md mx-auto text-center py-8">
        <span className="flex flex-col gap-1 text-sm md:text-lg text-neutral-700 max-w-2xl mx-auto py-4">
          <p className="font-semibold">خدمات کلینیک:</p>
          <PhoneLink phone="06143221197" telLinkNumber="tel:+986143221197" />

          <PhoneLink phone="06143221193" telLinkNumber="tel:+986143221193" />

          <span className="py-4">
            <p className="font-semibold">خدمات سونوگرافی:</p>
            <PhoneLink phone="06143228700" telLinkNumber="tel:+986143228700" />
          </span>
        </span>
        <div>
          <h2 className="sub-title-color py-4 font-bold text-lg md:text-2xl ">
            مکان‌یابی بر روی گوگل‌مپ
          </h2>
          {/* <Neshan /> */}
          <Location />
        </div>
      </article>
    </div>
  )
}

export default page
