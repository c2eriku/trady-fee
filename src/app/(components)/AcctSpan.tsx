import React, { PropsWithChildren } from "react";

export interface AcctSpanProps extends React.HTMLAttributes<HTMLSpanElement> {}

export default function AcctSpan({ children, className, ...props }: PropsWithChildren<AcctSpanProps>) {
  
    
    return (
        <span className={className} {...props}>
            {children?.toLocaleString()}
        </span>
    );
}

function formatAccounting(value: number, currency: string = ""): string {
    const absValue = Math.abs(value).toLocaleString(); // 轉成千分位格式
    return value < 0 ? `(${currency}${absValue})` : `${currency}${absValue}`;
}
