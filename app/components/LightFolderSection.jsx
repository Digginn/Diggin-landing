'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/app/components/ProductCard'
import PrismLight from '@/app/components/PrismLight'
import {
  COLLECTED_PRODUCT_STATES,
  PRISM_PRODUCTS,
  RANDOM_POOL,
} from '@/app/data/landing'

function getPrismScale() {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1280) return 2.25
  if (window.innerWidth >= 744) return 1.5
  return 1
}

function getFolderTransform(collectEase) {
  if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
    return {
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    }
  }

  return {
    translateX: (87 - 50.5) * (1 - collectEase),
    translateY: (916 - 871) * (1 - collectEase),
    scaleX: 202 / 274 + (1 - 202 / 274) * collectEase,
    scaleY: 156 / 210 + (1 - 156 / 210) * collectEase,
  }
}

const FOLDER_STORED_PRODUCTS_BASE = [
  {
    src: '/images/items/item-decor.png',
    left: 44,
    top: 20,
    width: 78,
    height: 79,
    imageBox: { x: 8, y: 8, width: 55.2, height: 60 },
    crop: { left: '-461.33%', top: '-229.45%', width: '682.67%', height: '342.94%' },
  },
  {
    src: '/images/items/item-notebook.png',
    left: 134,
    top: 48,
    width: 83.7,
    height: 84.5,
    imageBox: { x: 21, y: 16, width: 42, height: 63 },
    crop: { left: '-1031.82%', top: '-378.85%', width: '1340.91%', height: '488%' },
  },
  {
    src: '/images/items/item-tshirt.png',
    left: 49.8,
    top: 74.7,
    width: 94.9,
    height: 95.8,
    imageBox: { x: 7.2, y: 14.3, width: 80, height: 67 },
    crop: { left: '-248%', top: '-228.62%', width: '590%', height: '383.43%' },
  },
  {
    src: '/images/items/item-bag-coat.png',
    left: 137,
    top: 77,
    width: 120,
    height: 121.1,
    imageBox: { x: 11, y: 17.5, width: 98, height: 85 },
    crop: { left: '-7.9%', top: '-5.96%', width: '279.02%', height: '175.24%' },
  },
  {
    src: '/images/items/item-terrarium.png',
    left: 18,
    top: 107,
    width: 83.2,
    height: 84,
    imageBox: { x: 16, y: 14.5, width: 52, height: 55 },
    crop: { left: '-229.12%', top: '-10%', width: '562.64%', height: '294.21%' },
  },
]

const FOLDER_STORED_PRODUCTS_DESKTOP = [
  {
    src: '/images/items/item-decor.png',
    left: 34.4,
    top: 8,
    width: 78,
    height: 79,
    imageBox: { x: 8, y: 8, width: 55.2, height: 60 },
    crop: { left: '-461.33%', top: '-229.45%', width: '682.67%', height: '342.94%' },
  },
  {
    src: '/images/items/item-notebook.png',
    left: 124.4,
    top: 36,
    width: 83.7,
    height: 84.5,
    imageBox: { x: 21, y: 16, width: 42, height: 63 },
    crop: { left: '-1031.82%', top: '-378.85%', width: '1340.91%', height: '488%' },
  },
  {
    src: '/images/items/item-tshirt.png',
    left: 40.2,
    top: 62.7,
    width: 94.9,
    height: 95.8,
    imageBox: { x: 7.2, y: 14.3, width: 80, height: 67 },
    crop: { left: '-248%', top: '-228.62%', width: '590%', height: '383.43%' },
  },
  {
    src: '/images/items/item-bag-coat.png',
    left: 127.5,
    top: 65,
    width: 120,
    height: 121.1,
    imageBox: { x: 11, y: 17.5, width: 98, height: 85 },
    crop: { left: '-7.9%', top: '-5.96%', width: '279.02%', height: '175.24%' },
  },
  {
    src: '/images/items/item-terrarium.png',
    left: 8.4,
    top: 95,
    width: 83.2,
    height: 84,
    imageBox: { x: 16, y: 14.5, width: 52, height: 55 },
    crop: { left: '-229.12%', top: '-10%', width: '562.64%', height: '294.21%' },
  },
]

