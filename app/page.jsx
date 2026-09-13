import Image from 'next/image'
import ActionButtonSection from '@/app/components/ActionButtonSection'
import BrandLoopSection from '@/app/components/BrandLoopSection'
import DesktopTopPlusMarkers from '@/app/components/DesktopTopPlusMarkers'
import LaunchNotificationForm from '@/app/components/LaunchNotificationForm'
import LightFolderSection from '@/app/components/LightFolderSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <main className='min-h-screen overflow-x-clip bg-gray-900 font-sans'>
      <div className='landing-page mx-auto min-h-screen w-full overflow-visible bg-gray-900'>
        <div className='landing-top-visual relative h-[244px] overflow-hidden'>
          <div className='absolute left-1/2 h-[300px] w-[442px] -translate-x-1/2 -top-8 min-[744px]:h-[358px] min-[744px]:w-[811px] min-[744px]:-top-[88px] min-[1280px]:h-[460px] min-[1280px]:w-[1300px] min-[1280px]:-top-44'>
            <Image
              src='/images/landing/landing-top-mobile.svg'
              alt=''
              width={442}
              height={288}
              priority
              className='block min-[744px]:hidden'
            />
            <Image
              src='/images/landing/landing-top-tablit.svg'
              alt=''
              width={811}
              height={358}
              priority
              className='hidden min-[744px]:block min-[1280px]:hidden'
            />
            <Image
              src='/images/landing/landing-top-desktop.svg'
              alt=''
              width={1300}
              height={460}
              priority
              className='hidden min-[1280px]:block'
            />
            <DesktopTopPlusMarkers />
          </div>
        </div>

        <div className='landing-content relative z-30 flex flex-col items-center gap-20 px-8 pb-[129px]'>
          <div className='landing-headline flex flex-col items-center gap-[26px] text-center pt-[26px]'>
            <div className='flex flex-col items-center'>
              <p className='text-h2 text-gray-400'>그 때 내가 저장한</p>
              <p className='text-h1 text-white'>그 지갑 어디에 있지?</p>
            </div>
            <p className='text-b3 text-gray-400'>
              여러 쇼핑몰에 상품을 저장하다 보면,
              <br />
              어떤 상품을 어디에 저장했는지 찾기 어려워져요.
            </p>
          </div>

          <div className='flex w-full flex-col items-center gap-[24px] min-[744px]:gap-[78px] min-[1280px]:gap-[104px]'>
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
              <p className='text-h5 text-white'>.digging</p>
            </div>

            <LaunchNotificationForm />
          </div>

          <BrandLoopSection />
          <ActionButtonSection />
        </div>

        <LightFolderSection />
        <Footer />
      </div>
    </main>
  )
}
