'use client';
import { useState } from "react";
import { RadioGroup } from "./StyledRadio";

interface OptionInputProps {
    value: number;
    onChange: (value: number) => void;
    optionValue: string;
    onOptionChange: (value: string) => void;
    radioGroup: RadioGroup;
}

export default function OptionInput(props: OptionInputProps) {
    const [optionValue, setOptionValue] = useState(props.optionValue);
    const [value, setValue] = useState(props.value);


    function updateValue(event: React.ChangeEvent<HTMLInputElement>) {
        const newPrice = Number(event.target.value);
        setValue(newPrice);
        props.onChange(newPrice);
    }

    function updateOptionValue(event: React.ChangeEvent<HTMLInputElement>) {
        const newOption = event.target.value;
        setOptionValue(newOption);
        props.onOptionChange(newOption);
    }

    return (
        <div className="flex w-full h-10">
            <input type="number" inputMode="decimal" value={value} onChange={updateValue} className="grow"></input>

            {props.radioGroup.options.map((option, index) => {
                return (
                    <div key={index} className="flex items-center">
                        <input type="radio" name={props.radioGroup.name} id={option.value} value={option.value}
                            onChange={updateOptionValue} defaultChecked={option.value === optionValue} className="hidden peer" ></input>
                        <label htmlFor={option.value}
                            className="flex items-center h-full px-2 py-1 border border-primary cursor-pointer
                            peer-checked:bg-primary peer-checked:text-white"
                        >{option.label}</label>
                    </div>
                )
            })}

        </div>
    );
}