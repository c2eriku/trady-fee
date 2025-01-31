"use client";
import { createContext, useReducer } from "react";
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


export const SettingContext = createContext<{
  state: SettingState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });


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
  const [state, dispatch] = useReducer(settingReducer, initialState);

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
}