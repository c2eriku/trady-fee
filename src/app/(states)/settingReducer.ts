import { Brokerage } from "../(interfaces)/brokerage";
import { brokerageMap } from "../(models)/brokeragesList";

export interface SettingState {
  brokerage: Brokerage;
  feeDiscountRate: number;
  syncSellPrice: boolean;
}

export const initialSettingState: SettingState = (function () {
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
    brokerage: brokerageMap.get("general")!,
    feeDiscountRate: brokerageMap.get("general")!.feeDiscountRate,
    syncSellPrice: true,
  };
})();

export default function settingReducer(
  state: SettingState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case "SET_BROKERAGE":
      return {
        ...state,
        brokerage: action.payload,
        feeDiscountRate: (action.payload as Brokerage).feeDiscountRate,
      };
    case "SET_FEE_DISCOUNT_RATE":
      return { ...state, feeDiscountRate: action.payload };
    case "SET_SYNC_SELL_PRICE":
      return { ...state, syncSellPrice: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
