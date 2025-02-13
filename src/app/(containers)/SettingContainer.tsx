import { Dispatch, SetStateAction, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import { ChevronDoubleUpIcon } from "@heroicons/react/16/solid";
import ToggleSwitch from "../(components)/ToggleSwitch";
import Overlay from "../(components)/Overlay";

interface SettingContainerProps {
    isSettingContainerOpen: boolean;
    setIsSettingContainerOpen: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

// 定義動畫變化
const variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: "-100%", opacity: 0 }
};

export default function SettingContainer({ isSettingContainerOpen, setIsSettingContainerOpen, className = '' }: SettingContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const setting = useContext(SettingContext);

    return (
        <>
            <AnimatePresence>
                {isSettingContainerOpen && (
                    <>
                        <Overlay onClose={() => setIsSettingContainerOpen(false)}></Overlay>
                        
                        <motion.div
                            ref={containerRef}
                            className={`${className} 
                        fixed w-full px-1 bg-black rounded-lg overflow-hidden bg-clip-content z-30`}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={variants}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="px-4 pt-6 pb-2 border border-primary-400 border-t-0">
                                <h2 className="mb-4 text-center font-bold text-xl">偏好設定</h2>
                                <div className="grid grid-cols-2 gap-y-2">
                                    <label className="flex items-center">券商</label>
                                    <IconicSelect
                                        options={brokeragesIconicSelectOptions}
                                        defaultValue={setting.state.brokerage.id}
                                        onChange={(value) => {
                                            const updBrokerage = brokerageMap.get(value!.toString());
                                            setting.dispatch({ type: "SET_BROKERAGE", payload: updBrokerage });
                                        }}
                                    />

                                    <label className="flex items-center">手續費折數</label>
                                    <input
                                        type="number" inputMode="decimal"
                                        value={setting.state.feeDiscountRate}
                                        onChange={(event) => {
                                            const updValue = event.target.value;
                                            setting.dispatch({ type: "SET_FEE_DISCOUNT_RATE", payload: Number(updValue) });
                                        }}
                                        disabled={setting.state.brokerage.id !== 'general'}
                                        className="min-h-8 py-1 rounded disabled:text-foreground disabled:p-0 disabled:bg-black"
                                    />

                                    <label className="flex items-center">賣價同步買價</label>
                                    <ToggleSwitch
                                        value={setting.state.syncSellPrice}
                                        onChange={(value) => {
                                            setting.dispatch({ type: "SET_SYNC_SELL_PRICE", payload: value });
                                        }}
                                    />

                                    <div className="col-span-2 pt-4 flex justify-end gap-2">
                                        <button
                                            onClick={() => localStorage.removeItem("preference")}
                                            className="rounded bg-transparent text-sm underline">
                                            刪除偏好設定
                                        </button>
                                        <button
                                            onClick={() => setting.setLocalstorage(setting.state)}
                                            className="rounded bg-transparent text-sm underline">
                                            儲存偏好設定在下次使用
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setIsSettingContainerOpen((prev) => !prev)} className="flex justify-center items-center w-full h-4 rounded-b-lg">
                                <ChevronDoubleUpIcon className="size-4"></ChevronDoubleUpIcon>
                            </button>
                        </motion.div>

                    </>
                )}
            </AnimatePresence>
        </>
    );
}
