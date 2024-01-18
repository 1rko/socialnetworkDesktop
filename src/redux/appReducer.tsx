import {getAuthUserDataThunkCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const INICIALIZED_SUCCESS = 'INICIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INICIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INICIALIZED_SUCCESS
}

export const initialisedSuccess = (): InitializedSuccessActionType => ({
    type: INICIALIZED_SUCCESS
})

export const initializeApp = (): ThunkAction<void, AppStateType, any, InitializedSuccessActionType> =>
    async (dispatch) => {
        let promise = dispatch(getAuthUserDataThunkCreator())
        await Promise.all([promise])
        dispatch(initialisedSuccess())
    }

export default appReducer;