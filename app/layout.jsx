import './globals.css'
import './styles/landing.css'
import './styles/prism.css'
import './styles/brand-loop.css'
import './styles/modal.css'
import './styles/input.css'

const siteTitle = 'Diggin | 나만의 관심 상품 아카이빙 앱'
const siteDescription = '여러 쇼핑몰에 흩어진 관심 상품을 한 곳에 모아두고, 필요할 때 다시 찾아보세요.'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://diggin-landing.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: 'Diggin',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/twitter-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='ko' className='h-full'>
      <head>
        <link rel='preconnect' href='https://cdn.jsdelivr.net' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css'
        />
      </head>
      <body className='min-h-full'>{children}</body>
    </html>
  )
}
