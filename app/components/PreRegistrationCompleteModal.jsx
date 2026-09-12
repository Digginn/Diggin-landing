'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function PreRegistrationCompleteModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    const previousBodyOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  if (!open) return null

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose?.()
  }

  return (
    <div className='modal-overlay' role='presentation' onMouseDown={handleBackdropClick}>
      <section
        className='success-modal-panel'
        role='dialog'
        aria-modal='true'
        aria-labelledby='pre-registration-complete-title'
      >
        <div className='success-modal-content'>
          <div className='success-modal-copy'>
            <div className='success-modal-title-group'>
              <p className='success-modal-kicker'>쇼핑 아카이브 디깅의</p>
              <h2 id='pre-registration-complete-title' className='success-modal-title'>
                사전등록이 완료되었어요!
              </h2>
            </div>

            <div className='success-modal-icon' aria-hidden='true'>
              <Image src='/logo/app-icon-grad.svg' alt='' fill sizes='65px' />
            </div>

            <p className='success-modal-description'>
              앱이 출시되면 <span>[카카오 알림톡]</span>으로
              <br />
              알림을 전송해 드릴게요.
            </p>
          </div>

          <button type='button' className='success-modal-button' onClick={onClose}>
            완료
          </button>
        </div>
      </section>
    </div>
  )
}
