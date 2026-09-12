'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Input from '@/app/components/Input'
import PreRegistrationCompleteModal from '@/app/components/PreRegistrationCompleteModal'
import PrivacyAgreementModal from '@/app/components/PrivacyAgreementModal'

function getPhoneError(value) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return '전화번호를 입력해주세요.'
  if (digits.length < 11) return '전화번호 11자리를 모두 입력해주세요.'
  if (!digits.startsWith('010')) return '010으로 시작하는 번호를 입력해주세요.'
  return ''
}

const AGREEMENT_ERROR = '개인정보 수집 및 이용 동의를 눌러 주세요.'
const AGREEMENT_VERSION = '2026-09-12'

function getResponsiveMode() {
  if (typeof window === 'undefined') return { inputSize: 's' }
  if (window.innerWidth >= 1280) return { inputSize: 'l' }
  if (window.innerWidth >= 744) return { inputSize: 'm' }
  return { inputSize: 's' }
}

export default function LaunchNotificationForm() {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [agreementError, setAgreementError] = useState('')
  const [hasBlurredPhone, setHasBlurredPhone] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [responsiveMode, setResponsiveMode] = useState({ inputSize: 's' })
  const isPhoneReady = getPhoneError(phone) === ''
  const canTrySubmit = isPhoneReady && !isSubmitting

  useEffect(() => {
    const updateMode = () => setResponsiveMode(getResponsiveMode())

    updateMode()
    window.addEventListener('resize', updateMode)

    return () => window.removeEventListener('resize', updateMode)
  }, [])

  const handlePhoneChange = (next) => {
    setPhone(next)
    const err = getPhoneError(next)
    if (hasBlurredPhone || hasTriedSubmit) setPhoneError(err)
    setAgreementError(!err && hasTriedSubmit && !agreed ? AGREEMENT_ERROR : '')
  }

  const handlePhoneBlur = () => {
    const err = getPhoneError(phone)
    setHasBlurredPhone(true)
    setPhoneError(err)
  }

  const handleAgreementToggle = () => {
    const next = !agreed
    setAgreed(next)
    setAgreementError(!next && isPhoneReady && hasTriedSubmit ? AGREEMENT_ERROR : '')
  }

  const handleAgreementBlur = () => {
    setAgreementError(!agreed && isPhoneReady && hasTriedSubmit ? AGREEMENT_ERROR : '')
  }

  const handleSubmit = async () => {
    setHasTriedSubmit(true)
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
            : (data.message ?? '저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.'),
        )
        return
      }

      setPhoneError('')
      setAgreementError('')
      setIsCompleteModalOpen(true)
    } catch {
      setPhoneError('저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className='flex w-full flex-col items-center gap-[7px] min-[744px]:gap-[10.5px] min-[1280px]:gap-3.5'>
        <Input
          size={responsiveMode.inputSize}
          value={phone}
          onChange={handlePhoneChange}
          onSubmit={handleSubmit}
          onBlur={handlePhoneBlur}
          error={phoneError}
          disabled={!canTrySubmit}
          placeholder='010-XXXX-XXXX.digging'
        />
        {agreementError ? (
          <p className='w-[324px] px-5 text-[12px] font-medium leading-[1.3] tracking-[0.24px] text-[#ff383c] min-[744px]:w-[486px] min-[744px]:px-[30px] min-[744px]:text-[18px] min-[744px]:tracking-[0.36px] min-[1280px]:w-[648px] min-[1280px]:px-10 min-[1280px]:text-[24px] min-[1280px]:tracking-[0.48px]'>
            {agreementError}
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
                responsiveMode.inputSize === 'l' ? 36 : responsiveMode.inputSize === 'm' ? 27 : 18
              }
              height={
                responsiveMode.inputSize === 'l' ? 36 : responsiveMode.inputSize === 'm' ? 27 : 18
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
      <PrivacyAgreementModal
        open={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        onAgree={() => {
          setAgreed(true)
          setAgreementError('')
        }}
      />
      <PreRegistrationCompleteModal
        open={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      />
    </>
  )
}
