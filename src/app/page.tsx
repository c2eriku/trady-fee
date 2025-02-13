'use client';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Calculator from "./(containers)/Calculator";
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
        <Cog6ToothIcon className={`size-8 transition-transform ${isSettingContainerOpen ? 'rotate-[-150deg]' : 'rotate-0'}`} />
      </button >

      {/* 偏好設定面板 */}
      <SettingContainer
        isSettingContainerOpen={isSettingContainerOpen}
        setIsSettingContainerOpen={setIsSettingContainerOpen}
        className="fixed"
      />

      <div className="h-[100dvh] min-h-[100svh] w-screen bg-background
        flex flex-col justify-center items-center gap-2 px-1 py-4 transition-all
        sm:w-2/5 sm:m-auto ">
        {/* 標題 */}
        <h1>
          <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <g transform="translate(0, 80)">
              <text fontFamily="Monoton" fontSize="45" fill="white">
                <tspan>Tradi</tspan>
              </text>
            </g>

            <g transform="translate(180, 80)">
              <text fontFamily="Monoton" fontSize="45" fill="white">
                <tspan>Fee</tspan>
              </text>
            </g>

            <g transform="translate(0, 100)">
              <text fontFamily="Zen Antique Soft" fontSize="20" fill="white">
                <tspan>台灣股市交易費用計算機</tspan>
              </text>
            </g>
          </svg>


        </h1>
        {/* 計算器 */}
        <div className="w-full px-4 pb-12">
          <Calculator />
        </div>
      </div>
    </div>
  );
}
