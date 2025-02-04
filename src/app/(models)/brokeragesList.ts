import { IconicSelectOption } from "../(components)/IconicSelect";
import { Brokerage } from "../(interfaces)/brokerage";

const url =
  "https://play-lh.googleusercontent.com/qW62UZ01Og4XPAQWOoWJZfEGHY9TejWsvTOPK72wqguwFUb07CH5T9K-DLR4wn0rJ1Gs=w480-h960-rw";

const url2 =
  "https://play-lh.googleusercontent.com/LwrSYnfTOu6mWJlT2VQTfPj8wDNbA3zZk3eALWIgLfuTVOY_OUZUrOCJfXP6mWGA1So=w480-h960-rw";

const general: Brokerage = {
  id: "general",
  name: "自定義",
  feeDiscountRate: 1,
  iconUrl: 'https://play-lh.googleusercontent.com/IXnzZTbO6XFYwVVX-R7jXBQviB4NMBEngCPU1cDBWtBf9Spcby1Uy0PQXhJ7NcuZog=w480-h960-rw',
};

const fubon: Brokerage = {
  id: "fubon",
  name: "富邦",
  feeDiscountRate: 0.3,
  iconUrl: url2,
};

const cathay: Brokerage = {
  id: "cathay",
  name: "國泰",
  feeDiscountRate: 0.28,
  iconUrl: url,
};

export const brokeragesIconicSelectOptions: IconicSelectOption[] = [
  { value: general.id, label: general.name, iconUrl: general.iconUrl },
  { value: fubon.id, label: fubon.name, iconUrl: fubon.iconUrl },
  { value: cathay.id, label: cathay.name, iconUrl: cathay.iconUrl },
];




export const brokerageMap: Map<string, Brokerage> = new Map();
brokerageMap.set('general', general);
brokerageMap.set('fubon', fubon);
brokerageMap.set('cathay', cathay);

