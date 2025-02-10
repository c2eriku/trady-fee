import { XMarkIcon } from "@heroicons/react/16/solid";
import { TradeDirectionEnum } from "../(enums)/TradingActionEnum";
import { AnimatePresence, motion } from "framer-motion";
import AcctSpan from "../(components)/AcctSpan";


interface DetailDialogProps {
    isOpen: boolean,
    onClose: () => void,
    direction: TradeDirectionEnum,
    buyPrice: number,
    sellPrice: number,
    totalLotAmount: number,
    finalResult: number,
    brokerageFee: number,
    taxFee: number
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
        <>
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={onClose}
                    className="fixed inset-0 w-screen h-screen bg-black"
                >
                </motion.div>}
            </AnimatePresence>


            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-0 m-auto w-64 h-64 rounded-lg shadow-lg"
                >

                    <div className="relative min-h-40 bg-background border border-primary rounded p-4">
                        <button className="absolute top-0 right-0 rounded-bl-md overflow-hidden" onClick={onClose}>
                            <XMarkIcon className="size-8 hover:bg-primary-600"></XMarkIcon>
                        </button>

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


                            <label className="mr-2">=</label>
                            <AcctSpan className="text-right pr-4">{finalResult}</AcctSpan>

                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

function DirectionDetail({
    direction,
    buyPrice,
    sellPrice,
    totalLotAmount
}: {
    direction: TradeDirectionEnum,
    buyPrice: number,
    sellPrice: number,
    totalLotAmount: number,
}) {
    if (direction === TradeDirectionEnum.Buy) {
        return (<>
            <label className="mr-2">買進原價</label>
            <AcctSpan className="text-right pr-4">{buyPrice * totalLotAmount}</AcctSpan>
        </>);

    } else {
        return (<>
            <label className="mr-2">賣出原價</label>
            <AcctSpan className="text-right pr-4">{sellPrice * totalLotAmount}</AcctSpan>
        </>);
    }
}