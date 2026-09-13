'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BRANDS } from '@/app/data/landing'

export default function BrandLoopSection() {
  const trackRef = useRef(null)
  const [repeatCount, setRepeatCount] = useState(4)

  useLayoutEffect(() => {
    const track = trackRef.current
    const container = track.parentElement
    const updateRepeatCount = () => {
      const distance = parseFloat(
        getComputedStyle(track).getPropertyValue('--brand-loop-distance'),
      )
      // Keep a full viewport of icons after the track moves back one brand set.
      setRepeatCount(Math.ceil(container.clientWidth / distance) + 2)
    }

    updateRepeatCount()
    const observer = new ResizeObserver(updateRepeatCount)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div className='flex w-full flex-col items-center gap-11 min-[744px]:gap-[66px] min-[1280px]:gap-[88px]'>
      <div className='flex flex-col items-center gap-[10px] text-center min-[744px]:gap-[15px] min-[1280px]:gap-5'>
        <p className='text-s1 text-gray-400'>여러 앱을 돌아다니지 마세요.</p>
        <div className='text-h4 text-gray-50 leading-[1.2]'>
          <p>당신이 저장한 아이템은</p>
          <p>디깅에 모입니다.</p>
        </div>
      </div>
      <div className='brand-loop -mx-8 w-[calc(100%+64px)] overflow-hidden min-[744px]:-mx-12 min-[744px]:w-[calc(100%+96px)] min-[1280px]:-mx-16 min-[1280px]:w-[calc(100%+128px)]'>
        <div ref={trackRef} className='brand-loop-track flex w-max gap-2 min-[744px]:gap-3 min-[1280px]:gap-4'>
          {Array.from({ length: repeatCount }, () => BRANDS).flat().map((brand, index) => (
            <div
              key={`${brand.alt}-${index}`}
              aria-hidden={index >= BRANDS.length ? true : undefined}
              className='relative size-12 shrink-0 overflow-hidden rounded-[8px] min-[744px]:size-[72px] min-[744px]:rounded-[12px] min-[1280px]:size-24 min-[1280px]:rounded-[16px]'
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                sizes='(min-width: 1280px) 96px, (min-width: 744px) 72px, 48px'
                className='object-cover'
                loading='eager'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
