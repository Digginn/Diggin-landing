'use client'

import { useId, useState } from 'react'
import Image from 'next/image'

const SIZE = {
  s: {
    width: 324,
    height: 60,
    border: 1,
    outerPl: 8,
    innerPl: 12,
    innerPr: 8,
    fontSize: 18,
    errorFontSize: 12,
    arrowSize: 44,
    iconSize: 37,
  },
  m: {
    width: 486,
    height: 90,
    border: 1.5,
    outerPl: 12,
    innerPl: 18,
    innerPr: 12,
    fontSize: 27,
    errorFontSize: 18,
    arrowSize: 66,
    iconSize: 55,
  },
  l: {
    width: 648,
    height: 120,
    border: 2,
    outerPl: 16,
    innerPl: 24,
    innerPr: 16,
    fontSize: 36,
    errorFontSize: 24,
    arrowSize: 88,
    iconSize: 73,
  },
}

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
  const cfg = SIZE[size] ?? SIZE.s
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
    <div style={{ width: '100%', maxWidth: cfg.width }}>
      <div
        style={{
          height: cfg.height,
          border: `${cfg.border}px solid ${borderColor}`,
          paddingLeft: cfg.outerPl,
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
            paddingLeft: cfg.innerPl,
            paddingRight: cfg.innerPr,
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
              fontSize: cfg.fontSize,
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
              width: cfg.arrowSize,
              height: cfg.arrowSize,
              flexShrink: 0,
              cursor: canSubmit ? 'pointer' : 'default',
            }}
            className='flex items-center justify-center'
            aria-label='제출'
          >
            <Image
              src={canSubmit ? '/icons/arrow-circle-black.svg' : '/icons/arrow-circle-gray.svg'}
              alt=''
              width={cfg.iconSize}
              height={cfg.iconSize}
            />
          </button>
        </div>
      </div>
      {error && (
        <p
          id={errorId}
          style={{
            paddingLeft: cfg.outerPl + cfg.innerPl,
            marginTop: 8,
            fontSize: cfg.errorFontSize,
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
