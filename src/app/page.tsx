'use client';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Caculator from "./(containers)/Caculator";
import SettingProvider from "./(states)/SettingState";
import SettingContainer from "./(containers)/SettingContainer";
import { useState } from "react";

export default function Home() {
  const [isSettingContainerOpen, setIsSettingContainerOpen] = useState(false);

  function handleSettingClick() {
    setIsSettingContainerOpen((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="">
      {/* 設定按鈕 */}
      <button
        onClick={handleSettingClick}
        className="fixed bottom-4 right-4 outline p-2 bg-[#6299d5] rounded-full z-50 shadow-md" >
        <Cog6ToothIcon className={`size-8 transition-transform ${isSettingContainerOpen ? 'rotate-[150deg]' : 'rotate-0'}`} />
      </button >

      {/* 偏好設定面板 */}
      <SettingContainer
        isSettingContainerOpen={isSettingContainerOpen}
        setIsSettingContainerOpen={setIsSettingContainerOpen}
        className="fixed"
      />

      <div className="h-[100dvh] min-h-[100svh] min-w-screen bg-background
        sm:w-2/5 sm:m-auto h-screen flex gap-2 items-center min-h-screen px-1 py-4 transition-all">
        {/* 計算器 */}
        <div className="w-full px-4 pb-12">
          <Caculator />
        </div>
      </div>
    </div>
  );
}
