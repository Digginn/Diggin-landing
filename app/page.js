'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Input from '@/app/components/Input'
import ProductCard from '@/app/components/ProductCard'
import PrismLight from '@/app/components/PrismLight'
import {
  ACTION_BUTTONS,
  BRANDS,
  COLLECTED_PRODUCT_STATES,
  PRISM_PRODUCTS,
  RANDOM_ITEMS,
} from '@/app/data/landing'

function getPhoneError(value) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return '전화번호를 입력해주세요.'
  if (digits.length < 11) return '전화번호 11자리를 모두 입력해주세요.'
  if (!digits.startsWith('010')) return '010으로 시작하는 번호를 입력해주세요.'
  return ''
}

function LightFolderSection() {
  const sectionRef = useRef(null)
  const [collectProgress, setCollectProgress] = useState(0)
  const [randomIndexes, setRandomIndexes] = useState({ random1: 0, random2: 0 })

  useEffect(() => {
    let frameId = 0

    const updateProgress = () => {
      frameId = 0
      const section = sectionRef.current
      if (!section) return

      const { top } = section.getBoundingClientRect()
      const start = -80
      const collectedFolderCenterY = 871 + 210 / 2
      const end = window.innerHeight / 2 - collectedFolderCenterY
      const nextProgress = Math.min(1, Math.max(0, (start - top) / (start - end)))

      setCollectProgress((previousProgress) =>
        Math.abs(previousProgress - nextProgress) < 0.002 ? previousProgress : nextProgress,
      )
    }

    const requestUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateProgress)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useEffect(() => {
    const pickNextIndex = (currentIndex, length) => {
      if (length <= 1) return currentIndex
      let nextIndex = currentIndex
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * length)
      }
      return nextIndex
    }

    const intervalId = window.setInterval(() => {
      setRandomIndexes(({ random1, random2 }) => ({
        random1: pickNextIndex(random1, RANDOM_ITEMS.random1.length),
        random2: pickNextIndex(random2, RANDOM_ITEMS.random2.length),
      }))
    }, 900)

    return () => window.clearInterval(intervalId)
  }, [])

  const collectEase = 1 - (1 - collectProgress) ** 3
  const folderTarget = { x: 188, y: 988 }
  const folderLeft = 87 + (50.5 - 87) * collectEase
  const folderTop = 916 + (871 - 916) * collectEase
  const folderWidth = 202 + (274 - 202) * collectEase
  const folderHeight = 156 + (210 - 156) * collectEase
  const randomItem1 = RANDOM_ITEMS.random1[randomIndexes.random1]
  const randomItem2 = RANDOM_ITEMS.random2[randomIndexes.random2]

  return (
    <section ref={sectionRef} className='relative z-10 h-[1232px] overflow-visible bg-gray-900'>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[268px] bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent' />

      <div className='relative mx-auto h-full w-[375px]'>
        <PrismLight collectProgress={collectProgress} />

        <div className='absolute inset-x-0 top-0 z-20 h-[1080px]'>
          {PRISM_PRODUCTS.map((item, index) => {
            const cardWidth = item.width ?? item.size
            const cardHeight = item.height ?? item.size
            const collectedState = COLLECTED_PRODUCT_STATES[item.src]
            const targetOffsetX = ((index % 5) - 2) * 3
            const targetOffsetY = (index % 4) * 3
            const collectTarget = collectedState
              ? {
                  x: collectedState.left + cardWidth / 2,
                  y: collectedState.top + cardHeight / 2,
                }
              : {
                  x: folderTarget.x + targetOffsetX,
                  y: folderTarget.y + targetOffsetY,
                }

            return (
              <ProductCard
                key={index}
                {...item}
                collectProgress={collectProgress}
                collectTarget={collectTarget}
                collectFinalOpacity={collectedState?.opacity ?? 0}
                collectFinalScale={collectedState ? 1 : 0.36}
              />
            )
          })}
        </div>

        <div
          className='absolute inset-x-0 top-[255px] z-30 text-center text-b1 text-white'
          style={{ opacity: 1 - collectEase }}
        >
          <p>발견한 순간</p>
          <p>저장하고,</p>
        </div>

        <div
          className='absolute inset-x-0 top-[671px] z-30 text-center'
          style={{ opacity: 1 - collectEase }}
        >
          <p className='mb-0.5 text-b2 text-gray-50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]'>
            필요할 때 바로 다시 찾는
          </p>
          <p className='text-b1 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]'>
            새로운 쇼핑 경험.
          </p>
        </div>

        <div
          className='absolute z-40'
          style={{
            left: folderLeft,
            top: folderTop,
            width: folderWidth,
            height: folderHeight,
          }}
        >
          <div className='absolute inset-0' style={{ opacity: 1 - collectEase }}>
            <Image
              src='/images/folder/folder_m_btm.svg'
              alt=''
              fill
              sizes='274px'
              className='object-contain'
            />
            <Image
              src='/images/folder/folder_m_open.svg'
              alt=''
              width={230}
              height={117}
              className='absolute left-[-16px] top-[40px] max-w-none'
            />
          </div>

          <Image
            src='/images/folder/folder_m_close.svg'
            alt=''
            fill
            sizes='274px'
            className='object-contain'
            style={{ opacity: collectEase }}
          />

          <div
            className='absolute left-1/2 top-[62px] z-50 w-[226px] -translate-x-1/2 text-c1 text-black'
            style={{ opacity: collectEase }}
          >
            흩어진
            <span className='inline-flex items-center gap-2 text-c2'>
              (
              <span className='relative inline-block h-11 w-8 align-middle'>
                <Image
                  src={randomItem1.src}
                  alt={randomItem1.alt}
                  fill
                  sizes='32px'
                  className='object-contain'
                />
              </span>
              )
            </span>
            <br />
            취향
            <span className='inline-flex items-center gap-2 text-c2'>
              (
              <span className='relative inline-block h-11 w-8 align-middle'>
                <Image
                  src={randomItem2.src}
                  alt={randomItem2.alt}
                  fill
                  sizes='32px'
                  className='object-contain'
                />
              </span>
              )
            </span>
            을 한 곳에
          </div>
        </div>

        <div className='absolute inset-x-0 top-[1106px] z-50 text-center text-c1 text-white'>
          <p>고민도 쇼핑의 일부니까</p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)

  const handlePhoneChange = (next) => {
    setPhone(next)
    if (hasTriedSubmit) setPhoneError(getPhoneError(next))
  }

  const handleSubmit = () => {
    setHasTriedSubmit(true)
    const err = getPhoneError(phone)
    setPhoneError(err)
    if (err) return
    console.log('제출:', phone)
  }

  const ActionPill = ({ label, icon, count, radiusClassName }) => (
    <div
      className={`relative flex h-[30px] items-center justify-center gap-1 bg-gradient-to-b from-white to-gray-200 px-[14px] py-[3px] ${radiusClassName}`}
    >
      <span className='text-[14px] font-semibold leading-[1.7] tracking-[-0.28px] text-black whitespace-nowrap'>
        {label}
      </span>
      <span className='relative size-4 shrink-0 overflow-hidden'>
        <Image src={icon} alt='' fill sizes='16px' className='object-contain' />
      </span>
      <span className='absolute -right-[12px] -top-2 flex h-4 min-w-[22px] items-center justify-center rounded-[11px] bg-black px-[7px]'>
        <span className='text-[10px] font-bold leading-[1.6] tracking-[-0.2px] text-white'>
          {count}
        </span>
      </span>
    </div>
  )

  return (
    <main className='min-h-screen overflow-x-hidden bg-gray-900 font-sans'>
      <div className='mx-auto min-h-screen w-full max-w-[743px] overflow-visible bg-gray-900'>
        {/* ── 상단 아이템 이미지 ── */}
        <div className='relative h-[244px] overflow-hidden'>
          <div className='absolute left-1/2 -translate-x-1/2 w-[442px] h-[300px] -top-8'>
            <Image
              src='/images/landing/landing-top-mobile.png'
              alt=''
              width={442}
              height={288}
              priority
              className='block'
            />
          </div>
        </div>

        {/* ── 메인 콘텐츠 ── */}
        <div className='relative z-30 flex flex-col items-center gap-20 px-8 pb-[129px]'>
          {/* 헤드라인 */}
          <div className='flex flex-col items-center gap-[26px] text-center pt-[26px]'>
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

          {/* 폴더 + 인풋 + 동의 */}
          <div className='flex flex-col items-center gap-[52px] w-full'>
            {/* 폴더 */}
            <div className='flex flex-col items-center gap-6'>
              <div className='relative w-[120px] h-[80px]'>
                <div
                  className='folder-panel-glow absolute rounded-[6px] bg-gradient-to-b from-[rgba(255,255,255,0.68)] to-[#848484] border-[0.5px] border-[rgba(255,255,255,0.32)]'
                  style={{
                    inset: '0 8px',
                  }}
                />
                <div className='absolute inset-x-0 bottom-0' style={{ top: '25%' }}>
                  <Image
                    src='/images/folder/folder_s_open.svg'
                    alt=''
                    fill
                    sizes='120px'
                    className='object-contain object-bottom'
                  />
                </div>
              </div>
              <p className='text-h5 text-white'>.digging</p>
            </div>

            {/* 인풋 + 개인정보 동의 */}
            <div className='flex flex-col gap-[7px] items-center w-full'>
              <Input
                size='s'
                value={phone}
                onChange={handlePhoneChange}
                onSubmit={handleSubmit}
                error={phoneError}
                placeholder='010-XXXX-XXXX'
              />
              <div className='flex gap-0.5 items-center w-88.75'>
                <button
                  type='button'
                  onClick={() => setAgreed(!agreed)}
                  className='size-12 flex items-center justify-center shrink-0'
                >
                  <Image
                    src={agreed ? '/icons/live_area-3.svg' : '/icons/live_area-7.svg'}
                    alt={agreed ? '동의' : '미동의'}
                    width={18}
                    height={18}
                  />
                </button>
                <p className='text-b3 text-gray-300 whitespace-nowrap'>
                  개인정보 이용 동의하고 출시 알림 받기
                </p>
                <button type='button' className='size-12 flex items-center justify-center shrink-0'>
                  <span className='text-b3 text-gray-500 underline'>자세히</span>
                </button>
              </div>
            </div>
          </div>

          {/* 브랜드 앱 */}
          <div className='flex flex-col gap-11 items-center w-full'>
            <div className='flex flex-col gap-[10px] items-center text-center'>
              <p className='text-s1 text-gray-400'>여러 앱을 돌아다니지 마세요.</p>
              <div className='text-h4 text-gray-50 leading-[1.2]'>
                <p>당신이 디깅한 아이템은</p>
                <p>여기에 모입니다.</p>
              </div>
            </div>
            <div className='brand-loop -mx-8 w-[calc(100%+64px)] overflow-hidden'>
              <div className='brand-loop-track flex w-max gap-2 px-8'>
                {[...BRANDS, ...BRANDS].map((b, i) => (
                  <div
                    key={`${b.alt}-${i}`}
                    className='relative size-12 shrink-0 overflow-hidden rounded-[8px]'
                  >
                    <Image src={b.src} alt={b.alt} fill sizes='48px' className='object-cover' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 버튼 데모 */}
          <div className='flex flex-col gap-[42px] items-center w-full'>
            <div className='flex flex-col gap-[10px] items-center text-center'>
              <p className='text-s1 text-gray-400'>모든 상품을 모아드릴게요.</p>
              <div className='text-h4 text-gray-50 leading-[1.2]'>
                <p>내 취향이 너무 많아서 헷갈렸다면,</p>
                <p>이제 디깅이 도와줄게요.</p>
              </div>
            </div>
            <div className='flex h-[30px] w-full max-w-[375px] items-center justify-center gap-[14px] overflow-visible px-0'>
              {ACTION_BUTTONS.map((button) => (
                <ActionPill key={button.label} {...button} />
              ))}
            </div>
          </div>
        </div>

        {/* ── 프리즘 섹션 ── */}
        <LightFolderSection />

        {/* ── 설문 CTA ── */}
        <section className='relative flex flex-col gap-9 items-center overflow-hidden pt-[68px] pb-[288px]'>
          <div className='relative z-10 flex flex-col gap-9 items-center w-full'>
            <div className='flex flex-col gap-5 items-center w-full'>
              <div className='bg-gray-700 rounded-[19px] px-[14px] h-6.75 flex items-center justify-center'>
                <p className='text-i2 text-gray-400 whitespace-nowrap'>
                  쇼핑 아카이빙 &#39;디깅&#39;
                </p>
              </div>
              <div className='text-center w-full max-w-[375px]'>
                <p className='text-h3 text-white whitespace-nowrap'>쇼핑 아카이빙에 대한</p>
                <p className='text-h3 text-white whitespace-nowrap'>여러분의 의견을 들려주세요.</p>
              </div>
            </div>
            <button
              type='button'
              className='bg-gray-200 rounded-[4px] h-10 w-[272px] flex items-center justify-center'
            >
              <span className='text-b3 text-gray-800 tracking-[-0.32px]'>설문 바로가기</span>
            </button>
          </div>

          <div className='pointer-events-none absolute bottom-20 left-1/2 h-36 w-[1440px] -translate-x-1/2 bg-gradient-to-b from-white/0 to-white/60' />
          <div className='absolute bottom-0 left-1/2 h-20 w-[1440px] -translate-x-1/2 bg-white flex items-center justify-center'>
            <div className='flex items-center justify-center gap-2'>
              <Image src='/logo/app-icon-black.svg' alt='' width={32} height={32} />
              <Image src='/logo/logo-wordtype-black.svg' alt='Diggin' width={100} height={32} />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
