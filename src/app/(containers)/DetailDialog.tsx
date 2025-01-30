import { TradeDirectionEnum } from "../(enums)/TradingActionEnum";


interface DetailDialogProps {
    isOpen: boolean,
    onClose: () => void,
    direction: TradeDirectionEnum,
    brokerageFee: number,
    taxFee: number
}

export default function DetailDialog({ isOpen, onClose, direction, brokerageFee, taxFee }: DetailDialogProps) {
    if (!isOpen) return null;
    return (
        <div onClick={onClose}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">

            <div className="min-h-40 bg-background border border-primary p-4">

                <div className="flex justify-center mb-2">
                    <h3>{direction === TradeDirectionEnum.Buy ? '買進' : '賣出'} 費用明細 </h3>
                </div>

                <div className="grid grid-cols-2">

                    <label className="mr-2">證券手續費</label>
                    <div className="text-right pr-4">{brokerageFee}</div>

                    {direction === TradeDirectionEnum.Sell && (<>
                        <label className="mr-2">證券交易稅</label>
                        <div className="text-right pr-4">{taxFee}</div>
                    </>)}
                </div>
            </div>
        </div>
    )
}