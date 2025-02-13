'use client'
import { LocateFixedIcon, LocateIcon, MapPin } from 'lucide-react'
import React from 'react'

type Props = {}

function Location({}: Props) {
  const location =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.20369538100186!2d49.30242579370218!3d31.933135522601827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc1ac4211b78767%3A0xd31dd15175bcfef0!2sMasjedsoleyman%2C%20Khuzestan%20Province%2C%20Iran!5e0!3m2!1sen!2sus!4v1739462422164!5m2!1sen!2sus'
  return (
    <button
      className=" relative w-full h-20 max-w-md   md:h-28 z-20 mx-auto mt-2  rounded-full gradient-base-r "
      onClick={() => window.open(location)}
    >
      <iframe
        src={location}
        loading="lazy"
        className=" w-full h-20   md:h-28"
        style={{ borderRadius: '12%', opacity: '100%' }}
      ></iframe>
      <div
        className="glass rounded-xl  absolute inset-0 w-full h-full  gradient-base opacity-85 cursor-pointer flex justify-center items-center text-9xl outline-8 outline-double -outline-offset-8 outline-[#56C2D8] "
        onClick={() => window.open(location)}
      >
        <MapPin className=" drop-shadow-xl w-12 h-12 origin-center animate-spin-slow text-[#56C2D8] " />
      </div>
    </button>
  )
}

export default Location
