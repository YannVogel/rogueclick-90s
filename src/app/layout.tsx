'use client'
//import '../styled-system/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
const qc = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
    <body style={{ background:'#0b0b12', color:'#e6e6f0' }}>
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </body>
    </html>
  )
}
