import { IconicSelectOption } from "../(components)/IconicSelect";
import { Brokerage } from "../(interfaces)/brokerage";

const general: Brokerage = {
  id: "general",
  name: "自定義",
  feeDiscountRate: 1,
  iconUrl: "",
};

const fubon: Brokerage = {
  id: "fubon",
  name: "富邦證券",
  feeDiscountRate: 0.3,
  iconUrl:
    "https://play-lh.googleusercontent.com/LwrSYnfTOu6mWJlT2VQTfPj8wDNbA3zZk3eALWIgLfuTVOY_OUZUrOCJfXP6mWGA1So=s48-rw",
};

const cathay: Brokerage = {
  id: "cathay",
  name: "國泰證券",
  feeDiscountRate: 0.28,
  iconUrl:
    "https://play-lh.googleusercontent.com/qW62UZ01Og4XPAQWOoWJZfEGHY9TejWsvTOPK72wqguwFUb07CH5T9K-DLR4wn0rJ1Gs=s48-rw",
};

const taishin: Brokerage = {
  id: "taishin",
  name: "台新證券",
  feeDiscountRate: 0.2,
  iconUrl:
    "https://play-lh.googleusercontent.com/s4GO-DizuNRjHxEX_eEyEn3y7m9Y_WdEDTO1ZP2EiGj9rWPBy9SCWj9My2uSGIBwag=s48-rw",
};

const kgi: Brokerage = {
  id: "kgi",
  name: "凱基證券",
  feeDiscountRate: 0.6,
  iconUrl:
    "https://play-lh.googleusercontent.com/nu70I_HQNzEgZ0NgAV8Ct68E43XENy4waXKxeOD3RU-0uIBXK_o_dBrWfQEB9kEssj0=s48-rw",
};

const chinatrust: Brokerage = {
  id: "chinatrust",
  name: "中信證券",
  feeDiscountRate: 0.38,
  iconUrl:
    "https://play-lh.googleusercontent.com/CqEVKzkD98hnrEQZseFlH_mQQ0MkQSCyGhUTHI_aCAATFUgc_j5opfzBfmM1-GG1Dp4=s48-rw",
};

const sinoPac: Brokerage = {
  id: "sinoPac",
  name: "永豐證券",
  feeDiscountRate: 0.2,
  iconUrl:
    "https://play-lh.googleusercontent.com/2kbgRk32vMxqn4Ipmz_2K6qC4V0vOWMX8BXkjOkOM9kNc8Lbi04vtGZynwA4VfbRc48=s48-rw",
};

export const brokerageMap: Map<string, Brokerage> = new Map();
brokerageMap.set("general", general);
brokerageMap.set("fubon", fubon);
brokerageMap.set("cathay", cathay);
brokerageMap.set("taishin", taishin);
brokerageMap.set("kgi", kgi);
brokerageMap.set("chinatrust", chinatrust);
brokerageMap.set("sinoPac", sinoPac);

export const brokeragesIconicSelectOptions: IconicSelectOption[] = Array.from(
  brokerageMap,
  ([key, data]) => ({
    value: data.id,
    label: data.name,
    iconUrl: data.iconUrl,
  })
);
