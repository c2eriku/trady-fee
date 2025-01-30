import { useContext } from "react";
import { IconicSelect } from "../(components)/IconicSelect";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";
import { SettingContext } from "../(states)/SettingState";

export default function Setting() {
    const setting = useContext(SettingContext);

    return <div className="relative mb-12 p-2 grid grid-cols-2 gap-4 border rounded bg-black bg-opacity-50 z-50">

        {/* <div className="col-span-2">{JSON.stringify(setting)}</div> */}


        <div className="flex items-center">券商</div>
        <IconicSelect
            options={brokeragesIconicSelectOptions}
            defaultValue={setting.state.brokerage.id}
            onChange={(value) => {
                const updBrokerage = brokerageMap.get(value!.toString());
                setting.dispatch({ type: "SET_BROKERAGE", payload: updBrokerage })
            }}>
        </IconicSelect>

    </div>;
}