"use client";
import { createContext, useEffect, useReducer } from "react";
import { Brokerage } from "../(interfaces)/brokerage";
import { brokerageMap, brokeragesIconicSelectOptions } from "../(models)/brokeragesList";


export interface SettingState {
  brokerage: Brokerage;
  syncSellPrice: boolean;
}

export const initialState: SettingState = {
  brokerage: brokerageMap.get('fubon')!,
  syncSellPrice: true,
};

// 取得 localStorage 中的初始設定值
function getInitialState(): SettingState {
  console.log(window)
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("preference");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Failed to parse localStorage:", error);
      }
    }
  }
  return {
    brokerage: brokerageMap.get("fubon")!,
    syncSellPrice: true,
  };
}





export const SettingContext = createContext<{
  state: SettingState;
  dispatch: React.Dispatch<any>;
  setLocalstorage: (newValue: SettingState) => void
}>({ state: initialState, dispatch: () => null, setLocalstorage: () => { } });


function settingReducer(
  state: SettingState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case "SET_BROKERAGE":
      return { ...state, brokerage: action.payload };
    case "SET_SYNC_SELL_PRICE":
      return { ...state, syncSellPrice: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function SettingProvider({ children }: any) {

  const [state, dispatch] = useReducer(settingReducer, getInitialState());

  function setLocalstorage(newValue: SettingState) {
    if (typeof window !== "undefined") {
      localStorage.setItem('preference', JSON.stringify(newValue));
    }
  };



  return (
    <SettingContext.Provider value={{ state, dispatch, setLocalstorage }}>
      {children}
    </SettingContext.Provider>
  );
}