import {AppStateType} from "./reduxStore";

export const selectAuthUserDataPayloadType = (state: AppStateType) => {
    return ({
            id: state.auth.id,
            login: state.auth.login,
            email: state.auth.email,
            isAuthorised: state.auth.isAuthorised,
            captchaUrl: state.auth.captchaUrl
        }
    )
}
