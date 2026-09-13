'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/app/components/ProductCard'
import PrismLight from '@/app/components/PrismLight'
import { COLLECTED_PRODUCT_STATES, PRISM_PRODUCTS, RANDOM_POOL } from '@/app/data/landing'

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

function getCollectVariant() {
  if (typeof window === 'undefined') return 'mobile'
  if (window.innerWidth >= 1280) return 'desktop'
  if (window.innerWidth >= 744) return 'tablet'
  return 'mobile'
}

function getResponsiveCollectedState(collectedState, variant) {
  if (!collectedState) return null
  return {
    ...collectedState,
    ...(collectedState[variant] ?? {}),
  }
}

function numberFromDataset(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const FOLDER_STORED_PRODUCTS_BASE = [
  {
    src: '/images/items/random/optimized/random_2.webp',
    left: 44,
    top: 20,
    width: 78,
    height: 79,
  },
  {
    src: '/images/items/folder-items/optimized/image 1666.webp',
    left: 134,
    top: 48,
    width: 83.7,
    height: 84.5,
  },
  {
    src: '/images/items/folder-items/optimized/image_monstertshirts.webp',
    left: 49.8,
    top: 74.7,
    width: 94.9,
    height: 95.8,
  },
  {
    src: '/images/items/folder-items/optimized/image_bagandsuite.webp',
    left: 130,
    top: 70,
    width: 120,
    height: 121.1,
  },
  {
    src: '/images/items/folder-items/optimized/image 362.webp',
    left: 20,
    top: 102,
    width: 83.2,
    height: 84,
  },
]

const FOLDER_STORED_PRODUCTS_DESKTOP = [
  {
    src: '/images/items/random/optimized/random_2.webp',
    left: 34.4,
    top: 8,
    width: 78,
    height: 79,
  },
  {
    src: '/images/items/folder-items/optimized/image 1666.webp',
    left: 124.4,
    top: 36,
    width: 83.7,
    height: 84.5,
  },
  {
    src: '/images/items/folder-items/optimized/image_monstertshirts.webp',
    left: 40.2,
    top: 62.7,
    width: 94.9,
    height: 95.8,
  },
  {
    src: '/images/items/folder-items/optimized/image_bagandsuite.webp',
    left: 116,
    top: 60,
    width: 120,
    height: 116,
  },
  {
    src: '/images/items/folder-items/optimized/image 362.webp',
    left: 16,
    top: 90,
    width: 83.2,
    height: 84,
  },
]

export default function LightFolderSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const folderRef = useRef(null)
  const prismFieldRef = useRef(null)
  const productCardsRef = useRef(null)
  const progressRef = useRef(-1)
  const naturalScrollRef = useRef(false)
  const captionTimeoutRef = useRef(null)
  const captionVisibleRef = useRef(false)

  useEffect(() => {
    let frameId = 0
    let cachedSectionTop = 0
    let cachedSectionHeight = 0
    let cachedPrismScale = 1
    let cachedStart = 0
    let cachedEnd = 0

    const cacheLayout = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      cachedSectionTop = rect.top + window.scrollY
      cachedSectionHeight = rect.height
      cachedPrismScale = getPrismScale()
      cachedStart = -80 * cachedPrismScale
      const collectedFolderCenterY = (871 + 210 / 2) * cachedPrismScale
      cachedEnd = window.innerHeight / 2 - collectedFolderCenterY
      section.style.setProperty('--prism-stage-sticky-top', `${cachedEnd}px`)
    }

    const updateProductCards = (collectEase) => {
      if (!productCardsRef.current) {
        productCardsRef.current = Array.from(
          sectionRef.current?.querySelectorAll('[data-collect-card]') ?? [],
        ).map((card) => ({
          card,
          mobile: {
            moveX: numberFromDataset(card.dataset.moveX),
            moveY: numberFromDataset(card.dataset.moveY),
            finalOpacity: numberFromDataset(card.dataset.finalOpacity),
            finalScale: numberFromDataset(card.dataset.finalScale, 1),
          },
          tablet: {
            moveX: numberFromDataset(
              card.dataset.moveXTablet,
              numberFromDataset(card.dataset.moveX),
            ),
            moveY: numberFromDataset(
              card.dataset.moveYTablet,
              numberFromDataset(card.dataset.moveY),
            ),
            finalOpacity: numberFromDataset(
              card.dataset.finalOpacityTablet,
              numberFromDataset(card.dataset.finalOpacity),
            ),
            finalScale: numberFromDataset(
              card.dataset.finalScaleTablet,
              numberFromDataset(card.dataset.finalScale, 1),
            ),
          },
          desktop: {
            moveX: numberFromDataset(
              card.dataset.moveXDesktop,
              numberFromDataset(card.dataset.moveX),
            ),
            moveY: numberFromDataset(
              card.dataset.moveYDesktop,
              numberFromDataset(card.dataset.moveY),
            ),
            finalOpacity: numberFromDataset(
              card.dataset.finalOpacityDesktop,
              numberFromDataset(card.dataset.finalOpacity),
            ),
            finalScale: numberFromDataset(
              card.dataset.finalScaleDesktop,
              numberFromDataset(card.dataset.finalScale, 1),
            ),
          },
        }))
      }

      const variant = getCollectVariant()

      productCardsRef.current.forEach(({ card, mobile, tablet, desktop }) => {
        const { moveX, moveY, finalOpacity, finalScale } = { mobile, tablet, desktop }[variant]
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

      folder.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`
    }

    const updateProgress = () => {
      frameId = 0
      const section = sectionRef.current
      if (!section) return

      const scrollY = window.scrollY
      const top = cachedSectionTop - scrollY
      const sectionBottom = cachedSectionTop + cachedSectionHeight - scrollY
      const prismScale = cachedPrismScale
      const start = cachedStart
      const end = cachedEnd
      const nextProgress = Math.min(1, Math.max(0, (start - top) / (start - end)))

      // freeze 끝나는 시점에 sticky → relative 전환 (snap 없이 자연 스크롤)
      const stageEl = stageRef.current
      if (stageEl) {
        const stickyCutoff = end + 1232 * prismScale
        if (nextProgress >= 1 && sectionBottom <= stickyCutoff) {
          if (!naturalScrollRef.current) {
            naturalScrollRef.current = true
            stageEl.style.position = 'relative'
            // sticky(top: end)와 시각적으로 동일한 위치를 relative로 유지
            // relativeTop = end - sectionTop (section이 stage의 기준점이므로)
            stageEl.style.top = `${end - top}px`
          }
        } else if (naturalScrollRef.current && sectionBottom > stickyCutoff + 4) {
          naturalScrollRef.current = false
          stageEl.style.position = ''
          stageEl.style.top = ''
        }
      }

      const cardProgress = Math.min(1, Math.max(0, nextProgress / 0.6))
      const collectEase = 1 - (1 - cardProgress) ** 3

      const folderGrowProgress = Math.min(1, Math.max(0, (nextProgress - 0.6) / 0.4))
      const folderGrowEase = 1 - (1 - folderGrowProgress) ** 3

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
      if (!prismFieldRef.current) {
        prismFieldRef.current = sectionRef.current?.querySelector('.prism-light-field') ?? null
      }
      if (prismFieldRef.current) prismFieldRef.current.style.opacity = String(1 - nextProgress)
      section.style.setProperty(
        '--folder-glow-play-state',
        nextProgress > 0.96 ? 'running' : 'paused',
      )

      updateFolder(folderGrowEase)
      updateProductCards(collectEase)
    }

    const requestUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateProgress)
    }

    let resizeTimer = 0
    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        cacheLayout()
        requestUpdate()
      }, 150)
    }

    cacheLayout()
    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      if (captionTimeoutRef.current) window.clearTimeout(captionTimeoutRef.current)
      if (resizeTimer) window.clearTimeout(resizeTimer)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', handleResize)
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
            const getCollectTarget = (state) =>
              state
                ? {
                    x: state.left + cardWidth / 2,
                    y: state.top + cardHeight / 2,
                  }
                : {
                    x: folderTarget.x + targetOffsetX,
                    y: folderTarget.y + targetOffsetY,
                  }
            const mobileState = getResponsiveCollectedState(collectedState, 'mobile')
            const tabletState = getResponsiveCollectedState(collectedState, 'tablet')
            const desktopState = getResponsiveCollectedState(collectedState, 'desktop')
            const mobileTarget = getCollectTarget(mobileState)
            const tabletTarget = getCollectTarget(tabletState)
            const desktopTarget = getCollectTarget(desktopState)
            const originX = item.left + cardWidth / 2
            const originY = item.top + cardHeight / 2

            return (
              <ProductCard
                key={index}
                {...item}
                collectMoveX={mobileTarget.x - originX}
                collectMoveY={mobileTarget.y - originY}
                collectTabletMoveX={tabletTarget.x - originX}
                collectTabletMoveY={tabletTarget.y - originY}
                collectDesktopMoveX={desktopTarget.x - originX}
                collectDesktopMoveY={desktopTarget.y - originY}
                collectFinalOpacity={mobileState?.opacity ?? 0}
                collectFinalScale={mobileState?.scale ?? 0.36}
                collectTabletFinalOpacity={tabletState?.opacity ?? mobileState?.opacity ?? 0}
                collectTabletFinalScale={tabletState?.scale ?? mobileState?.scale ?? 0.36}
                collectDesktopFinalOpacity={
                  desktopState?.opacity ?? tabletState?.opacity ?? mobileState?.opacity ?? 0
                }
                collectDesktopFinalScale={
                  desktopState?.scale ?? tabletState?.scale ?? mobileState?.scale ?? 0.36
                }
                eager
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
        <ProductCard key={product.src} {...product} collectable={false} eager />
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
