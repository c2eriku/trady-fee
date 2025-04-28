import { LotCategoryEnum } from "@/app/(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "@/app/(enums)/TradeTypeEnum";

export interface CaculatorState {
  buyPrice: string;
  sellPrice: string;
  tradeType: TradeTypeEnum;
  lotAmount: number;
  lotCategory: LotCategoryEnum;
}