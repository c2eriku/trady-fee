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
    <SettingProvider>
      {/* 設定按鈕 */}
      <button
        onClick={handleSettingClick}
        className="fixed bottom-4 right-4 outline p-2 bg-[#6299d5] rounded-full z-50 shadow-md">
        <Cog6ToothIcon className={`size-8 transition-transform ${isSettingContainerOpen ? 'rotate-[150deg]' : 'rotate-0'}`} />
      </button>

      {/* 偏好設定面板 */}
      <div className={`fixed top-0 w-full z-40
          transform transition-all duration-800 ease-in-out
          ${isSettingContainerOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 invisible"}`}>
        <SettingContainer
          isSettingContainerOpen={isSettingContainerOpen}
          setIsSettingContainerOpen={setIsSettingContainerOpen}
          className="mx-1 border border-primary-400 border-t-0 rounded-b-lg bg-black"
        />
      </div>

      <div className="h-screen flex flex-col gap-2 items-center min-h-screen px-4 py-2 pt-10 transition-all">
        {/* 計算器 */}
        <div className="w-full transition-all">
          <Caculator />
        </div>
      </div>
    </SettingProvider>
  );
}
