'use client';

import { SetStateAction, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface StockSearchInputProps {
    updatePrice: (value: SetStateAction<string>) => void;
}

export default function StockSearchInput({ updatePrice }: StockSearchInputProps) {
    const [stockId, setStockId] = useState<string>("");

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setStockId(val);
    }

    async function handleSearch() {
        const res = await fetch("/api/twse");
        const data: any[] = await res.json();
        const targetStock = data.find((el) => el.Code === stockId);
        updatePrice(targetStock.ClosingPrice);
    }

    return (
        <div className="w-full h-10 flex">
            <input
                type="text"
                id="stockId"
                value={stockId}
                onChange={handleInputChange}
                className=""
                placeholder="請輸入股票代碼或名稱"
            />
            <button
                onClick={handleSearch}
                className="p-2 bg-primary-600 hover:bg-primary-700"
            >
                <MagnifyingGlassIcon className="size-5" />
            </button>
        </div>
    );
}
