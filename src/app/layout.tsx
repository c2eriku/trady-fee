import type { Metadata } from "next";
import { Geist, Geist_Mono, Monoton, Zen_Antique_Soft } from "next/font/google";
import "./globals.css";
import SettingProvider from "./(states)/setting/SettingProvider";
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
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  title: "台灣股市交易費用計算機 | TradyFee",
  description: "TradyFee股票交易費用計算工具，支援手續費、證交稅、當沖交易等費用試算，並可根據不同券商折扣自訂費率。只需輸入交易金額，即可即時試算每筆買賣成本，幫助投資人快速了解淨損益與交易門檻，適用現股與當沖族群。",
  applicationName: "TradyFee",
  keywords: [
    "TradyFee",
    "台股手續費計算",
    "股票交易費用計算",
    "股票手續費試算",
    "台灣股票計算機",
    "當沖交易計算",
    "股票當沖費用",
    "股市交易成本計算",
    "台灣股市投資工具"
  ],
  verification: {
    google: "h03B2BLFzKpOlppGAcITD8vC213Jz540EtFnHEVdU5E",
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
        <GoogleAnalytics gaId="G-7HCHMTZNX1"></GoogleAnalytics>
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
