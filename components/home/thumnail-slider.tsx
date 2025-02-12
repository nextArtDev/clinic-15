import React, { ReactNode } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Carousel, {
  Slider,
  SliderContainer,
  ThumsSlider,
} from './carousel-component'
import Image from 'next/image'
import GoldsmithLabeledSection from './GoldsMith'
// import { imgPreview } from '@/components/website/constant'
const laboratories = [
  {
    id: '1',
    image: '/images/head-1.webp',
    title: 'هماتولوژی',
    description:
      'اندازه‌گیری گلبول‌های سفید و انواع آن برای تشخیص عفونت یا التهاب در بدن. همچنین، شمارش و بررسی گلبول‌های قرمز برای تشخیص کم‌خونی و سایر اختلالات خونی.',
  },
  {
    id: '2',
    image: '/images/head-2.webp',
    title: 'بیوشیمی',
    description:
      'اندازه‌گیری قند، چربی، پروتئین، آنزیم‌ها و سایر مواد شیمیایی در خون برای تشخیص بیماری‌های مختلف مانند دیابت، بیماری‌های قلبی، مشکلات کلیوی و کبدی.',
  },
  {
    id: '3',
    image: '/images/head-3.webp',
    title: 'میکروبشناسی',
    description:
      'بررسی نمونه‌های مختلف بدن (خون، ادرار، مدفوع و غیره) برای تشخیص عفونت‌های باکتریایی، قارچی یا ویروسی و تعیین نوع میکروب عامل بیماری.',
  },
  {
    id: '4',
    image: '/images/head-4.webp',
    title: 'سرولوژی',
    description:
      'شناسایی و اندازه‌گیری آنتی‌بادی‌های موجود در خون برای تشخیص عفونت‌های ویروسی، بیماری‌های خودایمنی و برخی از سرطان‌ها.',
  },
  {
    id: '5',
    image: '/images/head-5.webp',
    title: 'هورمون‌شناسی',
    description:
      'اندازه‌گیری میزان هورمون‌های مختلف بدن برای تشخیص اختلالات هورمونی مانند مشکلات تیروئید، دیابت و ناباروری.',
  },
  // {id:'6',image:'', title:'', description:""},
  // {id:'7',image:'', title:'', description:""},
]

function ThumnailSlider() {
  const OPTIONS: EmblaOptionsType = { loop: true }
  return (
    <section dir="ltr">
      <div className="rounded-lg 2xl:w-[70%] bg-background sm:w-[80%] w-[90%] mx-auto">
        <Carousel options={OPTIONS} className=" relative" isAutoPlay={true}>
          <SliderContainer className="gap-1">
            {laboratories.map((laboratory, index) => (
              <Slider
                key={`slide-${index}`}
                className="relative  xl:h-[400px] sm:h-[550px] h-[500px] w-full rounded-md overflow-hidden !outline-none "
                // thumnailSrc={laboratory.image}
                thumbnail={<GoldsmithLabeledSection title={laboratory.title} />}
              >
                <Image
                  src={laboratory.image}
                  // width={1400}
                  // height={800}
                  fill
                  alt={laboratory.title}
                  className="h-full object-cover rounded-lg w-full"
                />
                <h2 className="absolute top-0 left-1/2 -translate-x-1/2  ">
                  {laboratory.description}
                </h2>
              </Slider>
            ))}
          </SliderContainer>
          <ThumsSlider />
        </Carousel>
      </div>
    </section>
  )
}

export default ThumnailSlider
