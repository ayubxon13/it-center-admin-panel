import type {Metadata} from "next"
import "./globals.css"
import NextTopLoader from "nextjs-toploader"
import SideNavbar from "@/components/SideNavbar"
import {ReduxProvider} from "@/provider/ReduxProvider"
import {Inter} from "next/font/google"
import Chat from "@/components/Chat"
export const metadata: Metadata = {
  title: "CRM-admin-panel",
  description: "This is admin panel",
}

const inter = Inter({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <NextTopLoader />
          <SideNavbar />
          <div className={`max-container pl-[270px] pr-[30px] `}>
            {children}
          </div>
        </ReduxProvider>
        <Chat />
      </body>
    </html>
  )
}
