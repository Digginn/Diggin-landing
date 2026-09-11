function PrismSideSvg({ idPrefix }) {
  return (
    <svg
      viewBox='0 0 375 1154'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='prism-svg'
    >
      <g opacity='0.9'>
        <g opacity='0.88' filter={`url(#${idPrefix}-side-left-filter)`}>
          <path
            d='M154.823 1104.25L-62.5 48.6992V271.006V366.006L149.022 1104.25H154.823Z'
            fill={`url(#${idPrefix}-side-left-gradient)`}
            fillOpacity='0.74'
          />
        </g>
        <g opacity='0.88' filter={`url(#${idPrefix}-side-right-filter)`}>
          <path
            d='M225 1104.51L423 95.5059V422.145L230.648 1104.51H225Z'
            fill={`url(#${idPrefix}-side-right-gradient)`}
            fillOpacity='0.74'
          />
        </g>
      </g>
      <defs>
        <filter
          id={`${idPrefix}-side-left-filter`}
          x='-111.2'
          y='-0.000782013'
          width='314.722'
          height='1152.96'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='0' result='effect1_foregroundBlur_93_4705' />
        </filter>
        <filter
          id={`${idPrefix}-side-right-filter`}
          x='176.3'
          y='46.8059'
          width='295.4'
          height='1106.4'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='0' result='effect1_foregroundBlur_93_4705' />
        </filter>
        <linearGradient
          id={`${idPrefix}-side-left-gradient`}
          x1='140.5'
          y1='962.506'
          x2='107.821'
          y2='971.187'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF0000' stopOpacity='0.5' />
          <stop offset='0.25' stopColor='#FFFB00' stopOpacity='0.838759' />
          <stop offset='0.774038' stopColor='white' stopOpacity='0.757212' />
          <stop offset='1' stopColor='#0062FF' />
        </linearGradient>
        <linearGradient
          id={`${idPrefix}-side-right-gradient`}
          x1='245.543'
          y1='966.734'
          x2='273.039'
          y2='973.374'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF0000' stopOpacity='0.5' />
          <stop offset='0.269231' stopColor='#FFFB00' stopOpacity='0.838759' />
          <stop offset='0.754808' stopColor='white' stopOpacity='0.757212' />
          <stop offset='1' stopColor='#0062FF' />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Rectangle63Svg({ idPrefix }) {
  return (
    <svg
      viewBox='0 0 523 1534'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='prism-svg'
    >
      <g opacity='0.88' filter={`url(#${idPrefix}-main-filter)`}>
        <g clipPath={`url(#${idPrefix}-main-clip-path)`} data-figma-skip-parse='true'>
          <g transform='matrix(0 0.36699 0.047711 0 261.155 1350.69)'>
            <foreignObject x='-3885.35' y='-3885.35' width='7770.71' height='7770.71'>
              <div
                xmlns='http://www.w3.org/1999/xhtml'
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: 1,
                  background:
                    'conic-gradient(from 90deg, rgba(127, 48, 127, 0.7493) 0deg, rgba(0, 97, 255, 1) 99.4631deg, rgba(255, 250, 0, 0.64) 125.069deg, rgba(255, 254, 233, 0.7642) 127.106deg, rgba(255, 255, 255, 0.7572) 233.287deg, rgba(255, 251, 20, 0.6) 235.549deg, rgba(255, 0, 0, 0.5) 261.121deg, rgba(127, 48, 127, 0.7493) 360deg)',
                }}
              />
            </foreignObject>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id={`${idPrefix}-main-filter`}
          x='-0.000778198'
          y='-0.000778198'
          width='522.314'
          height='1533.4'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='3.6' result='effect1_foregroundBlur_93_4710' />
        </filter>
        <clipPath id={`${idPrefix}-main-clip-path`}>
          <path d='M77.457 317.974C77.0098 314.562 77.1266 311.204 77.9392 307.86C86.1869 273.919 139.249 77.1992 261.155 77.1992C383.071 77.1992 436.132 273.948 444.374 307.867C445.185 311.207 445.302 314.559 444.857 317.967L296.235 1456.2H226.615L77.457 317.974Z' />
        </clipPath>
      </defs>
    </svg>
  )
}

function Rectangle64Svg({ idPrefix }) {
  return (
    <svg
      viewBox='0 0 452 1525'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='prism-svg'
    >
      <g filter={`url(#${idPrefix}-multiply-filter)`}>
        <path
          d='M100 100H351.636L273.762 1425H182.856L100 100Z'
          fill={`url(#${idPrefix}-multiply-gradient)`}
          style={{ mixBlendMode: 'multiply' }}
        />
      </g>
      <defs>
        <filter
          id={`${idPrefix}-multiply-filter`}
          x='0'
          y='0'
          width='451.637'
          height='1525'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='28.4' result='effect1_foregroundBlur_93_4265' />
        </filter>
        <linearGradient
          id={`${idPrefix}-multiply-gradient`}
          x1='224.351'
          y1='751.064'
          x2='224.351'
          y2='1099.57'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0' />
          <stop offset='1' stopColor='#1C1C1C' stopOpacity='0.98' />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PrismSideLayer({ idPrefix, className = '' }) {
  return (
    <div className={`prism-side-light ${className}`}>
      <div className='prism-side-light-inner'>
        <PrismSideSvg idPrefix={idPrefix} />
      </div>
    </div>
  )
}

function PrismMainLayers({ idPrefix }) {
  return (
    <>
      <div className='prism-rectangle-63'>
        <Rectangle63Svg idPrefix={idPrefix} />
      </div>
      <div className='prism-rectangle-64'>
        <Rectangle64Svg idPrefix={idPrefix} />
      </div>
    </>
  )
}

export default function PrismLight() {
  return (
    <div className='prism-light-field' aria-hidden='true'>
      <PrismSideLayer idPrefix='prism-side-base' className='prism-side-light-base' />
      <PrismSideLayer idPrefix='prism-side-soft-blur' className='prism-side-light-soft-blur' />
      <PrismSideLayer idPrefix='prism-side-strong-blur' className='prism-side-light-strong-blur' />
      <PrismMainLayers idPrefix='prism-main' />
    </div>
  )
}
