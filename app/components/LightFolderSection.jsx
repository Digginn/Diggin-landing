'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/app/components/ProductCard'
import PrismLight from '@/app/components/PrismLight'
import {
  COLLECTED_PRODUCT_STATES,
  PRISM_PRODUCTS,
  RANDOM_ITEMS,
} from '@/app/data/landing'

function getPrismScale() {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1280) return 2.25
  if (window.innerWidth >= 744) return 1.5
  return 1
}

export default function LightFolderSection() {
  const sectionRef = useRef(null)
  const folderRef = useRef(null)
  const productCardsRef = useRef(null)
  const progressRef = useRef(-1)

  useEffect(() => {
    let frameId = 0

    const updateProductCards = (collectEase) => {
      if (!productCardsRef.current) {
        productCardsRef.current = Array.from(
          sectionRef.current?.querySelectorAll('[data-collect-card]') ?? [],
        ).map((card) => ({
          card,
          moveX: Number(card.dataset.moveX) || 0,
          moveY: Number(card.dataset.moveY) || 0,
          finalOpacity: Number(card.dataset.finalOpacity) || 0,
          finalScale: Number(card.dataset.finalScale) || 1,
        }))
      }

      productCardsRef.current.forEach(({ card, moveX, moveY, finalOpacity, finalScale }) => {
        const opacity = 1 + (finalOpacity - 1) * collectEase
        const scale = 1 + (finalScale - 1) * collectEase

        card.style.opacity = String(opacity)
        card.style.transform = `translate3d(${moveX * collectEase}px, ${
          moveY * collectEase
        }px, 0) scale(${scale})`
      })
    }

    const updateFolder = (collectEase) => {
      const folder = folderRef.current
      if (!folder) return

      const translateX = (87 - 50.5) * (1 - collectEase)
      const translateY = (916 - 871) * (1 - collectEase)
      const scaleX = 202 / 274 + (1 - 202 / 274) * collectEase
      const scaleY = 156 / 210 + (1 - 156 / 210) * collectEase

      folder.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`
    }

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
      const collectEase = 1 - (1 - nextProgress) ** 3

      if (Math.abs(progressRef.current - nextProgress) < 0.002) return
      progressRef.current = nextProgress

      section.style.setProperty('--collect-ease', collectEase.toFixed(4))
      section.style.setProperty('--prism-opacity', String(1 - nextProgress))
      section.style.setProperty(
        '--folder-glow-play-state',
        nextProgress > 0.96 ? 'running' : 'paused',
      )

      updateFolder(collectEase)
      updateProductCards(collectEase)
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

  const folderTarget = { x: 188, y: 988 }

  return (
    <section ref={sectionRef} className='prism-section relative z-10 overflow-visible bg-gray-900'>
      <div className='prism-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent' />

      <div className='prism-stage relative z-30 mx-auto h-[1232px] w-[375px]'>
        <PrismLight />

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
                collectMoveX={collectTarget.x - (item.left + cardWidth / 2)}
                collectMoveY={collectTarget.y - (item.top + cardHeight / 2)}
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
          ref={folderRef}
          className='absolute z-40'
          style={{
            left: 50.5,
            top: 871,
            width: 274,
            height: 210,
            transform: `translate3d(${87 - 50.5}px, ${916 - 871}px, 0) scale(${202 / 274}, ${
              156 / 210
            })`,
            transformOrigin: 'top left',
            willChange: 'transform',
          }}
        >
          <div
            className='absolute inset-0'
            style={{ opacity: 'calc(1 - var(--collect-ease, 0))', willChange: 'opacity' }}
          >
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
            style={{ opacity: 'var(--collect-ease, 0)', willChange: 'opacity' }}
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
            style={{ opacity: 'var(--collect-ease, 0)', willChange: 'opacity' }}
          />

          <FolderRandomText />
        </div>
      </div>

      <div className='collect-caption pointer-events-none absolute inset-x-0 z-50 text-center text-white'>
        <p>
          <span className='text-rainbow-glow'>고민</span>도 쇼핑의{' '}
          <span className='text-rainbow-glow'>일부</span>니까
        </p>
      </div>
    </section>
  )
}

function FolderRandomText() {
  const [randomIndexes, setRandomIndexes] = useState({ random1: 0, random2: 0 })

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

  const randomItem1 = RANDOM_ITEMS.random1[randomIndexes.random1]
  const randomItem2 = RANDOM_ITEMS.random2[randomIndexes.random2]

  return (
    <div
      className='absolute left-1/2 top-[62px] z-50 w-[226px] -translate-x-1/2 text-c1 text-black'
      style={{ opacity: 'var(--collect-ease, 0)', willChange: 'opacity' }}
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
  )
}
