import './globals.css'
import './styles/landing.css'
import './styles/prism.css'
import './styles/brand-loop.css'
import './styles/modal.css'

export const metadata = {
  title: 'Diggin',
  description: '쇼핑 아카이빙 앱, 찜했던 그 상품 다시 찾아드릴게요.',
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
