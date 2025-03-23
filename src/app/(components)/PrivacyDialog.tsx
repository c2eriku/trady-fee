import { Dialog, DialogSize } from "./Dialog";

export function PrivacyDialog({ isOpen, onClose }: any) {

    return (
        <Dialog isOpen={isOpen} onClose={onClose} size={DialogSize.lg} >
            <h1 className="text-xl font-bold">隱私權政策</h1>
            <p>歡迎使用 TradyFee，這是一款台灣股市交易費用計算工具。隱私權政策希望讓您了解我們如何收集、使用及保護您的資訊。</p>

            <h2 className="text-lg font-semibold mt-2">1. 資訊收集</h2>
            <p>
                本網站不會主動收集任何個人身份資訊，但使用以下工具來提升服務品質：
                <br></br>
                Google Analytics：我們使用 Google Analytics 來分析網站流量及使用者行為，這些數據有助於改善網站體驗。Google Analytics 可能會透過 Cookie 收集匿名資訊，包括裝置類型、瀏覽器、訪問時間等，這些數據不包含個人身份資訊。您可以透過 Google 提供的工具 選擇停用 Google Analytics 追蹤。
                <br></br>
                證交所 API：本網站使用台灣證券交易所 (TWSE) 或相關機構提供的 API 來獲取市場數據。這些 API 僅用於顯示最新交易費用等資訊，網站不會儲存或處理任何交易紀錄或個人資訊。
            </p>

            <h2 className="text-lg font-semibold mt-2">2. 使用資訊</h2>
            <p>
                收集的資訊僅用於以下目的：
                透過 Google Analytics 分析網站流量與使用情況，以改善網站功能與使用者體驗。
                透過證交所 API 獲取市場數據，確保交易費用計算準確。
            </p>
        </Dialog>
    );
}