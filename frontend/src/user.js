import { atom } from "recoil";

export const userInfo = atom({
    key: "userInfo",
    default: {
        username: "",
        firstName: "",
        lasName: "",
        balance: 0
    }
});