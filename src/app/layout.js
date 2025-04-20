import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // customize as needed
})

export const metadata = {
  title: 'Byond Wallet',
  description: 'Semua jadi lebih mudah!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
