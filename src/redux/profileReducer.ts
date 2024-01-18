import {EnumResultCodes, profileAPI} from "../DAL/Dal";
import {PhotosType, PostDataType, ProfileType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const UPDATE_NEW_MESSAGE = 'profileReducer/UPDATE_NEW_MESSAGE'
const ADD_PROFILE_POST = 'profileReducer/ADD-PROFILE-POST'
const UPDATE_NEW_POST_TEXT = 'profileReducer/UPDATE-NEW-POST-TEXT'
const SET_PROFILE = 'profileReducer/SET-PROFILE'
const TOGGLE_IS_FETCHING = 'profileReducer/TOGGLE-IS-FETCHING'
const SET_STATUS = 'profileReducer/SET_STATUS'
const DELETE_POST = 'profileReducer/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profileReducer/SAVE_PHOTO_SUCCESS'

let initialState = {
    postData: [
        {id: 1, likesCount: 11, postText: "Hi"},
        {id: 2, likesCount: 12, postText: "My name is"},
        {id: 3, likesCount: 13, postText: "How are you"},
        {id: 4, likesCount: 14, postText: "I am fine"}
    ] as Array<PostDataType>,
    newPostText: '' as string | null,
    profile: null as ProfileType | null,
    isFetching: false as boolean,
    status: 'initialStatus' as string
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_PROFILE_POST: {
            let lastItem = state.postData[state.postData.length - 1]
            let newPost = {
                id: lastItem.id + 1,
                likesCount: lastItem.likesCount + 1,
                postText: action.newText
            }
            return {
                ...state,
                postData: [...state.postData, newPost]
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                postData: state.postData.filter(p => p.id != action.postId)
            };
        }

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.text
            };
        }

        case SET_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }

        default:
            return state;
    }
}

type ActionTypes =
    AddPostType
    | DeletePostType
    | UpdateNewPostTextType
    | SetProfileType
    | ToggleIsFetchingType
    | SetStatusType
    | SavePhotoSuccessType

export type AddPostType = {
    type: typeof ADD_PROFILE_POST,
    newText: string | null
}

export const addPost = (newText: string | null): AddPostType =>
    ({
        type: ADD_PROFILE_POST,
        newText: newText
    })

export type DeletePostType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost = (postId: number): DeletePostType =>
    ({
        type: DELETE_POST,
        postId: postId
    })

export type UpdateNewPostTextType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    text: string | null
}

export const updateNewPostText = (text: string | null): UpdateNewPostTextType =>
    ({
        type: UPDATE_NEW_POST_TEXT,
        text: text
    })

export type SetProfileType = {
    type: typeof SET_PROFILE,
    profile: ProfileType
}

export const setProfile = (profile: ProfileType): SetProfileType =>
    ({
        type: SET_PROFILE,
        profile: profile
    })

export type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType =>
    ({
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    })

export type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatusType => ({
    type: SET_STATUS,
    status: status
})

export type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const SavePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos: photos
})

type ThunkType= ThunkAction<void, AppStateType, any, ActionTypes>

export const updateStatusThunkCreator = (status: string) : ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.updateStatus(status)

        if (response.resultCode === EnumResultCodes.Success) {
            dispatch(setStatus(status))
        } else {
            console.log("Error : " + response.messages)
        }
    }

export const addPostThunkCreator = (newPostText: string) : ThunkType =>
    (dispatch) => {
        dispatch(addPost(newPostText));
        dispatch(updateNewPostText(''))
    }

export const savePhotoThunkCreator = (fileName: any) : ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(fileName)
        if (response.resultCode === EnumResultCodes.Success) {
            dispatch(SavePhotoSuccess(response.data))
        } else {
            console.log("Error : " + response.messages)
        }
    }

export const saveProfileThunkCreator = (profile: ProfileType) : ThunkType =>
    async (dispatch) => {

        let response = await profileAPI.saveProfile(profile)
        if (response.resultCode === EnumResultCodes.Success) {
            profileAPI.getProfile(profile.userId).then(
                data => {
                    dispatch(setProfile(data))
                })
        } else {
            console.log("Error : " + response.messages)
            return response.messages
        }
    }

export default profileReducer
