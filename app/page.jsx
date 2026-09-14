import Image from 'next/image'
import ActionButtonSection from '@/app/components/ActionButtonSection'
import BrandLoopSection from '@/app/components/BrandLoopSection'
import LaunchNotificationForm from '@/app/components/LaunchNotificationForm'
import LightFolderSection from '@/app/components/LightFolderSection'
import Footer from '@/app/components/Footer'
import InstagramSection from '@/app/components/InstagramSection'

export default function Home() {
  return (
    <main className='min-h-screen overflow-clip bg-gray-900 font-sans'>
      <link
        rel='preload'
        as='image'
        href='/images/landing/landing-top-mobile.svg'
        media='(max-width: 743px)'
        fetchPriority='high'
      />
      <div className='landing-page mx-auto min-h-screen w-full overflow-visible bg-gray-900'>
        <div className='landing-top-visual relative h-[244px] overflow-hidden'>
          <div className='absolute left-1/2 h-[288px] w-[450px] -translate-x-1/2 -top-5 min-[744px]:h-[358px] min-[744px]:w-[1280px] min-[744px]:-top-[88px] min-[1280px]:h-[460px] min-[1280px]:w-[1280px] min-[1280px]:-top-44'>
            <Image
              src='/images/landing/landing-top-mobile.svg'
              alt=''
              width={450}
              height={288}
              loading='eager'
              fetchPriority='high'
              className='block min-[744px]:hidden'
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src='/images/landing/landing-top-tablit.svg'
              alt=''
              width={1280}
              height={358}
              className='hidden min-[744px]:block min-[1280px]:hidden'
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src='/images/landing/landing-top-desktop.svg'
              alt=''
              width={1280}
              height={460}
              className='hidden min-[1280px]:block'
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div
            className='pointer-events-none absolute inset-0'
            style={{
              background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.20) 0%, #1E1E1E 100%)',
            }}
          />
        </div>

        <div className='landing-content relative z-30 flex flex-col items-center gap-20 px-8 pb-[129px]'>
          <div className='landing-headline flex flex-col items-center gap-[8px] text-center '>
            <div className='flex flex-col items-center'>
              <p className='text-h2 text-gray-400'>그 때 내가 찜해둔</p>
              <p className='text-h1 text-white'>그 지갑 어디에 있지?</p>
            </div>
            <p className='text-s1 text-gray-400'>
              여러 쇼핑몰에 상품을 저장하다 보면,
              <br />
              어떤 상품을 어디에 저장했는지 찾기 어려워져요.
            </p>
          </div>

          <div className='flex w-full flex-col items-center gap-[24px] min-[744px]:gap-8 min-[1280px]:gap-8'>
            <div className='flex flex-col items-center gap-6 min-[744px]:gap-9 min-[1280px]:gap-12'>
              <div className='landing-folder-icon relative h-20 w-[120px]'>
                <div
                  className='folder-panel-glow absolute rounded-[6px] bg-gradient-to-b from-[rgba(255,255,255,0.68)] to-[#848484] border-[0.5px] border-[rgba(255,255,255,0.32)]'
                  style={{
                    inset: '0 6.67%',
                    animationPlayState: 'running',
                  }}
                />
                <div className='absolute inset-x-0 bottom-0' style={{ top: '25%' }}>
                  <Image
                    src='/images/folder/folder_s_open.svg'
                    alt=''
                    fill
                    sizes='120px'
                    className='object-fill'
                  />
                </div>
              </div>
              <p className='text-h5 text-white'>.diggin</p>
            </div>

            <LaunchNotificationForm />

            <p className='flex h-[81px] w-[329px] items-center justify-center rounded bg-[#343434] text-center text-[14px] font-semibold leading-[24px] text-white min-[744px]:h-[121.5px] min-[744px]:w-[493.5px] min-[744px]:rounded-[6px] min-[744px]:text-[21px] min-[744px]:leading-[36px]'>
              * 26년 9월 내로 iOS 앱이 먼저 출시돼요.
              <br />
              안드로이드 출시도 함께 알려드릴게요!
            </p>
          </div>

          <BrandLoopSection />
          <ActionButtonSection />
        </div>

        <LightFolderSection />
        <InstagramSection />
        <Footer />
      </div>
    </main>
  )
}
