import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/providers/theme-provider'

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
