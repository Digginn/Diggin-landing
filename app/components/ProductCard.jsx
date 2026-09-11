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
  actionSize = 20,
  imageBox,
  crop,
  sourceSize,
}) {
  const icon = action === 'heart' ? '/icons/live_area.svg' : '/icons/live_area-6.svg'
  const cardWidth = width ?? size
  const cardHeight = height ?? size
  const imageWidth = imageBox?.width ?? cardWidth - padding * 2
  const imageHeight = imageBox?.height ?? cardHeight - padding * 2
  const imageLeft = imageBox?.x ?? (cardWidth - imageWidth) / 2
  const imageTop = imageBox?.y ?? (cardHeight - imageHeight) / 2

  return (
    <div
      className='absolute z-20 rounded-[6px] border border-white/30 bg-gradient-to-b from-white/[0.42] to-white/[0.09] shadow-[inset_0_1px_1px_rgba(255,255,255,0.24),0_12px_24px_rgba(0,0,0,0.14)] backdrop-blur-[2px]'
      style={{ left, top, width: cardWidth, height: cardHeight }}
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
            width: actionSize,
            height: actionSize,
          }}
        >
          <Image src={icon} alt='' fill sizes={`${actionSize}px`} />
        </span>
      ) : null}
    </div>
  )
}
