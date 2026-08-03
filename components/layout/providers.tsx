'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

/**
 * Client providers mounted once in the root layout.
 * `next-themes` writes the theme class before paint via its own inline script,
 * so there is no flash of the wrong colour scheme.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      storageKey="naehs.theme"
    >
      {children}
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast:
              'font-sans rounded-xl border border-border bg-popover text-popover-foreground shadow-lg',
            title: 'font-display font-semibold',
            description: 'text-muted-foreground',
          },
        }}
      />
    </ThemeProvider>
  )
}
