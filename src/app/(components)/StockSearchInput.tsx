'use client';

import { SetStateAction, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface StockSearchInputProps {
    updatePrice: (value: SetStateAction<string>) => void;
}

export default function StockSearchInput({ updatePrice }: StockSearchInputProps) {
    const [stockId, setStockId] = useState<string>("");
    const [error, setError] = useState<string>("");

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setStockId(val);
        setError("");
    }

    function validate(): boolean {
        if (!stockId.trim()) {
            setError("請輸入股票代碼");
            return false;
        }

        if (!/^\d{4,}$/.test(stockId)) {
            setError("請輸入4位數以上");
            return false;
        }

        return true;
    }

    async function handleSearch() {
        if (!validate()) return;

        try {
            const res = await fetch("https://twse-proxy.c2eriku.workers.dev/api/all");
            const data: any[] = await res.json();
            const targetStock = data.find((el) => el.Code === stockId);

            if (!targetStock) {
                setError("找不到該股票代碼");
                return;
            }

            updatePrice(targetStock.ClosingPrice);
        } catch (err) {
            setError("資料讀取失敗");
        }
    }

    return (
        <div className="w-full flex flex-col gap-1">
            <div className="flex h-10">
                <input
                    type="text"
                    id="stockId"
                    value={stockId}
                    onChange={handleInputChange}
                    className={`${error ? 'bg-red-200' : ''}`}
                    placeholder="請輸入股票代碼"
                />
                <button
                    onClick={handleSearch}
                    className="p-2 bg-primary-600 hover:bg-primary-700"
                >
                    <MagnifyingGlassIcon className="size-5 text-white" />
                </button>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
