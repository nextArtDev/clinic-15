import Location from '@/components/home/location'
import { WorldMap } from './components/world-map'

function page() {
  return (
    <div className=" py-24 gradient-base  w-full">
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
      <div className="max-w-md mx-auto text-center py-8">
        <h1 className="font-bold text-xl md:text-4xl   text-black">
          ارتباط با ما
        </h1>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4 px-2">
          مسجدسلیمان، خیابان آزادی، جنب سازمان تبلیغات اسلامی، ساختمان هلال
          احمر، مجتمع پزشکی کوثر
        </p>
        <span className="flex flex-col gap-1 text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          خدمات کلینیک:
          <p>06143221197</p>
          <p>06143221193</p>
          <p className="py-4">خدمات سونوگرافی: 06143228700</p>
        </span>
        <div>
          <h2 className="font-bold text-lg md:text-2xl   text-black">
            مکان‌یابی بر روی گوگل‌مپ
          </h2>
          <Location />
        </div>
      </div>
    </div>
  )
}

export default page
