import Decimal from "decimal.js";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";


export interface TradeSummary {
    buyPrice: string;
    sellPrice: string;

    buyFee: string;
    sellFee: string;
    taxFee: string;
    totalBuyPrice: string;
    sellProfitAfterFees: string;
    netProfit: string;

    totalLotAmount: number;
}


export function getTradeSummary(params: {
    iBuyPrice: string;
    iSellPrice: string;
    lotAmount: number;
    lotCategory: LotCategoryEnum;
    tradeType: TradeTypeEnum;
    feeDiscountRate: number;
}): TradeSummary {
    const { iBuyPrice, iSellPrice, lotAmount, lotCategory, tradeType, feeDiscountRate } = params;

    const buyPrice = new Decimal(iBuyPrice);
    const sellPrice = new Decimal(iSellPrice);

    const totalLotAmount = lotCategory === LotCategoryEnum.Round ? lotAmount * 1000 : lotAmount;
    const feeRate = new Decimal(feeDiscountRate).mul(0.001425);
    const transactionTaxRate = tradeType === TradeTypeEnum.Spot ? 0.003 : 0.0015;

    const totalBuy = buyPrice.mul(totalLotAmount);
    const totalSell = sellPrice.mul(totalLotAmount);

    const buyFee = totalBuy.mul(feeRate).floor();
    const sellFee = totalSell.mul(feeRate).floor();
    const taxFee = totalSell.mul(transactionTaxRate).floor();

    const totalBuyPrice = totalBuy.add(buyFee).floor();
    const sellProfitAfterFees = totalSell.sub(sellFee).sub(taxFee).floor();
    const netProfit = sellProfitAfterFees.sub(totalBuyPrice);

    return {
        buyPrice: iBuyPrice,
        sellPrice: iSellPrice,

        buyFee: buyFee.toString(),
        sellFee: sellFee.toString(),
        taxFee: taxFee.toString(),
        totalBuyPrice: totalBuyPrice.toString(),
        sellProfitAfterFees: sellProfitAfterFees.toString(),
        netProfit: netProfit.toString(),

        totalLotAmount: totalLotAmount,
    };
}
