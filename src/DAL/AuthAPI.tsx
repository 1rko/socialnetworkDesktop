import {EnumResultCodes, EnumWithCaptcha, instance, APIResponseType} from "./Dal";

type MeResponseDataType = {
        id: number
        email: string
        login: string
}
type LoginResponseDataType = {
    data: {
        userId:number
    }
}

export const authAPI = {
    getMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: any) {
        return instance.post<APIResponseType<LoginResponseDataType, EnumResultCodes | EnumWithCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
            .then(response => response.data)
    }
}