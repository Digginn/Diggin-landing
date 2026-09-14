import Image from 'next/image'
import { ACTION_BUTTONS } from '@/app/data/landing'

function ActionPill({ label, icon, count, radiusClassName }) {
  return (
    <div
      className={`relative flex h-[30px] items-center justify-center gap-1 bg-gradient-to-b from-white to-gray-200 px-[14px] py-[3px] min-[744px]:h-[45px] min-[744px]:gap-1.5 min-[744px]:px-[21px] min-[744px]:py-[4.5px] min-[1280px]:h-[45px] min-[1280px]:gap-1.5 min-[1280px]:px-[21px] min-[1280px]:py-[4.5px] ${radiusClassName}`}
    >
      <span className='text-[14px] font-semibold leading-[1.7] tracking-[-0.28px] text-black whitespace-nowrap min-[744px]:text-[21px] min-[744px]:tracking-[-0.42px] min-[1280px]:text-[21px] min-[1280px]:tracking-[-0.42px]'>
        {label}
      </span>
      <span className='relative size-4 shrink-0 overflow-hidden min-[744px]:size-6 min-[1280px]:size-6'>
        <Image
          src={icon}
          alt=''
          fill
          sizes='(min-width: 744px) 24px, 16px'
          className='object-contain'
        />
      </span>
      <span className='absolute -right-[12px] -top-2 flex h-4 min-w-[22px] items-center justify-center rounded-[11px] bg-black px-[7px] min-[744px]:-right-[18px] min-[744px]:-top-3 min-[744px]:h-6 min-[744px]:min-w-[33px] min-[744px]:rounded-[17px] min-[744px]:px-[10.5px] min-[1280px]:-right-[18px] min-[1280px]:-top-3 min-[1280px]:h-6 min-[1280px]:min-w-[33px] min-[1280px]:rounded-[17px] min-[1280px]:px-[10.5px]'>
        <span className='text-[10px] font-bold leading-[1.6] tracking-[-0.2px] text-white min-[744px]:text-[15px] min-[744px]:tracking-[-0.3px] min-[1280px]:text-[15px] min-[1280px]:tracking-[-0.3px]'>
          {count}
        </span>
      </span>
    </div>
  )
}

export default function ActionButtonSection() {
  return (
    <div className='flex w-full flex-col items-center gap-[42px] min-[744px]:gap-[60px] min-[1280px]:gap-20'>
      <div className='flex flex-col items-center gap-[10px] text-center min-[744px]:gap-[15px] min-[1280px]:gap-5'>
        <p className='text-s1 text-gray-400'>모든 상품을 모아드릴게요.</p>
        <div className='text-h4 text-gray-50 leading-[1.2]'>
          <p>내 취향이 너무 많아서 헷갈렸다면,</p>
          <p>이제 디긴이 도와줄게요.</p>
        </div>
      </div>
      <div className='flex h-[30px] w-full max-w-[375px] items-center justify-center gap-[14px] overflow-visible px-0 min-[744px]:h-[45px] min-[744px]:max-w-[562.5px] min-[744px]:gap-[21px] min-[1280px]:h-[45px] min-[1280px]:max-w-[562.5px] min-[1280px]:gap-[21px]'>
        {ACTION_BUTTONS.map((button) => (
          <ActionPill key={button.label} {...button} />
        ))}
      </div>
    </div>
  )
}
