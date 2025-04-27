import { RadioGroup } from "../(components)/StyledRadio";

export const tradeTypeRadioGroup: RadioGroup = {
    name: 'tradeType',
    options: [
        { value: 'spot', label: '現股' },
        { value: 'day', label: '當沖' },
    ]
}