import { useContext } from "react";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";
import ToggleSwitch from "../(components)/ToggleSwitch";

export default function Setting() {
    const setting = useContext(SettingContext);

    return <div className="relative mb-12 p-2 grid grid-cols-2 gap-4 border rounded bg-black bg-opacity-50 z-50">

        <div className="flex items-center">券商</div>
        <IconicSelect
            options={brokeragesIconicSelectOptions}
            defaultValue={setting.state.brokerage.id}
            onChange={(value) => {
                const updBrokerage = brokerageMap.get(value!.toString());
                setting.dispatch({ type: "SET_BROKERAGE", payload: updBrokerage })
            }}>
        </IconicSelect>

        <div className="flex items-center">買賣價同步</div>
        <ToggleSwitch value={setting.state.syncSellPrice}
            onChange={(value) => {
                console.log(value)
                setting.dispatch({ type: "SET_SYNC_SELL_PRICE", payload: value })
            }}></ToggleSwitch>


    </div>;
}