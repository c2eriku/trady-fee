'use client';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Calculator from "./(containers)/Calculator";
import SettingContainer from "./(containers)/SettingContainer";
import { useState } from "react";
import LogoIcon from "./(components)/LogoIcon";

export default function Home() {
  const [isSettingContainerOpen, setIsSettingContainerOpen] = useState(false);

  return (
    <div className="">
      {/* 設定按鈕 */}

      {/* 偏好設定面板 */}
      <SettingContainer
        isSettingContainerOpen={isSettingContainerOpen}
        setIsSettingContainerOpen={setIsSettingContainerOpen}
      />

      <div className="h-[100dvh] min-h-[100svh] w-screen bg-background
        flex flex-col justify-center items-center gap-2 px-4 transition-all
        sm:w-2/5 sm:m-auto ">
        {/* 標題 */}
        <div className="flex w-full">
          <h1 className="w-48 text-left">
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
