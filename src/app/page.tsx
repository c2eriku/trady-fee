'use client';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Caculator from "./(containers)/Caculator";
import SettingProvider from "./(states)/SettingState";
import Setting from "./(containers)/Setting";
import { useState } from "react";

export default function Home() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <SettingProvider>
      {/* 設定按鈕 */}
      <button
        onClick={() => setIsSettingOpen(!isSettingOpen)}
        className="fixed top-2 right-2 text-white font-bold p-1 rounded-xl hover:bg-primary-dark active:bg-primary-dark">
        <Cog6ToothIcon className="h-6 w-6 transition-all active:rotate-180" />
      </button>

      <div className="h-screen flex flex-col items-center min-h-screen py-2 pt-20 transition-all">

        <div className={`${isSettingOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"} 
          m-2 transition-all duration-700`}>
          <Setting />
        </div>

        {/* 計算器 */}
        <div className="w-full transition-all">
          <Caculator />
        </div>
      </div>
    </SettingProvider>
  );
}
