import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconicSelect } from "../(components)/IconicSelect";
import {
  brokerageMap,
  brokeragesIconicSelectOptions,
} from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import ToggleSwitch from "../(components)/ToggleSwitch";

interface SettingContainerProps {
  isSettingContainerOpen: boolean;
  setIsSettingContainerOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function SettingPanel({
  isSettingContainerOpen,
  setIsSettingContainerOpen,
}: SettingContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setting = useContext(SettingContext);

  function handleSettingClick() {
    setIsSettingContainerOpen((prev) => !prev);
  }

  return (
    <div className="fixed top-3 right-2 flex flex-col items-end z-50">
      <div className="ml-auto">
        <button
          onClick={handleSettingClick}
          className="p-1 bg-primary-400 rounded-2xl z-50"
        >
          <Cog6ToothIcon
            className={`size-8 transition-transform ${
              isSettingContainerOpen ? "rotate-[-150deg]" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <div className="">
        <AnimatePresence>
          {isSettingContainerOpen && (
            <>
              {/* <Overlay onClose={() => setIsSettingContainerOpen(false)}></Overlay> */}
              <motion.div
                ref={containerRef}
                className={`w-80 h-fit rounded-lg z-30`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {/* <button onClick={() => setIsSettingContainerOpen((prev) => !prev)} className="flex justify-center items-center w-full h-4 rounded-t-lg">
                                <ChevronDoubleUpIcon className="size-4"></ChevronDoubleUpIcon>
                            </button> */}

                <div className="p-2 h-full rounded-2xl bg-background-600 shadow shadow-background-50">
                  <div className="bg-background rounded-xl p-2 shadow-md">
                    <h2 className="mb-4 text-center font-bold text-xl">
                      偏好設定
                    </h2>
                    <div className="grid grid-cols-[40%_60%] gap-y-3">
                      <label className="flex items-center">券商</label>
                      <IconicSelect
                        options={brokeragesIconicSelectOptions}
                        defaultValue={setting.state.brokerage.id}
                        onChange={(value) => {
                          const updBrokerage = brokerageMap.get(
                            value!.toString()
                          );
                          setting.dispatch({
                            type: "SET_BROKERAGE",
                            payload: updBrokerage,
                          });
                        }}
                      />

                      <label className="flex items-center">手續費折數</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={setting.state.feeDiscountRate}
                        onChange={(event) => {
                          const updValue = event.target.value;
                          setting.dispatch({
                            type: "SET_FEE_DISCOUNT_RATE",
                            payload: Number(updValue),
                          });
                        }}
                        disabled={setting.state.brokerage.id !== "general"}
                        className="min-h-8 py-1 rounded disabled:text-foreground disabled:bg-black"
                      />

                      <label className="flex items-center">賣價同步買價</label>
                      <ToggleSwitch
                        value={setting.state.syncSellPrice}
                        onChange={(value) => {
                          setting.dispatch({
                            type: "SET_SYNC_SELL_PRICE",
                            payload: value,
                          });
                        }}
                      />

                      <label className="flex items-center">偏好設定</label>
                      <PreferencePanel></PreferencePanel>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LoadingSVG() {
  return (
    <svg
      className="size-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

function PreferenceButton({
  className,
  onClick,
  show,
  setShow,
  text,
}: {
  className?: string;
  onClick: () => void;
  show: boolean;
  setShow: (show: boolean) => void;
  text: string;
}) {
  function click() {
    setShow(true);
    setTimeout(() => {
      onClick();
      setShow(false);
    }, 500);
  }

  return (
    <button
      onClick={click}
      className={`flex items-center no-wrap rounded p-1 ${className}`}
    >
      {show && (
        <span className="px-1">
          <LoadingSVG></LoadingSVG>
        </span>
      )}
      {text}
    </button>
  );
}

function PreferencePanel() {
  const [showSave, setShowSave] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const setting = useContext(SettingContext);

  function delayHideResult() {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
    }, 3000);
  }

  return (
    <div className="flex gap-2">
      <PreferenceButton
        className="bg-emerald-800"
        onClick={() => {
          setting.setLocalstorage(setting.state);
          delayHideResult();
        }}
        show={showSave}
        setShow={setShowSave}
        text="儲存"
      ></PreferenceButton>
      <PreferenceButton
        className="bg-rose-800"
        onClick={() => {
          localStorage.removeItem("preference");
          delayHideResult();
        }}
        show={showDelete}
        setShow={setShowDelete}
        text="刪除"
      ></PreferenceButton>

      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-end text-sm"
        >
          ☑️操作成功
        </motion.div>
      )}
    </div>
  );
}
