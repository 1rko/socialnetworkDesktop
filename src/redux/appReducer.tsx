import {getAuthUserDataThunkCreator} from "./authReducer";

const INICIALIZED_SUCCESS = 'INICIALIZED_SUCCESS'

 type InitializedSuccessActionType = {
    type: typeof INICIALIZED_SUCCESS
}

export type InitialStateType ={
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitialisedSuccessActionType = {
    type: typeof INICIALIZED_SUCCESS
}

export const initialisedSuccess = (): InitialisedSuccessActionType => ({
    type: INICIALIZED_SUCCESS
})

export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunkCreator())
    await Promise.all([promise])
    dispatch(initialisedSuccess())
}

export default appReducer;