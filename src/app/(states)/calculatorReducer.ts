import { SettingState } from "./settingReducer";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";

export interface CaculatorState {
  buyPrice: string;
  sellPrice: string;
  tradeType: TradeTypeEnum;
  lotAmount: number;
  lotCategory: LotCategoryEnum;
}

export const initCalculatorState: CaculatorState = {
  buyPrice: "0",
  sellPrice: "0",
  tradeType: TradeTypeEnum.Spot,
  lotAmount: 1,
  lotCategory: LotCategoryEnum.Round,
};

export function calculatorReducer(
  state: CaculatorState,
  action: {
    type: any;
    payload: any;
    settingState?: SettingState;
  }
) {
  switch (action.type) {
    case "SET_BUY_PRICE":
      if (action.settingState?.syncSellPrice) {
        return {
          ...state,
          buyPrice: action.payload,
          sellPrice: action.payload,
        };
      }
      return { ...state, buyPrice: action.payload };
    case "SET_SELL_PRICE":
      return { ...state, sellPrice: action.payload };
    case "SET_TRADE_TYPE":
      return { ...state, tradeType: action.payload };
    case "SET_LOT_AMOUNT":
      return { ...state, lotAmount: action.payload };
    case "SET_LOT_CATEGORY":
      return { ...state, lotCategory: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
