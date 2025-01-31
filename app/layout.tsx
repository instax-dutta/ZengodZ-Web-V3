import { Manrope } from "next/font/google"
import type { Metadata } from "next"
import type React from "react" // Import React

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZenGodZ Esports",
  description: "Welcome to ZenGodZ, a community created by gamers for gamers!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  )
}



import './globals.css'