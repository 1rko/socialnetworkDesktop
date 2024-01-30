import axios from "axios";

export const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            "API-KEY": "0a4e82f0-3a0f-4f07-bd13-4f0796adfac4"
        }
    }
)

export enum EnumResultCodes {
    Success = 0,
    Error = 1
}

export enum EnumWithCaptcha {
    CaptсhaIsRequired = 10
}

export type APIResponseType<D = {}, RC = EnumResultCodes> = {
    data: D
    resultCode: RC
    messages: Array<string>
}