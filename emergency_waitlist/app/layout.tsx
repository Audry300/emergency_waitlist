import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emergency',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{width:'100vw',height:'100vw', backgroundColor:'white'}} className={`${inter.className} bg-no-repeat`}>{children}</body>
    </html>
  )
}
