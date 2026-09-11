import Image from 'next/image'

export default function ProductCard({
  src,
  left,
  top,
  size,
  width,
  height,
  padding = 10,
  action,
  actionLeft,
  actionTop,
  actionSize,
  imageBox,
  crop,
  sourceSize,
  collectMoveX = 0,
  collectMoveY = 0,
  collectFinalOpacity = 0.46,
  collectFinalScale = 0.52,
}) {
  const icon = action === 'heart' ? '/icons/live_area.svg' : '/icons/live_area-6.svg'
  const cardWidth = width ?? size
  const cardHeight = height ?? size
  const imageWidth = imageBox?.width ?? cardWidth - padding * 2
  const imageHeight = imageBox?.height ?? cardHeight - padding * 2
  const imageLeft = imageBox?.x ?? (cardWidth - imageWidth) / 2
  const imageTop = imageBox?.y ?? (cardHeight - imageHeight) / 2
  const resolvedActionSize = actionSize ?? Math.round(Math.min(cardWidth, cardHeight) * 0.26)

  return (
    <div
      className='collect-product-card absolute z-20 rounded-[6px] border border-white/30 bg-gradient-to-b from-white/[0.42] to-white/[0.09] shadow-[inset_0_1px_1px_rgba(255,255,255,0.24)]'
      data-collect-card
      data-move-x={collectMoveX}
      data-move-y={collectMoveY}
      data-final-opacity={collectFinalOpacity}
      data-final-scale={collectFinalScale}
      style={{
        left,
        top,
        width: cardWidth,
        height: cardHeight,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
        transformOrigin: 'center',
        willChange: 'transform, opacity',
      }}
    >
      <div
        className='absolute overflow-hidden'
        style={{
          left: imageLeft,
          top: imageTop,
          width: imageWidth,
          height: imageHeight,
          borderRadius: imageBox?.radius,
        }}
      >
        {crop ? (
          <Image
            src={src}
            alt=''
            width={sourceSize?.width ?? 1024}
            height={sourceSize?.height ?? 559}
            className='absolute max-w-none'
            style={crop}
          />
        ) : (
          <Image src={src} alt='' fill sizes={`${imageWidth}px`} className='object-contain' />
        )}
      </div>
      {action ? (
        <span
          className='absolute z-30'
          style={{
            left: actionLeft,
            top: actionTop,
            width: resolvedActionSize,
            height: resolvedActionSize,
          }}
        >
          <Image src={icon} alt='' fill sizes={`${resolvedActionSize}px`} />
        </span>
      ) : null}
    </div>
  )
}
