import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";

export interface CaculatorState {
    buyPrice: number;
    sellPrice: number;
    tradeType: TradeTypeEnum;
    lotAmount: number;
    lotCategory: LotCategoryEnum;
}
