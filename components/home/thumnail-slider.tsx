import React, { ReactNode } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Carousel, { Slider, SliderContainer, ThumsSlider } from './carousel'
import Image from 'next/image'
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
  const OPTIONS: EmblaOptionsType = { loop: false }
  return (
    <section dir="ltr">
      <div className=" 2xl:w-[70%] bg-background sm:w-[80%] w-[90%] mx-auto">
        <Carousel options={OPTIONS} className=" relative" isAutoPlay={true}>
          <SliderContainer className="gap-2">
            {laboratories.map((laboratory) => (
              <Slider
                key={laboratory.id}
                className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
                thumnailSrc={laboratory.image}
              >
                <Image
                  src={laboratory.image}
                  width={1400}
                  height={800}
                  alt="image"
                  className="h-full object-cover rounded-lg w-full"
                />
              </Slider>
            ))}
            {/* <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img2}
            >
              <Image
                src={imgPreview.img2}
                width={1400}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img3}
            >
              <Image
                src={imgPreview.img3}
                width={1400}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img4}
            >
              <Image
                src={imgPreview.img4}
                width={1400}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img5}
            >
              <Image
                src={imgPreview.img5}
                width={1400}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img6}
            >
              <Image
                src={imgPreview.img6}
                width={1400}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img7}
            >
              <Image
                src={imgPreview.img7}
                width={1200}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img8}
            >
              <Image
                src={imgPreview.img8}
                width={1200}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className=" xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img9}
            >
              <Image
                src={imgPreview.img9}
                width={1200}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider>
            <Slider
              className=" xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={imgPreview.img10}
            >
              <Image
                src={imgPreview.img10}
                width={1200}
                height={800}
                alt="image"
                className="h-full object-cover rounded-lg w-full"
              />
            </Slider> */}
          </SliderContainer>
          <ThumsSlider />
        </Carousel>
      </div>
    </section>
  )
}

export default ThumnailSlider
