'use client';
import React, { useEffect, useRef, useState } from "react";

export interface IconicSelectOption {
    value: string | number;
    label: string;
    iconUrl: string;
}

export interface IconicSelectProps {
    options: IconicSelectOption[];
    defaultValue: string | number;
    onChange: (value: string | number) => void;
}

export function IconicSelect({ options, defaultValue, onChange }: IconicSelectProps) {
    const defaultOption = options.find(option => option.value === defaultValue);
    const [value, setValue] = useState(defaultOption?.value);
    const [label, setLabel] = useState(defaultOption?.label);
    const [iconUrl, setIconUrl] = useState(defaultOption?.iconUrl);

    const optionsContainerRef = useRef<HTMLDivElement>(null);

    function toggleDropdown(event: React.MouseEvent) {
        function closeDropdownListener() {
            const dropdown = optionsContainerRef.current;
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }

        const dropdown = optionsContainerRef.current;
        if (!dropdown) return;

        if (dropdown.style.display === 'none') {
            dropdown.style.display = 'block';
            window.addEventListener('click', closeDropdownListener, { once: true });
            event.stopPropagation();
        } else {
            dropdown.style.display = 'none';
        }
    }

    function handleSelect(value: string | number) {
        onChange(value);
        const updatedOption = options.find(option => option.value === value);
        setValue(value);
        setLabel(updatedOption?.label);
        setIconUrl(updatedOption?.iconUrl);

    }

    return (
        <div onClick={toggleDropdown} className="relative w-full cursor-pointer z-50">

            <div className="flex items-center rounded overflow-hidden">
                <IconicOption
                    label={label!}
                    iconUrl={iconUrl!}
                    onClick={() => { }} />
            </div>

            <div ref={optionsContainerRef}
                className="absolute top-8 right-0 w-full min-w-40 bg-gray-500 rounded-b"
                style={{ display: 'none' }}>

                {options.map((option) =>
                    <IconicOption
                        key={option.value}
                        label={option.label}
                        iconUrl={option.iconUrl}
                        onClick={() => handleSelect(option.value)} />)}
            </div>
        </div>
    );
}


interface IconicOptionProps {
    label: string;
    iconUrl: string;
    onClick: () => void;
}

function IconicOption({ label, iconUrl, onClick }: IconicOptionProps) {
    return (
        <button onClick={onClick}
            className="flex items-center w-full bg-white rounded bg-opacity-20 px-2 py-1 hover:bg-opacity-30">
            <img src={iconUrl} alt={label} className="w-6 h-6" />
            <label className="ml-2 cursor-pointer">{label}</label>
        </button>
    );
}