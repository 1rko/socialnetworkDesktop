const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

let initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            debugger
            return {
                ...state,
                ...action.userData
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

export default authReducer