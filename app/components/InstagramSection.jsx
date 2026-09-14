import Image from 'next/image'

export default function InstagramSection() {
  return (
    <section
      aria-labelledby='instagram-title'
      className='relative flex flex-col items-center gap-10 px-4 pt-8 pb-8 text-center min-[744px]:gap-[60px] min-[744px]:px-6 min-[744px]:pt-12 min-[744px]:pb-12'
    >
      <div className='flex w-full max-w-[375px] flex-col items-center gap-3 min-[744px]:max-w-[562.5px] min-[744px]:gap-[18px]'>
        <p className='text-[15px] font-medium leading-[1.6] tracking-[-0.02em] text-gray-400 min-[744px]:text-[22.5px]'>
          관련 소식을 더 빠르게 알고 싶다면?
        </p>
        <div className='flex flex-col items-center gap-[10px] min-[744px]:gap-[15px]'>
          <Image
            src='/icons/instagram.png'
            alt='Instagram'
            width={48}
            height={48}
            sizes='(min-width: 744px) 72px, 48px'
            className='size-12 rounded-xl object-cover min-[744px]:size-[72px] min-[744px]:rounded-[18px]'
          />
          <h2
            id='instagram-title'
            className='text-[20px] font-semibold leading-[1.2] text-gray-50 min-[744px]:text-[30px]'
          >
            Diggin 인스타를 팔로우하고
            <br />
            출시 소식을 받아보세요!
          </h2>
        </div>
      </div>
      <a
        href='https://www.instagram.com/diggin.app.official?stkn=YTdkaWR4d3ZxZmM1'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Diggin 공식 인스타그램 바로가기 (새 탭)'
        className='flex h-11 w-full max-w-[324px] cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-[10px] text-[18px] font-semibold leading-[1.35] text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[744px]:h-[66px] min-[744px]:max-w-[486px] min-[744px]:rounded-xl min-[744px]:p-[15px] min-[744px]:text-[27px]'
      >
        바로가기
      </a>
    </section>
  )
}
