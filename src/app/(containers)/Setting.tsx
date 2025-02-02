import { useContext } from "react";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import ToggleSwitch from "../(components)/ToggleSwitch";

export default function Setting() {
    const setting = useContext(SettingContext);

    return <div className="relative">
        <div className="mb-4 text-center font-bold text-xl">偏好設定</div>
        <div className=" grid grid-cols-2 gap-y-2">

            <div className="flex items-center">券商</div>
            <IconicSelect
                options={brokeragesIconicSelectOptions}
                defaultValue={setting.state.brokerage.id}
                onChange={(value) => {
                    const updBrokerage = brokerageMap.get(value!.toString());
                    setting.dispatch({ type: "SET_BROKERAGE", payload: updBrokerage })
                }}>
            </IconicSelect>

            <div className="flex items-center">手續費折數</div>
            <input value={setting.state.brokerage.feeDiscountRate} disabled
                className="py-1 rounded text-foreground 
                disabled:p-0 disabled:bg-black"/>


            <div className="flex items-center">賣價同步買價</div>
            <ToggleSwitch value={setting.state.syncSellPrice}
                onChange={(value) => {
                    console.log(value)
                    setting.dispatch({ type: "SET_SYNC_SELL_PRICE", payload: value })
                }}></ToggleSwitch>

            <div className="col-span-2 pt-4 flex justify-end gap-2">
                <button
                    onClick={() => { localStorage.removeItem('preference'); }}
                    className="rounded bg-transparent text-sm underline">刪除偏好設定</button>
                <button
                    onClick={() => { setting.setLocalstorage(setting.state) }}
                    className="rounded bg-transparent text-sm underline">儲存偏好設定並在下次使用</button>
            </div>
        </div>
    </div>;
}