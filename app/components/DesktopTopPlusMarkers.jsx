import Image from 'next/image'

const DESKTOP_TOP_PLUS_MARKERS = [
  { left: 362, top: 351.672 },
  { left: 553.777, top: 252 },
  { left: 695.125, top: 379.142 },
  { left: 1178.73, top: 397.059 },
  { left: 869.199, top: 343.591 },
  { left: 1044.8, top: 319.904 },
]

function DesktopTopPlusMarker({ left, top }) {
  return (
    <span
      aria-hidden='true'
      className='pointer-events-none absolute z-10 hidden min-[1280px]:block'
      style={{
        left,
        top,
        width: 46,
        height: 46,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Image
        src='/icons/live_area-6.svg'
        alt=''
        width={46}
        height={46}
        className='block h-full w-full'
      />
    </span>
  )
}

export default function DesktopTopPlusMarkers() {
  return DESKTOP_TOP_PLUS_MARKERS.map(({ left, top }) => (
    <DesktopTopPlusMarker key={`${left}-${top}`} left={left} top={top} />
  ))
}
