import { Brokerage } from "@/app/(interfaces)/brokerage";


export interface SettingState {
    brokerage: Brokerage;
    feeDiscountRate: number;
    syncSellPrice: boolean;
  }