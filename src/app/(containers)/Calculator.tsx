'use client';
import { useContext, useReducer, useState } from "react";
import PriceInput from "../(components)/PriceInput";
import StyledRadio from "../(components)/StyledRadio";
import { tradeTypeRadioGroup } from "../(models)/tradeTypeRadioGroup";
import OptionInput from "../(components)/OptionInput";
import { stockAmount } from "../(models)/stockAmount";
import Result from "./Result";
import { CaculatorState } from "../(interfaces)/CalculatorState";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";
import { SettingContext } from "../(states)/SettingProvider";
import StockSearchInput from "../(components)/StockSearchInput";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { SettingState } from "../(states)/settingReducer";

const initialState: CaculatorState = {
    buyPrice: '0',
    sellPrice: '0',
    tradeType: TradeTypeEnum.Spot,
    lotAmount: 1,
    lotCategory: LotCategoryEnum.Round,
};


function calculatorReducer(state: CaculatorState, action: {
    type: any;
    payload: any;
    settingState?: SettingState
}) {
    switch (action.type) {
        case "SET_BUY_PRICE":
            if (action.settingState?.syncSellPrice) {
                return {
                    ...state,
                    buyPrice: action.payload,
                    sellPrice: action.payload
                };
            }
            return { ...state, buyPrice: action.payload };
        case "SET_SELL_PRICE":
            return { ...state, sellPrice: action.payload };
        case "SET_TRADE_TYPE":
            return { ...state, tradeType: action.payload };
        case "SET_LOT_AMOUNT":
            return { ...state, lotAmount: action.payload };
        case "SET_LOT_CATEGORY":
            return { ...state, lotCategory: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


export default function Calculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);
    const [showSearch, setShowSearch] = useState(false);
    const setting = useContext(SettingContext);


    return (
        <div className="relative flex flex-col gap-1">

            <section className="mb-6">
                <Result {...state} />
            </section>

            <div className="flex gap-2">
                <button
                    onClick={() => setShowSearch((prev) => !prev)}
                    className="flex items-center p-1 px-2 rounded bg-sky-600 hover:bg-sky-700">
                    {showSearch ? <MinusIcon className="inline size-4"></MinusIcon> : <PlusIcon className="inline size-4"></PlusIcon>}
                    股價速查
                </button>

                {/* <button
                    onClick={() => setShowSearch((prev) => !prev)}
                    className="flex items-center p-1 px-2 rounded bg-amber-600 hover:bg-amber-700">
                    <BarsArrowUpIcon className="inline size-4"></BarsArrowUpIcon>
                    算獲利價
                </button> */}
            </div>

            <div>
                <AnimatePresence>
                    {showSearch && <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0 }
                        }}
                        className="translate "
                    >
                        <StockSearchInput
                            updatePrice={(value) => dispatch({ type: "SET_BUY_PRICE", payload: value, settingState: setting.state })}></StockSearchInput>
                    </motion.div>}
                </AnimatePresence>
            </div>

            <div>
                <label htmlFor="buyPrice">買進價</label>
                <PriceInput
                    id="buyPrice"
                    value={state.buyPrice}
                    onPriceChange={(value) => dispatch({ type: "SET_BUY_PRICE", payload: value, settingState: setting.state })}
                />
            </div>

            <div>
                <label htmlFor="sellPrice">賣出價</label>
                <PriceInput
                    id="sellPrice"
                    value={state.sellPrice}
                    onPriceChange={(value) => dispatch({ type: "SET_SELL_PRICE", payload: value })}
                />
            </div>

            <div>
                <label>交易模式</label>
                <StyledRadio
                    radioGroup={tradeTypeRadioGroup}
                    value={state.tradeType}
                    onChange={(value) => dispatch({ type: "SET_TRADE_TYPE", payload: value })}
                />
            </div>

            <div>
                <label>股數單元</label>
                <OptionInput
                    value={state.lotAmount}
                    onChange={(value) => dispatch({ type: "SET_LOT_AMOUNT", payload: value })}
                    optionValue={state.lotCategory}
                    onOptionChange={(value) => dispatch({ type: "SET_LOT_CATEGORY", payload: value })}
                    radioGroup={stockAmount}
                />
            </div>
        </div>
    );
}
