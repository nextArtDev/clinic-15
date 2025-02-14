'use client'
import React, { ReactNode } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Carousel, {
  Slider,
  SliderContainer,
  ThumsSlider,
} from './carousel-component'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GoldsmithLabeledSection from './GoldsMith'
import SvgShadow from './SvgShadow'
// import { imgPreview } from '@/components/website/constant'
const laboratories = [
  {
    id: '1',
    image: '/images/labratoar/hemato.webp',
    title: 'هماتولوژی',
    description:
      'اندازه‌گیری گلبول‌های سفید و انواع آن برای تشخیص عفونت یا التهاب در بدن. همچنین، شمارش و بررسی گلبول‌های قرمز برای تشخیص کم‌خونی و سایر اختلالات خونی.',
  },
  {
    id: '2',
    image: '/images/labratoar/biochemy.webp',
    title: 'بیوشیمی',
    description:
      'اندازه‌گیری قند، چربی، پروتئین، آنزیم‌ها و سایر مواد شیمیایی در خون برای تشخیص بیماری‌های مختلف مانند دیابت، بیماری‌های قلبی، مشکلات کلیوی و کبدی.',
  },
  {
    id: '3',
    image: '/images/labratoar/mikrob.webp',
    title: 'میکروبشناسی',
    description:
      'بررسی نمونه‌های مختلف بدن (خون، ادرار، مدفوع و غیره) برای تشخیص عفونت‌های باکتریایی، قارچی یا ویروسی و تعیین نوع میکروب عامل بیماری.',
  },
  {
    id: '4',
    image: '/images/labratoar/serology.webp',
    title: 'سرولوژی',
    description:
      'شناسایی و اندازه‌گیری آنتی‌بادی‌های موجود در خون برای تشخیص عفونت‌های ویروسی، بیماری‌های خودایمنی و برخی از سرطان‌ها.',
  },
  {
    id: '5',
    image: '/images/labratoar/potology.jpg',
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
    <section dir="ltr" className="w-full mx-auto  max-h-screen ">
      <h2 className="px-2 py-1 w-fit text-center mx-auto text-2xl  font-bold text-pretty glass  title-color">
        آزمایشگاه
      </h2>
      <div className="rounded-t-lg 2xl:w-[60%] glass p-0.5 sm:w-[80%] w-[94%] mx-auto">
        <Carousel
          options={OPTIONS}
          className=" relative"
          isAutoPlay={true}
          // isScale={true}
        >
          <SliderContainer className="gap-1">
            {laboratories.map((laboratory, index) => (
              <Slider
                key={`slide-${index}`}
                className="relative sm:h-[550px] h-[500px] w-full rounded-md overflow-hidden "
                // thumnailSrc={laboratory.image}
                thumbnail={<GoldsmithLabeledSection title={laboratory.title} />}
              >
                <motion.figure
                  // // initial={{ scale: 3 }}
                  // className="scale-125"
                  // whileInView={{ scale: 1 }}
                  // transition={{ duration: 0.3 }}
                  initial={{ zoom: 1.3 }} // Start scaled up
                  whileInView={{ zoom: 1 }} // Scale down to normal size when in view
                  transition={{ duration: 0.3 }}
                  viewport={{ once: false }} // Allow multiple triggers
                  className="w-full h-full  "
                >
                  <Image
                    src={laboratory.image}
                    // width={1400}
                    // height={800}
                    fill
                    alt={laboratory.title}
                    className="h-full  object-cover rounded-lg w-full"
                  />
                </motion.figure>
                {/* <h2 className="absolute top-0 left-1/2 -translate-x-1/2  ">
                  {laboratory.description}
                </h2> */}
                <SvgShadow className="!z-[3]" />
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
