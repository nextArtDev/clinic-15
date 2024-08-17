import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import { numericFont, primaryFont } from '@/lib/fonts'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'
import Navbar from '@/components/home/nav/Navbar'
import { TooltipProvider } from '@/components/ui/tooltip'
import Link from 'next/link'

export const metadata = {
  title: 'درمانگاه آئین شفق',
  description:
    'درمانگاه شبانه‌روزی آیین شفق | اصفهان، ابتدای اتوبان ذوب آهن، بلوار شفق',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={` ${primaryFont.className} ${numericFont.className} adad min-h-screen`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <ModalProvider /> */}
            <TooltipProvider>
              {/* <Navbar /> */}
              {children}
            </TooltipProvider>

            <Toaster richColors position="bottom-left" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