export default function LightFolderSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const folderRef = useRef(null)
  const productCardsRef = useRef(null)
  const progressRef = useRef(-1)
  const naturalScrollRef = useRef(false)
  const captionTimeoutRef = useRef(null)
  const captionVisibleRef = useRef(false)

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

      const { translateX, translateY, scaleX, scaleY } = getFolderTransform(collectEase)

      if (window.innerWidth < 1280) {
        folder.style.setProperty('--folder-open-top-left', `${(-16 / scaleX).toFixed(3)}px`)
        folder.style.setProperty('--folder-open-top-top', `${(40 / scaleY).toFixed(3)}px`)
        folder.style.setProperty('--folder-open-top-width', `${(230 / scaleX).toFixed(3)}px`)
        folder.style.setProperty('--folder-open-top-height', `${(116 / scaleY).toFixed(3)}px`)
      }

      folder.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`
    }

    const updateProgress = () => {
      frameId = 0
      const section = sectionRef.current
      if (!section) return

      const { top, bottom: sectionBottom } = section.getBoundingClientRect()
      const prismScale = getPrismScale()
      const start = -80 * prismScale
      const collectedFolderCenterY = (871 + 210 / 2) * prismScale
      const end = window.innerHeight / 2 - collectedFolderCenterY
      section.style.setProperty('--prism-stage-sticky-top', `${end}px`)
      const nextProgress = Math.min(1, Math.max(0, (start - top) / (start - end)))

      // freeze 끝나는 시점에 sticky → relative 전환 (snap 없이 자연 스크롤)
      const stageEl = stageRef.current
      if (stageEl) {
        const stickyCutoff = end + 1232 * prismScale
        if (nextProgress >= 1 && sectionBottom <= stickyCutoff) {
          if (!naturalScrollRef.current) {
            naturalScrollRef.current = true
            stageEl.style.position = 'relative'
            stageEl.style.top = `${window.innerHeight}px`
          }
        } else if (naturalScrollRef.current) {
          naturalScrollRef.current = false
          stageEl.style.position = ''
          stageEl.style.top = ''
        }
      }

      const collectEase = 1 - (1 - nextProgress) ** 3
      const closeProgress = Math.min(1, Math.max(0, (nextProgress - 0.88) / 0.12))
      const closeEase = 1 - (1 - closeProgress) ** 3
      const folderTextProgress = Math.min(1, Math.max(0, (nextProgress - 0.985) / 0.015))
      const folderTextEase = 1 - (1 - folderTextProgress) ** 3

      if (folderTextProgress >= 1 && !captionVisibleRef.current && !captionTimeoutRef.current) {
        captionTimeoutRef.current = window.setTimeout(() => {
          captionVisibleRef.current = true
          section.style.setProperty('--collect-caption-progress', '1')
          captionTimeoutRef.current = null
        }, 1000)
      } else if (folderTextProgress < 1) {
        if (captionTimeoutRef.current) {
          window.clearTimeout(captionTimeoutRef.current)
          captionTimeoutRef.current = null
        }
        captionVisibleRef.current = false
        section.style.setProperty('--collect-caption-progress', '0')
      }

      if (Math.abs(progressRef.current - nextProgress) < 0.002) return
      progressRef.current = nextProgress

      section.style.setProperty('--collect-ease', collectEase.toFixed(4))
      section.style.setProperty('--folder-close-progress', closeEase.toFixed(4))
      section.style.setProperty('--folder-text-progress', folderTextEase.toFixed(4))
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
      if (captionTimeoutRef.current) window.clearTimeout(captionTimeoutRef.current)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const folderTarget = { x: 188, y: 988 }

  return (
    <section ref={sectionRef} className='prism-section relative z-10 overflow-visible bg-gray-900'>
      <div ref={stageRef} className='prism-stage z-30 mx-auto h-[1232px] w-[375px]'>
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
            left: 'var(--prism-folder-left, 50.5px)',
            top: 871,
            width: 'var(--prism-folder-width, 274px)',
            height: 'var(--prism-folder-height, 210px)',
            transform:
              'translate3d(var(--prism-folder-start-x, 36.5px), var(--prism-folder-start-y, 45px), 0) scale(var(--prism-folder-start-scale-x, 0.7372), var(--prism-folder-start-scale-y, 0.7429))',
            transformOrigin: 'top left',
            willChange: 'transform',
          }}
        >
          <div
            className='absolute inset-0'
            style={{
              opacity: 'calc(1 - var(--folder-close-progress, 0))',
              willChange: 'opacity',
            }}
          >
            <Image
              src='/images/folder/folder_m_btm.svg'
              alt=''
              fill
              sizes='274px'
              className='prism-folder-open-btm-mobile object-fill'
            />
            <Image
              src='/images/folder/folder_m_open.svg'
              alt=''
              width={230}
              height={117}
              className='prism-folder-open-top-mobile absolute left-[-16px] top-[40px] max-w-none'
            />
            <Image
              src='/images/folder/folder_l_btm.png'
              alt=''
              width={326}
              height={285}
              className='prism-folder-open-btm-desktop absolute max-w-none'
            />
            <Image
              src='/images/folder/folder_l_open.svg'
              alt=''
              width={380}
              height={193}
              className='prism-folder-open-top-desktop absolute max-w-none'
            />
          </div>

          <div
            className='absolute left-1/2 top-0 z-0 h-full w-full -translate-x-1/2'
            style={{ opacity: 'var(--folder-close-progress, 0)', willChange: 'opacity' }}
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
            className='prism-folder-close-mobile relative z-20 object-contain'
            style={{ opacity: 'var(--folder-close-progress, 0)', willChange: 'opacity' }}
          />

          <Image
            src='/images/folder/folder_l_close.svg'
            alt=''
            fill
            sizes='570px'
            className='prism-folder-close-desktop relative z-20 object-fill'
            style={{ opacity: 'var(--folder-close-progress, 0)', willChange: 'opacity' }}
          />

          <FolderStoredProducts />
          <FolderRandomText />
        </div>

        <div className='prism-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent' />

        <div className='collect-caption pointer-events-none absolute inset-x-0 z-50 text-center text-white'>
          <p>
            <span className='text-rainbow-glow'>고민</span>도 쇼핑의{' '}
            <span className='text-rainbow-glow'>일부</span>니까
          </p>
        </div>
      </div>
    </section>
  )
}

function FolderStoredProducts() {
  return (
    <>
      <StoredProductLayer
        className='folder-stored-products-base'
        products={FOLDER_STORED_PRODUCTS_BASE}
      />
      <StoredProductLayer
        className='folder-stored-products-desktop'
        products={FOLDER_STORED_PRODUCTS_DESKTOP}
      />
    </>
  )
}

function StoredProductLayer({ className, products }) {
  return (
    <div
      className={`folder-stored-products ${className} pointer-events-none absolute inset-0 z-30`}
      style={{ willChange: 'opacity' }}
    >
      {products.map((product) => (
        <ProductCard key={product.src} {...product} collectable={false} />
      ))}
    </div>
  )
}

function FolderRandomText() {
  const [indexes, setIndexes] = useState([0, 1])

  useEffect(() => {
    const pickNext = (current, exclude) => {
      let next = current
      while (next === current || next === exclude) {
        next = Math.floor(Math.random() * RANDOM_POOL.length)
      }
      return next
    }

    const intervalId = window.setInterval(() => {
      setIndexes(([i1, i2]) => {
        const next1 = pickNext(i1, i2)
        const next2 = pickNext(i2, next1)
        return [next1, next2]
      })
    }, 900)

    return () => window.clearInterval(intervalId)
  }, [])

  const randomItem1 = RANDOM_POOL[indexes[0]]
  const randomItem2 = RANDOM_POOL[indexes[1]]

  return (
    <div
      className='folder-random-text absolute left-1/2 top-[62px] z-50 w-[226px] -translate-x-1/2 text-c1 text-black'
      style={{ opacity: 'var(--folder-text-progress, 0)', willChange: 'opacity' }}
    >
      흩어진
      <span className='folder-random-paren inline-flex items-center gap-2 text-c2'>
        (
        <span className='folder-random-item relative inline-block h-11 w-8 align-middle'>
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
      <span className='folder-random-paren inline-flex items-center gap-2 text-c2'>
        (
        <span className='folder-random-item relative inline-block h-11 w-8 align-middle'>
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
