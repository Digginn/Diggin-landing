'use client'

import { useId, useState } from 'react'
import Image from 'next/image'

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export default function Input({
  size = 's',
  value = '',
  onChange,
  onSubmit,
  error,
  disabled = false,
  ...inputProps
}) {
  const {
    id,
    className = '',
    style,
    onKeyDown,
    onFocus,
    onBlur,
    'aria-describedby': ariaDescribedBy,
    ...restInputProps
  } = inputProps

  const generatedId = useId()
  const [focused, setFocused] = useState(false)
  const inputValue = String(value ?? '')
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const describedBy = [ariaDescribedBy, error ? errorId : null].filter(Boolean).join(' ') || undefined
  const hasValue = inputValue.length > 0
  const canSubmit = hasValue && !disabled

  const borderColor = error
    ? '#ff383c'
    : focused
    ? '#0084ff'
    : 'rgba(255,255,255,0.24)'

  const handleKeyDown = (e) => {
    onKeyDown?.(e)

    if (e.key === 'Enter' && !e.defaultPrevented && canSubmit) {
      onSubmit?.(e)
    }
  }

  return (
    <div className='phone-input' data-size={size}>
      <div
        style={{
          height: 'calc(60px * var(--input-scale))',
          border: `calc(1px * var(--input-scale)) solid ${borderColor}`,
          paddingLeft: 'calc(8px * var(--input-scale))',
          borderRadius: 200,
          backgroundColor: 'rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: 'calc(12px * var(--input-scale))',
            paddingRight: 'calc(8px * var(--input-scale))',
          }}
        >
          <input
            id={inputId}
            type='tel'
            inputMode='numeric'
            {...restInputProps}
            value={inputValue}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            onChange={(e) => onChange?.(formatPhone(e.target.value))}
            onKeyDown={handleKeyDown}
            onFocus={(e) => { setFocused(true); onFocus?.(e) }}
            onBlur={(e) => { setFocused(false); onBlur?.(e) }}
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: 'calc(18px * var(--input-scale))',
              fontWeight: 400,
              lineHeight: 2.35,
              color: hasValue ? 'white' : 'rgba(255,255,255,0.2)',
              ...style,
            }}
            className={`bg-transparent border-none outline-none font-sans placeholder:text-white/20 ${className}`}
          />
          <button
            type='button'
            disabled={!canSubmit}
            onClick={(e) => canSubmit && onSubmit?.(e)}
            style={{
              width: 'calc(44px * var(--input-scale))',
              height: 'calc(44px * var(--input-scale))',
              flexShrink: 0,
              cursor: canSubmit ? 'pointer' : 'default',
            }}
            className='flex items-center justify-center'
            aria-label='제출'
          >
            <Image
              src={canSubmit ? '/icons/arrow-circle-black.svg' : '/icons/arrow-circle-gray.svg'}
              alt=''
              width={37}
              height={37}
              style={{ width: 'var(--input-icon-size)', height: 'var(--input-icon-size)' }}
            />
          </button>
        </div>
      </div>
      {error && (
        <p
          id={errorId}
          style={{
            paddingLeft: 'calc(20px * var(--input-scale))',
            marginTop: 8,
            fontSize: 'calc(12px * var(--input-scale))',
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: '0.24px',
            color: '#ff383c',
          }}
          className='font-sans'
        >
          {error}
        </p>
      )}
    </div>
  )
}
