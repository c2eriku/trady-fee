import type { Metadata } from "next";
import { Geist, Geist_Mono, Monoton, Zen_Antique_Soft } from "next/font/google";
import "./globals.css";
import SettingProvider from "./(states)/SettingState";
import { GoogleAnalytics } from "@next/third-parties/google";
import { FooterWrapper } from "./(containers)/FooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monoton = Monoton({
  weight: "400",
  variable: "--font-monoton",
  subsets: ["latin"],
});

const zenAntiqueSoft = Zen_Antique_Soft({
  weight: "400",
  variable: "--font-zen-antique-soft",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradyFee - 台灣股市交易費用計算機",
  description: "台灣股市交易費用計算機, Taiwan stock trading fee calculator",
  // verification: {
  //   google: ""
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-svh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monoton.variable} ${zenAntiqueSoft.variable} 
        antialiased h-full flex flex-col`}>

        <main className="grow overflow-hidden">
          <SettingProvider>
            {children}
          </SettingProvider>
        </main>

        <footer className="shrink pb-2 text-background-50 text-xs">
          <FooterWrapper></FooterWrapper>
        </footer>

        <GoogleAnalytics gaId="G-SMPS08R910"></GoogleAnalytics>
      </body>
    </html>
  );
}
