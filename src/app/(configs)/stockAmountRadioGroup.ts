import { RadioGroup } from "../(components)/StyledRadio";
import { LotCategoryEnum } from "../(enums)/LotCategoryEnum";

export const stockAmountRadioGroup: RadioGroup = {
    name: 'stockAmount',
    options: [
        { value: LotCategoryEnum.Odd, label: '零股' },
        { value: LotCategoryEnum.Round, label: '整股' }
    ]
}