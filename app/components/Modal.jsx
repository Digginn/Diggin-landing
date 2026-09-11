'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function Modal({
  open,
  title,
  titleId = 'modal-title',
  actionLabel,
  onAction,
  onClose,
  children,
}) {
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

  const handleAction = () => {
    onAction?.()
    onClose?.()
  }

  return (
    <div className='modal-overlay' role='presentation' onMouseDown={handleBackdropClick}>
      <section className='modal-panel' role='dialog' aria-modal='true' aria-labelledby={titleId}>
        <div className='modal-content'>
          <div className='modal-copy'>
            <header className='modal-header'>
              <h2 id={titleId} className='modal-title'>
                {title}
              </h2>
              <button type='button' className='modal-close' onClick={onClose} aria-label='닫기'>
                <Image
                  src='/icons/live_area-5.svg'
                  alt=''
                  width={18}
                  height={18}
                  className='modal-close-icon'
                />
              </button>
            </header>

            {children}
          </div>

          {actionLabel ? (
            <button type='button' className='modal-agree' onClick={handleAction}>
              {actionLabel}
            </button>
          ) : null}
        </div>
      </section>
    </div>
  )
}
