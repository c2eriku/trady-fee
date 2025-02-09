import React, { useContext, useState } from "react";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { CaculatorState } from "../(interfaces)/CalculatorState";
import DetailDialog from "./DetailDialog";
import { TradeDirectionEnum } from "../(enums)/TradingActionEnum";
import { SettingContext } from "../(states)/SettingState";
import Decimal from "decimal.js";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, motion } from "framer-motion";
import AcctSpan from "../(components)/AcctSpan";

export default function Result({ buyPrice: iBuyPrice, sellPrice: iSellPrice, tradeType, lotAmount, lotCategory }: CaculatorState) {
    const setting = useContext(SettingContext);

    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState<TradeDirectionEnum>(TradeDirectionEnum.Buy);

    const buyPrice: number = Number(iBuyPrice);
    const sellPrice: number = Number(iSellPrice);

    const feeRate = new Decimal(setting.state.feeDiscountRate).mul(0.001425).toNumber();
    const transactionTax = tradeType === TradeTypeEnum.Spot ? 0.003 : 0.0015;
    lotAmount = lotCategory === LotCategoryEnum.Round ? lotAmount * 1000 : lotAmount;

    const taxFee = new Decimal(sellPrice).mul(lotAmount).mul(transactionTax).floor().toNumber();

    const totalBuyPrice = new Decimal(buyPrice).mul(lotAmount).add(brokerageFee(buyPrice)).floor().toNumber();
    const sellProfitAfterFees = new Decimal(sellPrice).mul(lotAmount).sub(brokerageFee(sellPrice)).sub(taxFee).floor().toNumber();
    const netProfit = sellProfitAfterFees - totalBuyPrice;

    function brokerageFee(price: number | string) {
        return new Decimal(price).mul(lotAmount).mul(feeRate).floor().toNumber();
    }

    function showDialog(direction: TradeDirectionEnum) {
        setDirection(direction);
        setIsOpen(true);
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
                        <button onClick={() => showDialog(TradeDirectionEnum.Buy)}
                            className="p-px border border-primary rounded flex bg-transparent text-primary">
                            <InformationCircleIcon className='inline-block size-8'></InformationCircleIcon>
                        </button>
                    </div>

                    <span>賣出收入</span>
                    <div className="flex items-center justify-end">
                        <AcctSpan className="mr-2 text-right">{sellProfitAfterFees}</AcctSpan>
                        <button onClick={() => showDialog(TradeDirectionEnum.Sell)}
                            className="p-px border border-primary rounded flex bg-transparent text-primary">
                            <InformationCircleIcon className='inline-block size-8'></InformationCircleIcon>
                        </button>
                    </div>
                </div>

                <div className="px-2 grid grid-cols-2 grid-cols-[40%_60%] mt-1 p-1 bg-primary-600 bg-opacity-20 rounded
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
                lotAmount={lotAmount}
                brokerageFee={brokerageFee(direction === TradeDirectionEnum.Buy ? buyPrice : sellPrice)}
                taxFee={taxFee} />
        </>
    );
}
