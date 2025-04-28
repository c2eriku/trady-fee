import { TradeDirectionEnum } from "../(enums)/TradingActionEnum";
import AcctSpan from "../(components)/AcctSpan";
import { Dialog } from "../(components)/Dialog";


interface DetailDialogProps {
    isOpen: boolean,
    onClose: () => void,
    direction: TradeDirectionEnum,
    buyPrice: string,
    sellPrice: string,
    totalLotAmount: number,
    finalResult: string,
    brokerageFee: string,
    taxFee: string
}


export default function DetailDialog({
    isOpen,
    onClose,
    direction,
    buyPrice,
    sellPrice,
    totalLotAmount,
    finalResult,
    brokerageFee,
    taxFee }: DetailDialogProps) {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>

            <div className="flex justify-center mb-2">
                <h3>{direction === TradeDirectionEnum.Buy ? '買進' : '賣出'} 費用明細 </h3>
            </div>

            <div className="grid grid-cols-2">
                <DirectionDetail {...{ direction, buyPrice, sellPrice, totalLotAmount }} />

                <label className="mr-2">證券手續費</label>
                <AcctSpan
                    showColor={true}
                    className="text-right pr-4">
                    {brokerageFee}
                </AcctSpan>

                {direction === TradeDirectionEnum.Sell && (
                    <>
                        <label className="mr-2">證券交易稅</label>
                        <AcctSpan className="text-right pr-4">{taxFee}</AcctSpan>
                    </>
                )}
            </div>

            <div className="grid grid-cols-2 bottom-0">
                <label className="mr-2">=</label>
                <AcctSpan className="text-right pr-4">{finalResult}</AcctSpan>
            </div>

        </Dialog>
    )
}


function DirectionDetail({
    direction,
    buyPrice,
    sellPrice,
    totalLotAmount
}: {
    direction: TradeDirectionEnum,
    buyPrice: string,
    sellPrice: string,
    totalLotAmount: number,
}) {
    if (direction === TradeDirectionEnum.Buy) {
        return (<>
            <label className="mr-2">買進原價</label>
            <AcctSpan className="text-right pr-4">{Number(buyPrice) * totalLotAmount}</AcctSpan>
        </>);

    } else {
        return (<>
            <label className="mr-2">賣出原價</label>
            <AcctSpan className="text-right pr-4">{Number(sellPrice) * totalLotAmount}</AcctSpan>
        </>);
    }
}