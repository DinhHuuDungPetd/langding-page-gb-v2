import "./globals.css";

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://greenlab.vn'),
    title: "Green Lab",
    description: "Khát vọng vươn xa",
    keywords: "xét nghiệm, y tế, Green Lab, dịch vụ y tế",
    authors: [{ name: "Green Lab" }],
    robots: "index, follow",
    openGraph: {
        title: "Green Lab",
        description: "Khát vọng vươn xa",
        type: "website",
        locale: "vi_VN",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/FzPoppins-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FzPoppins-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

