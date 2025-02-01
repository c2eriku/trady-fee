import { ChangeEvent } from 'react';

interface ToggleSwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function ToggleSwitch({ value, onChange }: ToggleSwitchProps) {

    function handleClick() {
        onChange(!value);
    }

    return (
        <div onClick={handleClick} className="relative w-16 h-8">
            <span className={`absolute cursor-pointer w-full h-full rounded-full
            bg-gray-300 transition-all duration-400 before:absolute 
            before:content-[''] before:h-6 before:w-6 before:left-1 
            before:bottom-1 before:bg-white before:transition-all before:duration-400 before:rounded-full
            ${value ? 'bg-primary' : ''}
            ${value ? 'before:translate-x-8' : ''}`} />
        </div>
    );
};