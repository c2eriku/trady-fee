import { Dispatch, SetStateAction, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import { ChevronDoubleUpIcon, Cog6ToothIcon } from "@heroicons/react/16/solid";
import ToggleSwitch from "../(components)/ToggleSwitch";
import Overlay from "../(components)/Overlay";

interface SettingContainerProps {
    isSettingContainerOpen: boolean;
    setIsSettingContainerOpen: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

export default function SettingContainer({ isSettingContainerOpen, setIsSettingContainerOpen, className = '' }: SettingContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const setting = useContext(SettingContext);


    function handleSettingClick() {
        setIsSettingContainerOpen((prev) => !prev);
    }

    return (
        <div className="fixed top-4 right-4 flex flex-col items-end z-50">

            <div className="ml-auto">
                <button
                    onClick={handleSettingClick}
                    className="outline outline-2 p-1 bg-primary-400 rounded z-50" >
                    <Cog6ToothIcon className={`size-7 transition-transform ${isSettingContainerOpen ? 'rotate-[-150deg]' : 'rotate-0'}`} />
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

                                <div className="p-2 h-full border border-primary rounded-2xl bg-black">
                                    <div className="bg-background rounded-xl p-2 shadow-md">
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
                                </div>
                            </motion.div>

                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
