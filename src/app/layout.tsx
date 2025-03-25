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
  description: "TradyFee 快速計算台股手續費與證交稅，包含手續費、證交稅與折扣計算，簡單輸入金額，即時獲得計算結果。",
  applicationName: "TradyFee",
  keywords: [
    "台股手續費計算",
    "股票交易費用計算",
    "當沖試算",
    "當沖手續費試算",
  ],
  verification: {
    google: "LsS-FX9EimuTmHnP6RB_tJM1N3HoiMVQ-dL7Vhr_5ZE"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-svh">
      <head>
        <GoogleAnalytics gaId="G-SMPS08R910"></GoogleAnalytics>
      </head>

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
      </body>
    </html>
  );
}
