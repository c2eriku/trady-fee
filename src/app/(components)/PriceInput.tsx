'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useRef } from 'react';
import { getStockInterval } from '../(utilities)/stockInterval';
import Decimal from 'decimal.js';

interface PriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onPriceChange: Dispatch<SetStateAction<string>>
}

export default function PriceInput({ value, onPriceChange }: PriceInputProps) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    let insideValue: string = value;

    function handlePlus() {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            updatePriceByStep(true);
        }, 100);
    };

    function handleMinus() {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            updatePriceByStep(false);
        }, 100);
    };

    function stopInterval() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    function updatePriceByStep(isIncrement: boolean) {
        const price: number = Number(insideValue);
        if (!isNaN(price)) {
            const step = getStockInterval(price);
            let newPrice = new Decimal(price);
            newPrice = isIncrement ? newPrice.add(step) : newPrice.minus(step);
            insideValue = newPrice.toString();
            onPriceChange(newPrice.toString());
        } else {
            onPriceChange('0');
        }
    }

    function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
        const newPrice = event.target.value;
        insideValue = newPrice.toString();
        onPriceChange(newPrice);
    }

    return (
        <div className="w-full flex h-10">
            <input type="number" inputMode="decimal" value={value} onChange={updatePrice}
                className='grow w-full'></input>

            <button tabIndex={-1}
                onClick={() => updatePriceByStep(false)}
                onPointerDown={handleMinus}
                onPointerUp={stopInterval}
                onPointerLeave={stopInterval}
                className='p-2 bg-primary-400
                    hover:bg-primary-500'>
                <MinusIcon className='size-6'></MinusIcon>
            </button>

            <button tabIndex={-1}
                onClick={() => updatePriceByStep(true)}
                onPointerDown={handlePlus}
                onPointerUp={stopInterval}
                onPointerLeave={stopInterval}
                className='p-2 bg-primary-600
                    hover:bg-primary-700'>
                <PlusIcon className='size-6'></PlusIcon>
            </button>
        </div>
    )
}