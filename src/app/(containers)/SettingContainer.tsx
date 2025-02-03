import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import ToggleSwitch from "../(components)/ToggleSwitch";

interface SettingContainerProps {
    isSettingContainerOpen: boolean,
    setIsSettingContainerOpen: Dispatch<SetStateAction<boolean>>
}

export default function SettingContainer({ isSettingContainerOpen, setIsSettingContainerOpen }: SettingContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const setting = useContext(SettingContext);

    useEffect(() => {
        if (!isSettingContainerOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsSettingContainerOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isSettingContainerOpen, setIsSettingContainerOpen]);

    return (<>
        <div className="fixed w-screen h-screen bg-black opacity-50"></div>

        <div ref={containerRef} className="relative rounded-b-lg overflow-hidden" >
            <div className="px-4 pt-6 pb-2">
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
                        value={setting.state.brokerage.feeDiscountRate}
                        disabled
                        className="py-1 rounded text-foreground disabled:p-0 disabled:bg-black"
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
                            儲存偏好設定並在下次使用
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setIsSettingContainerOpen((prev) => !prev)}
                className="w-full">＝</button>
        </div>
    </>);
}
