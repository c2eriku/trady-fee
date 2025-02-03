'use client';
import { createContext, useReducer } from "react";
import { Brokerage } from "../(interfaces)/brokerage";
import { brokerageMap } from "../(models)/brokeragesList";


export interface SettingState {
  brokerage: Brokerage;
  feeDiscountRate: number;
  syncSellPrice: boolean;
}

export const defaultState: SettingState = {
  brokerage: brokerageMap.get('general')!,
  feeDiscountRate: brokerageMap.get('general')!.feeDiscountRate,
  syncSellPrice: true,
};

// 取得 localStorage 中的初始設定值
function getInitialState(): SettingState {
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
  return defaultState;
}





export const SettingContext = createContext<{
  state: SettingState;
  dispatch: React.Dispatch<any>;
  setLocalstorage: (newValue: SettingState) => void
}>({ state: defaultState, dispatch: () => null, setLocalstorage: () => { } });


function settingReducer(
  state: SettingState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case "SET_BROKERAGE":
      return {
        ...state,
        brokerage: action.payload,
        feeDiscountRate: (action.payload as Brokerage).feeDiscountRate
      };
    case "SET_FEE_DISCOUNT_RATE":
      return { ...state, feeDiscountRate: action.payload };
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