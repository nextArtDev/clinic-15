import { TooltipProvider } from '@/components/ui/tooltip'
import { numericFont, primaryFont } from '@/lib/fonts'
import AuthProvider from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  // by default for other pages: title - new page title
  // use title:{ absolute:'..'} to not contain this part in other pages title
  title: {
    default: 'مجتمع پزشکی کوثر ',
    template: '%s - مجتمع پزشکی کوثر    ',
  },
  description:
    'مجتمع پزشکی کوثر | مسجدسلیمان، خیابان آزادی، جنب سازمان تبلیغات',
  twitter: {
    card: 'summary_large_image',
  },
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
          className={` ${primaryFont.className} ${numericFont.className} adad min-h-screen `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
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
