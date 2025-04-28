'use client';
import { useContext, useReducer, useState } from "react";
import PriceInput from "../(components)/PriceInput";
import StyledRadio from "../(components)/StyledRadio";
import { tradeTypeRadioGroup } from "../(configs)/tradeTypeRadioGroup";
import OptionInput from "../(components)/OptionInput";
import { stockAmountRadioGroup } from "../(configs)/stockAmountRadioGroup";
import Result from "./Result";
import { SettingContext } from "../(states)/setting/SettingProvider";
import StockSearchInput from "../(components)/StockSearchInput";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { calculatorReducer, initCalculatorState } from "../(states)/calculator/calculatorReducer";


export default function Calculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initCalculatorState);
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
                    radioGroup={stockAmountRadioGroup}
                />
            </div>
        </div>
    );
}
