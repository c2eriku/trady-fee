'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';
import { getStockInterval } from '../(utilities)/stockInterval';

interface PriceInputProps {
    value: number;
    onChange: Dispatch<SetStateAction<number>>
}

export default function PriceInput({ value, onChange }: PriceInputProps) {
    const [price, setPrice] = useState(value);

    function updatePriceByStep(ctrl: boolean) {
        const step = getStockInterval(price);
        let newPrice = ctrl ? price + step : price - step;
        newPrice = Math.round(newPrice * 100) / 100;

        setPrice(newPrice);
        onChange(newPrice);
    }

    function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
        const newPrice = Number(event.target.value);
        setPrice(newPrice);
        onChange(newPrice);
    }

    return (
        <div className="flex w-full h-10">
            <input type="number" inputMode="decimal" value={price} onChange={updatePrice}
                className='flex-grow'></input>

            <button tabIndex={-1} onClick={() => updatePriceByStep(false)} className='p-2 bg-primary-light'>
                <MinusIcon className='inline-block size-5'></MinusIcon>
            </button>

            <button tabIndex={-1} onClick={() => updatePriceByStep(true)} className='p-2'>
                <PlusIcon className='inline-block size-5'></PlusIcon>
            </button>
        </div>
    )
}