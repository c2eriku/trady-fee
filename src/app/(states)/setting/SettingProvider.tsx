'use client';
import { createContext, useReducer } from "react";
import settingReducer, { initialSettingState, SettingState } from "./settingReducer";



export const SettingContext = createContext<{
  state: SettingState;
  dispatch: React.Dispatch<any>;
}>({
  state: {} as SettingState,
  dispatch: () => { throw new Error("dispatch is not initialized"); },
});



export default function SettingProvider({ children }: any) {
  const [state, dispatch] = useReducer(settingReducer, initialSettingState);

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
}

