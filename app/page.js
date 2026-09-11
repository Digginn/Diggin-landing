'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Input from '@/app/components/Input'
import ProductCard from '@/app/components/ProductCard'
import PrismLight from '@/app/components/PrismLight'
import PrivacyAgreementModal from '@/app/components/PrivacyAgreementModal'
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

const AGREEMENT_ERROR = '개인정보 이용 동의가 필요해요.'
const AGREEMENT_VERSION = '2026-09-12'

function getResponsiveMode() {
  if (typeof window === 'undefined') return { inputSize: 's' }
  if (window.innerWidth >= 1280) return { inputSize: 'l' }
  if (window.innerWidth >= 744) return { inputSize: 'm' }
  return { inputSize: 's' }
}

function getPrismScale() {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1280) return 2.25
  if (window.innerWidth >= 744) return 1.5
  return 1
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
      const prismScale = getPrismScale()
      const start = -80 * prismScale
      const collectedFolderCenterY = (871 + 210 / 2) * prismScale
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
    <section ref={sectionRef} className='prism-section relative z-10 overflow-visible bg-gray-900'>
      <div className='prism-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent' />

      <div className='prism-stage relative z-30 mx-auto h-[1232px] w-[375px]'>
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

        <div className='absolute inset-x-0 top-[255px] z-30 text-center text-b1 text-white'>
          <p>
            발견한 순간 <br className='min-[744px]:hidden' />
            저장하고,
          </p>
        </div>

        <div className='absolute inset-x-0 top-[671px] z-30 text-center'>
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

          <div
            className='absolute left-1/2 top-0 z-0 h-full w-full -translate-x-1/2'
            style={{ opacity: collectEase }}
          >
            <Image
              src='/images/folder/folder_l_btm.png'
              alt=''
              fill
              sizes='274px'
              className='folder-panel-glow object-fill'
            />
          </div>

          <Image
            src='/images/folder/folder_m_close.svg'
            alt=''
            fill
            sizes='274px'
            className='relative z-20 object-contain'
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
          <p>
            <span className='text-rainbow-glow'>고민</span>도 쇼핑의{' '}
            <span className='text-rainbow-glow'>일부</span>니까
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [agreementError, setAgreementError] = useState('')
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [responsiveMode, setResponsiveMode] = useState({ inputSize: 's' })
  const isPhoneReady = getPhoneError(phone) === ''
  const canSubmit = isPhoneReady && agreed && !isSubmitting

  useEffect(() => {
    const updateMode = () => setResponsiveMode(getResponsiveMode())

    updateMode()
    window.addEventListener('resize', updateMode)

    return () => window.removeEventListener('resize', updateMode)
  }, [])

  const handlePhoneChange = (next) => {
    setPhone(next)
    setSubmitMessage('')
    const err = getPhoneError(next)
    if (hasTriedSubmit) setPhoneError(err)
    setAgreementError(!err && hasTriedSubmit && !agreed ? AGREEMENT_ERROR : '')
  }

  const handlePhoneBlur = () => {
    const err = getPhoneError(phone)
    setHasTriedSubmit(true)
    setPhoneError(err)
    setAgreementError(!err && !agreed ? AGREEMENT_ERROR : '')
  }

  const handleAgreementToggle = () => {
    const next = !agreed
    setAgreed(next)
    setSubmitMessage('')
    setAgreementError(!next && isPhoneReady ? AGREEMENT_ERROR : '')
  }

  const handleAgreementBlur = () => {
    setAgreementError(!agreed && isPhoneReady ? AGREEMENT_ERROR : '')
  }

  const handleSubmit = async () => {
    setHasTriedSubmit(true)
    setSubmitMessage('')
    const err = getPhoneError(phone)
    setPhoneError(err)
    setAgreementError(!err && !agreed ? AGREEMENT_ERROR : '')
    if (err) return
    if (!agreed) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/launch-notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          privacyAgreed: agreed,
          agreementVersion: AGREEMENT_VERSION,
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setPhoneError(
          data.type === 'server_error'
            ? '저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.'
            : data.message ?? '저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.'
        )
        return
      }

      setPhoneError('')
      setAgreementError('')
      setSubmitMessage(data.message ?? '출시 알림 신청이 완료됐어요.')
    } catch {
      setPhoneError('저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const ActionPill = ({ label, icon, count, radiusClassName }) => (
    <div
      className={`relative flex h-[30px] items-center justify-center gap-1 bg-gradient-to-b from-white to-gray-200 px-[14px] py-[3px] min-[744px]:h-[45px] min-[744px]:gap-1.5 min-[744px]:px-[21px] min-[744px]:py-[4.5px] min-[1280px]:h-[60px] min-[1280px]:gap-2 min-[1280px]:px-7 min-[1280px]:py-1.5 ${radiusClassName}`}
    >
      <span className='text-[14px] font-semibold leading-[1.7] tracking-[-0.28px] text-black whitespace-nowrap min-[744px]:text-[21px] min-[744px]:tracking-[-0.42px] min-[1280px]:text-[28px] min-[1280px]:tracking-[-0.56px]'>
        {label}
      </span>
      <span className='relative size-4 shrink-0 overflow-hidden min-[744px]:size-6 min-[1280px]:size-8'>
        <Image
          src={icon}
          alt=''
          fill
          sizes='(min-width: 1280px) 32px, (min-width: 744px) 24px, 16px'
          className='object-contain'
        />
      </span>
      <span className='absolute -right-[12px] -top-2 flex h-4 min-w-[22px] items-center justify-center rounded-[11px] bg-black px-[7px] min-[744px]:-right-[18px] min-[744px]:-top-3 min-[744px]:h-6 min-[744px]:min-w-[33px] min-[744px]:rounded-[17px] min-[744px]:px-[10.5px] min-[1280px]:-right-6 min-[1280px]:-top-4 min-[1280px]:h-8 min-[1280px]:min-w-11 min-[1280px]:rounded-[22px] min-[1280px]:px-3.5'>
        <span className='text-[10px] font-bold leading-[1.6] tracking-[-0.2px] text-white min-[744px]:text-[15px] min-[744px]:tracking-[-0.3px] min-[1280px]:text-[20px] min-[1280px]:tracking-[-0.4px]'>
          {count}
        </span>
      </span>
    </div>
  )

  return (
    <main className='min-h-screen overflow-x-hidden bg-gray-900 font-sans'>
      <div className='landing-page mx-auto min-h-screen w-full overflow-visible bg-gray-900'>
        {/* ── 상단 아이템 이미지 ── */}
        <div className='landing-top-visual relative h-[244px] overflow-hidden'>
          <div className='absolute left-1/2 h-[300px] w-[442px] -translate-x-1/2 -top-8 min-[744px]:h-[358px] min-[744px]:w-[811px] min-[744px]:-top-[114px] min-[1280px]:h-[460px] min-[1280px]:w-[1300px] min-[1280px]:-top-44'>
            <Image
              src='/images/landing/landing-top-mobile.png'
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
          </div>
        </div>

        {/* ── 메인 콘텐츠 ── */}
        <div className='landing-content relative z-30 flex flex-col items-center gap-20 px-8 pb-[129px]'>
          {/* 헤드라인 */}
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

          {/* 폴더 + 인풋 + 동의 */}
          <div className='flex w-full flex-col items-center gap-[52px] min-[744px]:gap-[78px] min-[1280px]:gap-[104px]'>
            {/* 폴더 */}
            <div className='flex flex-col items-center gap-6 min-[744px]:gap-9 min-[1280px]:gap-12'>
              <div className='landing-folder-icon relative h-20 w-[120px]'>
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
            <div className='flex w-full flex-col items-center gap-[7px] min-[744px]:gap-[10.5px] min-[1280px]:gap-3.5'>
              <Input
                size={responsiveMode.inputSize}
                value={phone}
                onChange={handlePhoneChange}
                onSubmit={handleSubmit}
                onBlur={handlePhoneBlur}
                error={phoneError}
                disabled={!canSubmit}
                placeholder='010-XXXX-XXXX.digging'
              />
              {agreementError ? (
                <p className='w-[324px] px-5 text-[12px] font-medium leading-[1.3] tracking-[0.24px] text-[#ff383c] min-[744px]:w-[486px] min-[744px]:px-[30px] min-[744px]:text-[18px] min-[744px]:tracking-[0.36px] min-[1280px]:w-[648px] min-[1280px]:px-10 min-[1280px]:text-[24px] min-[1280px]:tracking-[0.48px]'>
                  {agreementError}
                </p>
              ) : null}
              {submitMessage ? (
                <p className='w-[324px] px-5 text-[12px] font-medium leading-[1.3] tracking-[0.24px] text-gray-300 min-[744px]:w-[486px] min-[744px]:px-[30px] min-[744px]:text-[18px] min-[744px]:tracking-[0.36px] min-[1280px]:w-[648px] min-[1280px]:px-10 min-[1280px]:text-[24px] min-[1280px]:tracking-[0.48px]'>
                  {submitMessage}
                </p>
              ) : null}
              <div className='flex w-[355px] items-center gap-0.5 min-[744px]:w-[532.5px] min-[744px]:gap-[3px] min-[1280px]:w-[710px] min-[1280px]:gap-1'>
                <button
                  type='button'
                  onBlur={handleAgreementBlur}
                  onClick={handleAgreementToggle}
                  className='flex size-12 shrink-0 cursor-pointer items-center justify-center min-[744px]:size-[72px] min-[1280px]:size-24'
                >
                  <Image
                    src={agreed ? '/icons/live_area-3.svg' : '/icons/live_area-7.svg'}
                    alt={agreed ? '동의' : '미동의'}
                    width={
                      responsiveMode.inputSize === 'l'
                        ? 36
                        : responsiveMode.inputSize === 'm'
                          ? 27
                          : 18
                    }
                    height={
                      responsiveMode.inputSize === 'l'
                        ? 36
                        : responsiveMode.inputSize === 'm'
                          ? 27
                          : 18
                    }
                  />
                </button>
                <button
                  type='button'
                  onBlur={handleAgreementBlur}
                  onClick={handleAgreementToggle}
                  className='text-b3 cursor-pointer whitespace-nowrap text-gray-300 min-[744px]:text-[24px] min-[744px]:tracking-[-0.48px] min-[1280px]:text-[32px] min-[1280px]:tracking-[-0.64px]'
                >
                  개인정보 이용 동의하고 출시 알림 받기
                </button>
                <button
                  type='button'
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className='flex size-12 shrink-0 cursor-pointer items-center justify-center min-[744px]:size-[72px] min-[1280px]:size-24'
                >
                  <span className='text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-gray-500 underline min-[744px]:text-[24px] min-[744px]:tracking-[-0.48px] min-[1280px]:text-[32px] min-[1280px]:tracking-[-0.64px]'>
                    자세히
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 브랜드 앱 */}
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
                {[...BRANDS, ...BRANDS].map((b, i) => (
                  <div
                    key={`${b.alt}-${i}`}
                    className='relative size-12 shrink-0 overflow-hidden rounded-[8px] min-[744px]:size-[72px] min-[744px]:rounded-[12px] min-[1280px]:size-24 min-[1280px]:rounded-[16px]'
                  >
                    <Image
                      src={b.src}
                      alt={b.alt}
                      fill
                      sizes='(min-width: 1280px) 96px, (min-width: 744px) 72px, 48px'
                      className='object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 버튼 데모 */}
          <div className='flex w-full flex-col items-center gap-[42px] min-[744px]:gap-[60px] min-[1280px]:gap-20'>
            <div className='flex flex-col items-center gap-[10px] text-center min-[744px]:gap-[15px] min-[1280px]:gap-5'>
              <p className='text-s1 text-gray-400'>모든 상품을 모아드릴게요.</p>
              <div className='text-h4 text-gray-50 leading-[1.2]'>
                <p>내 취향이 너무 많아서 헷갈렸다면,</p>
                <p>이제 디깅이 도와줄게요.</p>
              </div>
            </div>
            <div className='flex h-[30px] w-full max-w-[375px] items-center justify-center gap-[14px] overflow-visible px-0 min-[744px]:h-[45px] min-[744px]:max-w-[562.5px] min-[744px]:gap-[21px] min-[1280px]:h-[60px] min-[1280px]:max-w-[750px] min-[1280px]:gap-7'>
              {ACTION_BUTTONS.map((button) => (
                <ActionPill key={button.label} {...button} />
              ))}
            </div>
          </div>
        </div>

        {/* ── 프리즘 섹션 ── */}
        <LightFolderSection />

        {/* ── 설문 CTA ── */}
        <section className='relative flex flex-col items-center gap-9 overflow-hidden pt-[68px] pb-[288px] min-[744px]:gap-[54px] min-[744px]:pt-[102px] min-[744px]:pb-[432px] min-[1280px]:gap-[72px] min-[1280px]:pt-[136px] min-[1280px]:pb-[576px]'>
          <div className='relative z-10 flex w-full flex-col items-center gap-9 min-[744px]:gap-[54px] min-[1280px]:gap-[72px]'>
            <div className='flex w-full flex-col items-center gap-5 min-[744px]:gap-[30px] min-[1280px]:gap-10'>
              <div className='flex h-[27px] items-center justify-center rounded-[19px] bg-gray-700 px-[14px] min-[744px]:h-[40.5px] min-[744px]:rounded-[28.5px] min-[744px]:px-[21px] min-[1280px]:h-[54px] min-[1280px]:rounded-[38px] min-[1280px]:px-7'>
                <p className='survey-kicker whitespace-nowrap text-gray-400'>
                  쇼핑 아카이빙 &#39;디깅&#39;
                </p>
              </div>
              <div className='w-full max-w-[375px] text-center min-[744px]:max-w-[586px]'>
                <p className='survey-title whitespace-nowrap text-white'>
                  쇼핑 아카이빙에 대한
                </p>
                <p className='survey-title whitespace-nowrap text-white'>
                  여러분의 의견을 들려주세요.
                </p>
              </div>
            </div>
            <button
              type='button'
              className='flex h-10 w-[272px] items-center justify-center rounded-[4px] bg-gray-200 min-[744px]:h-[60px] min-[744px]:w-[408px] min-[1280px]:h-20 min-[1280px]:w-[544px]'
            >
              <span className='survey-button-text text-gray-800'>설문 바로가기</span>
            </button>
          </div>

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
        </section>
      </div>
      <PrivacyAgreementModal
        open={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        onAgree={() => {
          setAgreed(true)
          setAgreementError('')
        }}
      />
    </main>
  )
}
