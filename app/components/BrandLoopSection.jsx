import Image from 'next/image'
import { BRANDS } from '@/app/data/landing'

export default function BrandLoopSection() {
  return (
    <div className='flex w-full flex-col items-center gap-11 min-[744px]:gap-[66px] min-[1280px]:gap-[88px]'>
      <div className='flex flex-col items-center gap-[10px] text-center min-[744px]:gap-[15px] min-[1280px]:gap-5'>
        <p className='text-s1 text-gray-400'>여러 앱을 돌아다니지 마세요.</p>
        <div className='text-h4 text-gray-50 leading-[1.2]'>
          <p>당신이 디깅한 아이템은</p>
          <p>여기에 모입니다.</p>
        </div>
      </div>
      <div className='brand-loop -mx-8 w-[calc(100%+64px)] overflow-hidden min-[744px]:-mx-12 min-[744px]:w-[calc(100%+96px)] min-[1280px]:-mx-16 min-[1280px]:w-[calc(100%+128px)]'>
        <div className='brand-loop-track flex w-max gap-2 px-8 min-[744px]:gap-3 min-[744px]:px-12 min-[1280px]:gap-4 min-[1280px]:px-16'>
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div
              key={`${brand.alt}-${index}`}
              className='relative size-12 shrink-0 overflow-hidden rounded-[8px] min-[744px]:size-[72px] min-[744px]:rounded-[12px] min-[1280px]:size-24 min-[1280px]:rounded-[16px]'
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                sizes='(min-width: 1280px) 96px, (min-width: 744px) 72px, 48px'
                className='object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
