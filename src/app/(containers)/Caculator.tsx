'use client';
import { useContext, useReducer, useState } from "react";
import PriceInput from "../(components)/PriceInput";
import StyledRadio from "../(components)/StyledRadio";
import { tradeTypeRadioGroup } from "../(models)/tradeTypeRadioGroup";
import OptionInput from "../(components)/OptionInput";
import { stockAmount } from "../(models)/stockAmount";
import Result from "./Result";
import { CaculatorState } from "../(interfaces)/CaculatorState";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";
import { TradeTypeEnum } from "../(enums)/TradeTypeEnum";
import { SettingContext, SettingState } from "../(states)/SettingState";

const initialState: CaculatorState = {
    buyPrice: 0,
    sellPrice: 0,
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
    const setting = useContext(SettingContext);

    return (
        <div className="relative">

            <section className="mb-6">
                <Result {...state} />
            </section>

            <label>買進價 {state.buyPrice}</label>
            <PriceInput
                value={state.buyPrice}
                onChange={(value) => dispatch({ type: "SET_BUY_PRICE", payload: value, settingState: setting.state })}
            />

            <label>賣出價 {state.sellPrice}</label>
            <PriceInput
                value={state.sellPrice}
                onChange={(value) => dispatch({ type: "SET_SELL_PRICE", payload: value })}
            />

            <label>交易模式 {state.tradeType}</label>
            <StyledRadio
                radioGroup={tradeTypeRadioGroup}
                value={state.tradeType}
                onChange={(value) => dispatch({ type: "SET_TRADE_TYPE", payload: value })}
            />

            <label>股數單元 {state.lotAmount} {state.lotCategory}</label>
            <OptionInput
                value={state.lotAmount}
                onChange={(value) => dispatch({ type: "SET_LOT_AMOUNT", payload: value })}
                optionValue={state.lotCategory}
                onOptionChange={(value) => dispatch({ type: "SET_LOT_CATEGORY", payload: value })}
                radioGroup={stockAmount}
            />
        </div>
    );
}
