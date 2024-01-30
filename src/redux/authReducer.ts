import {EnumResultCodes, EnumWithCaptcha} from "../DAL/Dal";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {SetAuthUserDataPayloadType} from "types";
import {authAPI} from "../DAL/AuthAPI";
import {securityAPI} from "../DAL/SecurityAPI";

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuthorised: false,
    captchaUrl: null as string | null    //if null, captcha is not required
}

export type InitialStateType = typeof initialState // создаем тип на основе initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_AUTH_USER_DATA':
            return {
                ...state,
                ...action.payload
            };

        case 'USER_IS_AUTHORISED':
            return {
                ...state,
                isAuthorised: action.isAuthorised
            };

        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };

        default:
            return state;
    }
}

type ActionsTypes = InferActionTypes<typeof actions>

const actions = {
    setAuthUserData: (setAuthUserDataPayload: SetAuthUserDataPayloadType) =>
        ({type: 'SET_AUTH_USER_DATA', payload: setAuthUserDataPayload} as const),
    userIsAuthorised: (isAuthorised: boolean) => ({type: 'USER_IS_AUTHORISED', isAuthorised: isAuthorised} as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: 'SET_CAPTCHA_URL', payload: {captchaUrl}} as const)
}

type ThunkType = ThunkAction<void, AppStateType, any, ActionsTypes>

export const getAuthUserDataThunkCreator = (): ThunkType =>
    async (dispatch) => {
        let data = await authAPI.getMe()
        if (data.resultCode === EnumResultCodes.Success) {
            let {id, login, email} = data.data
            let payload = {id, login, email, isAuthorised: true, captchaUrl: null}
            dispatch(actions.setAuthUserData(payload))
        }
    }

export const logoutThunkCreator = (): ThunkType =>
    async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === EnumResultCodes.Success) {
            let payload = {id: null, login: null, email: null, isAuthorised: false, captchaUrl: null}
            dispatch(actions.setAuthUserData(payload))
        } else alert(data.messages)
    }

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === EnumResultCodes.Success) {
            dispatch(getAuthUserDataThunkCreator())
        } else if (data.resultCode === EnumWithCaptcha.CaptсhaIsRequired) {
            dispatch(getCaptchaUrlThunkCreator())
        } else {
            alert(data.messages)
        }
    }

export const getCaptchaUrlThunkCreator = (): ThunkType =>
    async (dispatch) => {
        let data = await securityAPI.getCaptchaUrl()
        dispatch(actions.setCaptchaUrl(data.url))
    }

export default authReducer