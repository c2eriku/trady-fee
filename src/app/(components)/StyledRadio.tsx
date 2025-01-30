export class RadioGroup {
    name: string;
    options: RadioOption[];
    constructor(name: string, options: RadioOption[]) {
        this.name = name;
        this.options = options;
    }
}

export class RadioOption {
    value: string;
    label: string;
    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}

interface StyledRadioProps {
    radioGroup: RadioGroup;
    value: string;
    onChange: (value: string) => void;
}

export default function StyledRadio({ radioGroup, value, onChange }: StyledRadioProps) {

    return (
        <div className="w-full flex items-center">
            {radioGroup.options.map((option, index) => {
                return (
                    <div key={index} className="grow flex items-center">
                        <input type="radio"
                            name={radioGroup.name}
                            id={option.value}
                            defaultChecked={option.value === value}
                            onChange={() => onChange(option.value)}
                            className="hidden peer"></input>
                        <label htmlFor={option.value}
                            className="grow px-2 py-1 border border-primary text-center cursor-pointer
                            peer-checked:bg-primary peer-checked:text-white"
                        >{option.label}</label>
                    </div>
                )
            })}
        </div>
    )
}