import {getAuthUserDataThunkCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

type ActionsTypes = InferActionTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INICIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const actions = {
    initialisedSuccess: () => ({type: 'INICIALIZED_SUCCESS'} as const)
}

export const initializeApp = (): ThunkAction<void, AppStateType, any, ActionsTypes> =>
    async (dispatch) => {
        let promise = dispatch(getAuthUserDataThunkCreator())
        await Promise.all([promise])
        dispatch(actions.initialisedSuccess())
    }

export default appReducer;