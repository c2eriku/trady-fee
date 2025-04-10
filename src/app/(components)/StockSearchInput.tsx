'use client';

import { SetStateAction, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface StockSearchInputProps {
    updatePrice: (value: SetStateAction<string>) => void;
}

export default function StockSearchInput({ updatePrice }: StockSearchInputProps) {
    const [stockId, setStockId] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);

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

        setProcessing(true);
        try {
            const res = await fetch(`https://twse-proxy.c2eriku.workers.dev/?stockId=${stockId}`);
            const data: any = await res.json();
            const zPrice: number = Number(data.msgArray[0].z as string);
            updatePrice(zPrice.toFixed(2));
        } catch (err) {
            setError("資料讀取失敗");
        } finally {
            setProcessing(false);
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
                    className="p-2 bg-primary-600 hover:bg-primary-700 flex items-center justify-center min-w-10"
                    disabled={processing}
                >
                    {processing ? (
                        <svg
                            className="animate-spin size-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        <MagnifyingGlassIcon className="size-5 text-white" />
                    )}
                </button>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
