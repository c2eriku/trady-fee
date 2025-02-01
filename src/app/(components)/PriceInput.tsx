'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction } from 'react';
import { getStockInterval } from '../(utilities)/stockInterval';

interface PriceInputProps {
    value: number;
    onChange: Dispatch<SetStateAction<number>>
}

export default function PriceInput({ value, onChange }: PriceInputProps) {

    function updatePriceByStep(ctrl: boolean) {
        if (typeof value === 'number') {
            const step = getStockInterval(value);
            let newPrice = ctrl ? value + step : value - step;
            newPrice = Math.round(newPrice * 100) / 100;

            onChange(newPrice);
        } else {
            onChange(0);
        }
    }

    function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value === '') {
            return;
        }
        const newPrice = Number(event.target.value);
        onChange(newPrice);
    }

    return (
        <div className="flex w-full h-10">
            <input type="number" inputMode="decimal" value={value} onChange={updatePrice}
                className='flex-grow'></input>

            <button tabIndex={-1} onClick={() => updatePriceByStep(false)}
                className='p-2 bg-primary-400 hover:bg-primary-500'>
                <MinusIcon className='inline-block size-5'></MinusIcon>
            </button>

            <button tabIndex={-1} onClick={() => updatePriceByStep(true)}
                className='p-2 bg-primary-600 hover:bg-primary-700'>
                <PlusIcon className='inline-block size-5'></PlusIcon>
            </button>
        </div>
    )
}