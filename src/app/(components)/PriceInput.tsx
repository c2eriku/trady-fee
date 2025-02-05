'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction } from 'react';
import { getStockInterval } from '../(utilities)/stockInterval';
import Decimal from 'decimal.js';

interface PriceInputProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>
}

export default function PriceInput({ value, onChange }: PriceInputProps) {

    function updatePriceByStep(ctrl: boolean) {
        const price: number = Number(value);
        if (!isNaN(price)) {
            const step = getStockInterval(price);
            let newPrice = new Decimal(price);
            newPrice = ctrl ? newPrice.add(step) : newPrice.minus(step);

            onChange(newPrice.toString());
        } else {
            onChange('0');
        }
    }

    function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
        // if (event.target.value === '') {
        //     return;
        // }
        console.log(event.target.value)
        const newPrice = event.target.value;
        onChange(newPrice);
    }

    return (
        <div className="flex w-full h-10">
            <input type="number" inputMode="decimal" value={value} onChange={updatePrice}
                className='flex-grow'></input>

            <button tabIndex={-1} onClick={() => updatePriceByStep(false)}
                className='p-2 bg-primary-400 hover:bg-primary-500'>
                <MinusIcon className='inline-block size-6'></MinusIcon>
            </button>

            <button tabIndex={-1} onClick={() => updatePriceByStep(true)}
                className='p-2 bg-primary-600 hover:bg-primary-700'>
                <PlusIcon className='inline-block size-6'></PlusIcon>
            </button>
        </div>
    )
}