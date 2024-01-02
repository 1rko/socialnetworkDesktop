import {authAPI, security} from "../DAL/Dal";

const SET_AUTH_USER_DATA = 'authReducer/SET_AUTH_USER_DATA'
const USER_IS_AUTHORISED = 'authReducer/USER_IS_AUTHORISED'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

/*export type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuthorised: boolean
    captchaUrl: string | null
}*/

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
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }

        case USER_IS_AUTHORISED: {
            return {
                ...state,
                isAuthorised: action.isAuthorised
            };
        }

        case SET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        }

        default:
            return state;
    }
}

export type SetAuthUserDataPayloadType = {
    id: number | null
    login: string | null
    email: string | null
    isAuthorised: boolean
    captchaUrl: string | null
}

export type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (id: number | null,
                                login: string | null,
                                email: string | null,
                                isAuthorised: boolean,
                                captchaUrl = null): SetAuthUserDataActionType =>
    ({
        type: SET_AUTH_USER_DATA,
        payload: {id, login, email, isAuthorised, captchaUrl}
    })

export const userIsAuthorised = (isAuthorised: boolean) =>
    ({
        type: USER_IS_AUTHORISED,
        isAuthorised: isAuthorised
    })

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: { captchaUrl: string }
}

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType =>
    ({
        type: SET_CAPTCHA_URL,
        payload: {captchaUrl}
    })

export const getAuthUserDataThunkCreator = () => async (dispatch: any) => {
    let data = await authAPI.getMe()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const logoutThunkCreator = () => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null))
    } else alert(data.messages)
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator())
    } else if (data.resultCode === 10) {
        dispatch(getCaptchaUrlThunkCreator())
    }
    else {
        alert(data.messages)
    }
}

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
    let data = await security.getCaptchaUrl()
    dispatch(setCaptchaUrl(data.url))

    /*if (data.resultCode === 0) {

        //dispatch(setAuthUserData(null, null, null, false))
    }
    else alert(data.messages)*/
}

export default authReducer