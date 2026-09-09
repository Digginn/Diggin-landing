import "./globals.css";

export const metadata = {
  title: "DIGGIN",
  description: "쇼핑 아카이빙 앱, 찜했던 그 상품 다시 찾아드릴게요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
