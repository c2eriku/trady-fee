import React, { useContext, useState } from "react";
import DetailDialog from "./DetailDialog";
import { TradeDirectionEnum } from "../(enums)/TradingActionEnum";
import { SettingContext } from "../(states)/setting/SettingProvider";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import AcctSpan from "../(components)/AcctSpan";
import { CaculatorState } from "../(states)/calculator/caculatorState";
import { getTradeSummary } from "../(utilities)/tradeSummary";

export default function Result({ buyPrice: iBuyPrice, sellPrice: iSellPrice, tradeType, lotAmount, lotCategory }: CaculatorState) {
    const setting = useContext(SettingContext);
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState<TradeDirectionEnum>(TradeDirectionEnum.Buy);

    const feeDiscountRate = setting.state.feeDiscountRate;
    const summary = getTradeSummary({ iBuyPrice, iSellPrice, tradeType, lotAmount, lotCategory, feeDiscountRate });

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
                        <AcctSpan className="mr-2 text-right">{summary.totalBuyPrice}</AcctSpan>
                        <InfoButton onClick={() => showDialog(TradeDirectionEnum.Buy)} />
                    </div>

                    <span>賣出收入</span>
                    <div className="flex items-center justify-end">
                        <AcctSpan className="mr-2 text-right">{summary.sellProfitAfterFees}</AcctSpan>
                        <InfoButton onClick={() => showDialog(TradeDirectionEnum.Sell)} />
                    </div>
                </div>

                <div className="px-2 grid grid-cols-2 grid-cols-[40%_60%] mt-1 p-1 bg-primary-700 bg-opacity-20 rounded
                 md:w-1/2 md:grid-cols-1">
                    <span>淨利／損</span>
                    <AcctSpan className="text-right">{summary.netProfit}</AcctSpan>
                    <span></span>
                </div>
            </section >


            <DetailDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                direction={direction}
                buyPrice={summary.buyPrice}
                sellPrice={summary.sellPrice}
                totalLotAmount={summary.totalLotAmount}
                finalResult={direction === TradeDirectionEnum.Buy ? summary.totalBuyPrice : summary.sellProfitAfterFees}
                brokerageFee={direction === TradeDirectionEnum.Buy ? summary.buyFee : summary.sellFee}
                taxFee={summary.taxFee} />
        </>
    );
}
