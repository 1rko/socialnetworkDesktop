import {AppStateType} from "./reduxStore";

export const getPostData = (state: AppStateType) => {
    return state.profilePage.postData
}

export const getNewPostText = (state: AppStateType) => {
    return state.profilePage.newPostText
}

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getIsFetching = (state: AppStateType) => {
    return state.profilePage.isFetching
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}
