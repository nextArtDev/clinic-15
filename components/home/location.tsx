'use client'
import { LocateFixedIcon, LocateIcon, MapPin } from 'lucide-react'
import React from 'react'

type Props = {}

function Location({}: Props) {
  const location =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.20369538100186!2d49.30242579370218!3d31.933135522601827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc1ac4211b78767%3A0xd31dd15175bcfef0!2sMasjedsoleyman%2C%20Khuzestan%20Province%2C%20Iran!5e0!3m2!1sen!2sus!4v1739462422164!5m2!1sen!2sus'
  return (
    <button
      className=" relative w-full h-28 max-w-md   md:h-32 z-20 mx-auto mt-2  rounded-full gradient-base-r "
      onClick={() => window.open(location)}
    >
      <iframe
        src={location}
        loading="lazy"
        className=" w-full h-28   md:h-32"
        style={{ borderRadius: '12%', opacity: '100%' }}
      ></iframe>
      <div
        className="glass rounded-xl  absolute inset-0 w-full h-full  gradient-base opacity-75 cursor-pointer flex justify-center items-center text-9xl outline-8 outline-double -outline-offset-8 outline-[#56C2D8] "
        onClick={() => window.open(location)}
      >
        {/* <MapPin className=" drop-shadow-xl w-12 h-12 origin-center animate-spin-slow text-[#56C2D8] " /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 64 64"
        >
          <path
            fill="#fff7f0"
            d="M57,28.33V51a6,6,0,0,1-6,6H13a6,6,0,0,1-6-6V13a6,6,0,0,1,6-6H39.23"
          ></path>
          <path fill="#72caaf" d="M7,51V13a6,6,0,0,1,6-6H39.23L39,19Z"></path>
          <path
            fill="#f9e3ae"
            d="M13,57,9,56,7.17,52.17C7.17,48.85,42.5,16,42.5,16l.21,11.54Z"
          ></path>
          <path
            fill="#97e0bb"
            d="M57,7H12c-.55,0-4,2.45-4,3H8a4,4,0,0,0,4,4H58a4,4,0,0,0,4-4h0C62,9.45,57.55,7,57,7Z"
          ></path>
          <path
            fill="#faefde"
            d="M36.6,33.6,57,54c0-3.31.52-26.84.52-26.84l-14.79.41Z"
          ></path>
          <path fill="#85cbf8" d="M13 57L50 57 31.45 38.71 13 57z"></path>
          <path
            fill="#ed7899"
            d="M37,14.28a13,13,0,0,1,26,0c0,9.39-11.56,17.33-13,28.84C48.56,31.62,37,23.67,37,14.28Z"
          ></path>
          <path fill="#f9dd8f" d="M50 9A5 5 0 1 0 50 19A5 5 0 1 0 50 9Z"></path>
          <path
            fill="#8d6c9f"
            d="M17 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 17 16zM12 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 12 16zM32 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 32 16zM22 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 22 16zM27 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 27 16z"
          ></path>
          <path
            fill="#8d6c9f"
            d="M64,14.28A14,14,0,0,0,38.74,6H13a7,7,0,0,0-7,7V51c0,.12,0,.23,0,.35a1,1,0,0,0,0,.25A7,7,0,0,0,12.4,58a1,1,0,0,0,.16,0l.09,0L13,58H51a7,7,0,0,0,7-7V28.33s0,0,0,0C61.1,23.63,64,19.22,64,14.28Zm-14-12a12,12,0,0,1,12,12c0,4.4-2.82,8.62-5.8,13.09-2.38,3.56-4.81,7.21-6.2,11.34-1.38-4.13-3.82-7.78-6.2-11.34-3-4.47-5.8-8.69-5.8-13.09A12,12,0,0,1,50,2.28ZM13,8H37.51A13.89,13.89,0,0,0,36,14.28a15,15,0,0,0,1.18,5.6l-.1.06L8,49V13A5,5,0,0,1,13,8ZM8.08,51.78l30-30A52.77,52.77,0,0,0,41.15,27L12.22,55.92A5,5,0,0,1,8.08,51.78Zm23.14-12L47.47,56H15ZM51,56h-.7L32.64,38.33l3.64-3.64L40.54,39A1,1,0,0,0,42,37.54l-4.26-4.26,4.59-4.59c3,4.48,6,9.13,6.73,14.56a1,1,0,0,0,2,0c.55-4.38,2.65-8.25,5-11.94V51a4.9,4.9,0,0,1-.05.53l-4.37-4.37a1,1,0,0,0-1.41,1.41l5.07,5.07A5,5,0,0,1,51,56Z"
          ></path>
          <path
            fill="#8d6c9f"
            d="M50 12A2 2 0 1 0 50 16A2 2 0 1 0 50 12Z"
          ></path>
          <path
            fill="#8d6c9f"
            d="M50,20a6,6,0,0,0,6-6,1,1,0,0,0-2,0,4,4,0,1,1-5.2-3.82,1,1,0,1,0-.6-1.91A6,6,0,0,0,50,20Z"
          ></path>
          <path
            fill="#8d6c9f"
            d="M51.48 10.28a4 4 0 0 1 1.45 1 1 1 0 1 0 1.46-1.36 6 6 0 0 0-2.17-1.48 1 1 0 1 0-.74 1.86zM44.89 40.48a1 1 0 0 0-1.41 1.41l1.85 1.85a1 1 0 0 0 1.41-1.41z"
          ></path>
          <path
            fill="#faefde"
            d="M18,30a6,6,0,0,0,6-6,1,1,0,0,0-1-1H19.25a1,1,0,0,0,0,2h2.62a4,4,0,1,1-2-4.52,1,1,0,1,0,1-1.76A6,6,0,1,0,18,30Z"
          ></path>
        </svg>
      </div>
    </button>
  )
}

export default Location
