import { authAPI } from "../DAL/Dal";

const SET_AUTH_USER_DATA = 'authReducer/SET_AUTH_USER_DATA'
const USER_IS_AUTHORISED = 'authReducer/USER_IS_AUTHORISED'


let initialState = {
    id: null,
    login: null,
    email: null,
    isAuthorised: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.userData
            };
        }

        case USER_IS_AUTHORISED: {
            return {
                ...state,
                isAuthorised: action.isAuthorised
            };
        }

        default:
            return state;
    }
}

export const setAuthUserData = (id, login, email, isAuthorised) =>
({
    type: SET_AUTH_USER_DATA,
    userData: { id, login, email, isAuthorised }
})

export const userIsAuthorised = (isAuthorised) =>
({
    type: USER_IS_AUTHORISED,
    isAuthorised: isAuthorised
})

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
    let data = await authAPI.getMe()
    if (data.resultCode === 0) {
        let { id, login, email } = data.data
        dispatch(setAuthUserData(id, login, email, true))
    }

}

export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator())
    }
    else alert(data.messages)

}

export const logoutThunkCreator = () => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
    else alert(data.messages)

}

export default authReducer