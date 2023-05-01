import { getAuthUserDataThunkCreator } from "./authReducer";

const INICIALIZED_SUCCESS = 'INICIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INICIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
}

export const initialisedSuccess = () =>
({
    type: INICIALIZED_SUCCESS
})

export const initializeApp = () => async (dispatch) => {
    let promise = dispatch(getAuthUserDataThunkCreator())
    await Promise.all([promise])
    dispatch(initialisedSuccess())
}

export default appReducer;