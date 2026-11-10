import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mavora | Web3 Digital Creative Marketplace",
  description:
    "Discover, buy, and sell digital products, creative assets, and NFTs with an internal USDC wallet on Base.",
  icons: {
    icon: [
      { url: '/mavora-logo.png', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/mavora-logo.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0D14] text-[#EDEDED] font-sans">
        {children}
      </body>
    </html>
  );
}
