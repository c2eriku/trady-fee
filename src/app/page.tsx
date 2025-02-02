'use client';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Caculator from "./(containers)/Caculator";
import SettingProvider from "./(states)/SettingState";
import Setting from "./(containers)/Setting";
import { useState } from "react";

export default function Home() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  function handleSettingClick(){
    setIsSettingOpen(!isSettingOpen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <SettingProvider>
      {/* 設定按鈕 */}
      <button
        onClick={() => setIsSettingOpen(!isSettingOpen)}
        className="fixed bottom-4 right-4 text-white font-bold p-1 rounded-xl z-50
        hover:bg-primary-600 active:bg-primary-600">
        <Cog6ToothIcon className={`${isSettingOpen ? '-rotate-[210deg]' : 'rotate-0'} 
          size-8 transition-all`} />
      </button>

      <div className="h-screen flex flex-col gap-2 items-center min-h-screen px-4 py-2 pt-10 transition-all">

        {/* 控制面板 */}
        <div className={`${isSettingOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"} 
             w-full transform -translate-y-[2.5rem] transition-all duration-700`}>
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
