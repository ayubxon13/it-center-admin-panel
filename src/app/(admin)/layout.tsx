import type {Metadata} from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import {ReduxProvider} from "@/provider/ReduxProvider";
import {Inter} from "next/font/google";
import ShowSideNavbar from "@/components/ui/SideNavbar";
export const metadata: Metadata = {
  title: "CRM-admin-panel",
  description: "This is admin panel",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <NextTopLoader />
          <ShowSideNavbar />
          <div className={`max-container pl-[270px] pr-[30px] `}>
            {children}
          </div>
        </ReduxProvider>
        {/* <Chat /> */}
      </body>
    </html>
  );
}
