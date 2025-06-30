import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/providers/app-providers'

export const metadata: Metadata = {
  title: 'GoWAG - WhatsApp Gateway',
  description: 'Control and manage your WhatsApp messaging with GoWAG',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
