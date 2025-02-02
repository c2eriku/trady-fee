import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";

export interface CaculatorState {
    buyPrice: string;
    sellPrice: string;
    tradeType: TradeTypeEnum;
    lotAmount: number;
    lotCategory: LotCategoryEnum;
}
