import axios, {AxiosResponse} from "axios";
import {PhotosType, ProfileType, UsersDataType} from "types";
import {string} from "yup";
import {FilterType} from "../redux/usersReducer";

const instance = axios.create({
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

type GetUsersType = {
    items: Array<UsersDataType>
    totalCount: number
    error: string
}

type FollowUnfollowType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const usersAPI = {
    getUsers<GetUsersType>(currentPage: number = 1, usersCount: number = 10, filter: FilterType) {                    //axios типизирован, автоматически неявно
        return instance.get(`users?page=${currentPage} &count=${usersCount} &term=${filter.term} ${filter.friend === null ? ''
            : filter.friend === true ? '&friend=true' : '&friend=false'} `)               //возвращается промис
            .then(response => response.data)                                                    //в <...> - то, что возвращает промис
    },

    followUser<FollowUnfollowType>(userID: number) {
        return instance.post(`follow/${userID}`)
            .then(response => response.data)
    },

    unFollowUser<FollowUnfollowType>(userID: number) {
        return instance.delete(`follow/${userID}`)
            .then(response => response.data)
    }
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}

type LoginLogoutResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const authAPI = {
    getMe() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: any) {
        return instance.post<LoginLogoutResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete<LoginLogoutResponseType>(`auth/login`)
            .then(response => response.data)
    }
}

type UpdateStatusType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type SaveProfileType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type SavePhotoType = {
    resultCode: number
    messages: Array<string>
    data: PhotosType
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`)
            .then(response => response.data)
    },

    getStatus(userID: number) {
        return instance.get<AxiosResponse<string>>(`profile/status/${userID}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<UpdateStatusType>(`profile/status/`, {status: status})
            .then(response => response.data)
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<SavePhotoType>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileType>(`profile/`, profile)
            .then(response => response.data)
    }
}

type GetCaptchaUrlType = {
    url: string
}

export const security = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`)
            .then(response => response.data)
    }
}
