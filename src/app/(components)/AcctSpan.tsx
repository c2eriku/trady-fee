import React, { PropsWithChildren } from "react";

export interface AcctSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    showColor?: boolean;
}

export default function AcctSpan({ children, className, showColor = false, ...props }: PropsWithChildren<AcctSpanProps>) {
    const childrenNumber: number = Number(children);
    let color = '';
    if (showColor && !isNaN(childrenNumber)) {
        if (childrenNumber < 0) color = 'text-red-500';
        else 'text-foreground';
    }

    return (
        <span className={`${className} ${color}`} {...props}>
            {children?.toLocaleString()}
        </span>
    );
}
