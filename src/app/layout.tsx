import type { Metadata } from "next";
import { Geist, Geist_Mono, Monoton, Zen_Antique_Soft } from "next/font/google";
import "./globals.css";
import SettingProvider from "./(states)/SettingState";

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
  title: "Tradi-Fee - stock trading fee calculator",
  description: "Taiwan stock trading fee calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} 
      ${monoton.variable} ${zenAntiqueSoft.variable} antialiased`}>
        <SettingProvider>
          <div>
            {children}
          </div>
        </SettingProvider>
      </body>
    </html>
  );
}
