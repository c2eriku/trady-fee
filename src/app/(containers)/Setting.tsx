import { useContext } from "react";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import ToggleSwitch from "../(components)/ToggleSwitch";

export default function Setting() {
    const setting = useContext(SettingContext);

    return <div className="relative mb-12 p-2 grid grid-cols-2 gap-4 border rounded w-full bg-black bg-opacity-50 z-50">

        <div className="flex items-center">券商</div>
        <IconicSelect
            options={brokeragesIconicSelectOptions}
            defaultValue={setting.state.brokerage.id}
            onChange={(value) => {
                const updBrokerage = brokerageMap.get(value!.toString());
                setting.dispatch({ type: "SET_BROKERAGE", payload: updBrokerage })
            }}>
        </IconicSelect>

        <div className="flex items-center">賣價同步</div>
        <ToggleSwitch value={setting.state.syncSellPrice}
            onChange={(value) => {
                console.log(value)
                setting.dispatch({ type: "SET_SYNC_SELL_PRICE", payload: value })
            }}></ToggleSwitch>

        <div className="col-span-2 flex justify-end gap-2">
            <button
                onClick={() => { localStorage.removeItem('preference'); }}
                className="rounded bg-transparent text-sm underline">刪除偏好設定</button>
            <button
                onClick={() => { setting.setLocalstorage(setting.state) }}
                className="rounded bg-transparent text-sm underline">儲存偏好設定並在下次使用</button>
        </div>


    </div>;
}