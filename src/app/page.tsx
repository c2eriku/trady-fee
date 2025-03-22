'use client';
import Calculator from "./(containers)/Calculator";
import SettingPanel from "./(containers)/SettingPanel";
import { useState } from "react";
import LogoIcon from "./(components)/LogoIcon";

export default function Home() {
  const [isSettingContainerOpen, setIsSettingContainerOpen] = useState(false);

  return (
    <div className="">

      {/* 偏好設定面板 */}
      <SettingPanel
        isSettingContainerOpen={isSettingContainerOpen}
        setIsSettingContainerOpen={setIsSettingContainerOpen}
      />

      <div className="h-[100dvh] min-h-[100svh] w-screen bg-background
        flex flex-col justify-center items-center gap-2 px-4 transition-all
        sm:w-2/5 sm:m-auto md:w-3/5">
        {/* 標題 */}
        <div className="flex w-full">
          <h1 className="w-2/5 text-left">
            <LogoIcon></LogoIcon>
          </h1>
        </div>
        {/* 計算器 */}
        <div className="w-full pb-12">
          <Calculator />
        </div>
      </div>
    </div>
  );
}
