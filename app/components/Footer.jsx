import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='relative h-56 overflow-hidden min-[744px]:h-[336px] min-[1280px]:h-[448px]'>
      <div className='pointer-events-none absolute bottom-20 left-1/2 h-36 w-[1440px] -translate-x-1/2 bg-gradient-to-b from-white/0 to-white/60 min-[744px]:bottom-[120px] min-[744px]:h-[216px] min-[744px]:w-[2160px] min-[1280px]:bottom-40 min-[1280px]:h-[288px] min-[1280px]:w-[2880px]' />
      <div className='absolute bottom-0 left-1/2 flex h-20 w-[1440px] -translate-x-1/2 items-center justify-center bg-white min-[744px]:h-[120px] min-[744px]:w-[2160px] min-[1280px]:h-40 min-[1280px]:w-[2880px]'>
        <div className='flex items-center justify-center gap-2 min-[744px]:gap-3 min-[1280px]:gap-4'>
          <Image
            src='/logo/app-icon-black.svg'
            alt=''
            width={32}
            height={32}
            className='size-8 min-[744px]:size-12 min-[1280px]:size-16'
          />
          <Image
            src='/logo/logo-wordtype-black.svg'
            alt='Diggin'
            width={100}
            height={32}
            className='h-8 w-[100px] min-[744px]:h-12 min-[744px]:w-[150px] min-[1280px]:h-16 min-[1280px]:w-[200px]'
          />
        </div>
      </div>
    </footer>
  )
}
