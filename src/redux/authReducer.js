import { authAPI } from "../DAL/Dal";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const USER_IS_AUTHORISED = 'USER_IS_AUTHORISED'


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

export const setAuthUserData = (id, login, email) =>
({
    type: SET_AUTH_USER_DATA,
    userData: { id, login, email }
})

export const userIsAuthorised = (isAuthorised) =>
({
    type: USER_IS_AUTHORISED,
    isAuthorised: isAuthorised
})

export const meThunkCreator = () => (dispatch) => {
    authAPI.getMe().then(data => {
        if (data.resultCode === 0) {
            let { id, login, email } = data.data
            dispatch(setAuthUserData(id, login, email))
            dispatch(userIsAuthorised(true))
        }
    })
}

export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(meThunkCreator())
        }
        else alert (data.messages)
    })
}

export const logoutThunkCreator = () => (dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(userIsAuthorised(false))
        }
        else alert (data.messages)
    })
}

export default authReducer