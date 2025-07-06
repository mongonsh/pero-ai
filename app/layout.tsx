import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "PeroAI - AI Governance Platform",
  description: "PeroAI is a multi-agent GenAI firewall that evaluates, rewrites, and vocalizes prompts.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className={"min-h-screen bg-background font-sans antialiased"}>{children}</body>
    </html>
  )
}
