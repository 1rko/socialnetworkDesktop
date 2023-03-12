import {getAuthUserDataThunkCreator} from "./authReducer";

const INICIALIZED_SUCCESS = 'INICIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INICIALIZED_SUCCESS: {
            return {
                ...state,
                initialized:true
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

export const initializeApp = () => (dispatch) => {
   let promise=dispatch (getAuthUserDataThunkCreator())
    Promise.all([promise]).then(()=>
        dispatch(initialisedSuccess()))
}

export default appReducer;