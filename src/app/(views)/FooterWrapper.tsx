"use client";
import { useState } from "react"
import { PrivacyDialog } from "../(components)/PrivacyDialog";

export function FooterWrapper() {
    const [isPrivacyDialogOpen, setPrivacyDialogOpen] = useState(false);

    function handlePrivacyButtonClick() {
        setPrivacyDialogOpen(true);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <p>本網站資訊僅供參考，實際資訊請以各券商官網公告為準。</p>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrivacyButtonClick}
                        className="bg-transparent underline cursor-pointer">隱私權政策
                    </button>
                    <a
                        href="mailto:c2eriku@gmail.com?subject=TradyFee Feeback&body=From TradyFee Web."
                    className="underline cursor-pointer">意見回饋</a>
            </div>
        </div >

            <PrivacyDialog
                isOpen={isPrivacyDialogOpen}
                onClose={() => { setPrivacyDialogOpen((prev) => !prev) }}
            ></PrivacyDialog>
        </>
    );
}