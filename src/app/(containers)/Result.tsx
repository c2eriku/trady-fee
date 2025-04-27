import React, { useContext, useState } from "react";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { CaculatorState } from "../(interfaces)/CalculatorState";
import DetailDialog from "./DetailDialog";
import { TradeDirectionEnum } from "../(enums)/TradingActionEnum";
import { SettingContext } from "../(states)/SettingProvider";
import Decimal from "decimal.js";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import AcctSpan from "../(components)/AcctSpan";

export default function Result({ buyPrice: iBuyPrice, sellPrice: iSellPrice, tradeType, lotAmount, lotCategory }: CaculatorState) {
    const setting = useContext(SettingContext);
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState<TradeDirectionEnum>(TradeDirectionEnum.Buy);

    // price
    const buyPrice: number = Number(iBuyPrice);
    const sellPrice: number = Number(iSellPrice);
    // rate and amount
    const feeRate = new Decimal(setting.state.feeDiscountRate).mul(0.001425).toNumber();
    const transactionTax = tradeType === TradeTypeEnum.Spot ? 0.003 : 0.0015;
    const totalLotAmount = lotCategory === LotCategoryEnum.Round ? lotAmount * 1000 : lotAmount;
    // fee
    const buyFee = new Decimal(buyPrice).mul(totalLotAmount).mul(feeRate).floor().toNumber();
    const sellFee = new Decimal(sellPrice).mul(totalLotAmount).mul(feeRate).floor().toNumber();
    const taxFee = new Decimal(sellPrice).mul(totalLotAmount).mul(transactionTax).floor().toNumber();
    // total result
    const totalBuyPrice = new Decimal(buyPrice).mul(totalLotAmount).add(buyFee).floor().toNumber();
    const sellProfitAfterFees = new Decimal(sellPrice).mul(totalLotAmount).sub(sellFee).sub(taxFee).floor().toNumber();
    const netProfit = sellProfitAfterFees - totalBuyPrice;


    function showDialog(direction: TradeDirectionEnum) {
        setDirection(direction);
        setIsOpen(true);
    }

    const InfoButton = ({ onClick }: { onClick: () => void }) => {
        return (
            <button onClick={onClick}
                className="flex items-center p-1 border border-primary rounded bg-transparent text-primary-400 cursor-pointer">
                <InformationCircleIcon className="size-6 mr-px" />
                <span className="px-p">更多訊息</span>
            </button>
        );
    }

    return (
        <>
            <section className="flex flex-col gap-1 w-full border rounded p-2
                md:flex-row">
                <div className="w-full px-2 grid grid-cols-2 grid-cols-[40%_60%] gap-1 items-center
                md:w-1/2">
                    <span>買進成本</span>
                    <div className="flex items-center justify-end">
                        <AcctSpan className="mr-2 text-right">{totalBuyPrice}</AcctSpan>
                        <InfoButton onClick={() => showDialog(TradeDirectionEnum.Buy)} />
                    </div>

                    <span>賣出收入</span>
                    <div className="flex items-center justify-end">
                        <AcctSpan className="mr-2 text-right">{sellProfitAfterFees}</AcctSpan>
                        <InfoButton onClick={() => showDialog(TradeDirectionEnum.Sell)} />
                    </div>
                </div>

                <div className="px-2 grid grid-cols-2 grid-cols-[40%_60%] mt-1 p-1 bg-primary-700 bg-opacity-20 rounded
                 md:w-1/2 md:grid-cols-1">
                    <span>淨利／損</span>
                    <AcctSpan className="text-right">{netProfit}</AcctSpan>
                    <span></span>
                </div>
            </section >


            <DetailDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                direction={direction}
                buyPrice={buyPrice}
                sellPrice={sellPrice}
                totalLotAmount={totalLotAmount}
                finalResult={direction === TradeDirectionEnum.Buy ? totalBuyPrice : sellProfitAfterFees}
                brokerageFee={direction === TradeDirectionEnum.Buy ? buyFee : sellFee}
                taxFee={taxFee} />
        </>
    );
}
