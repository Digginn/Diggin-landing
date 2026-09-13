import Image from 'next/image'

function PrismSideLayer() {
  return (
    <Image
      src='/images/prism/prism_side.png'
      alt=''
      width={1166}
      height={2307}
      sizes='583px'
      className='prism-side-ray'
      loading='eager'
      fetchPriority='high'
    />
  )
}

function PrismMainLayers() {
  return (
    <>
      <div className='prism-rectangle-63'>
        <Image
          src='/images/prism/rectangle-63.png'
          alt=''
          fill
          sizes='375px'
          className='prism-light-image'
          loading='eager'
          fetchPriority='high'
        />
      </div>
      <div className='prism-rectangle-64'>
        <Image
          src='/images/prism/rectangle-64.png'
          alt=''
          fill
          sizes='375px'
          className='prism-light-image'
          loading='eager'
          fetchPriority='high'
        />
      </div>
    </>
  )
}

export default function PrismLight() {
  return (
    <div className='prism-light-field' aria-hidden='true'>
      <PrismSideLayer />
      <PrismMainLayers />
    </div>
  )
}
