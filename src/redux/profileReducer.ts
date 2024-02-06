import {EnumResultCodes} from "../DAL/Dal";
import {PhotosType, PostDataType, ProfileType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {profileAPI} from "../DAL/ProfileAPI";

let initialState = {
    postData: [
        {id: 1, likesCount: 11, postText: "Hi"},
        {id: 2, likesCount: 12, postText: "My name is"},
        {id: 3, likesCount: 13, postText: "How are you"},
        {id: 4, likesCount: 14, postText: "I am fine"}
    ] as Array<PostDataType>,
    newPostText: '' as string ,
    profile: null as ProfileType | null,
    isFetching: false as boolean,
    status: 'initialStatus' as string
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profileReducer/ADD-PROFILE-POST': {
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

        case "profileReducer/DELETE_POST": {
            return {
                ...state,
                postData: state.postData.filter(p => p.id != action.postId)
            };
        }

        case "profileReducer/UPDATE-NEW-POST-TEXT": {
            return {
                ...state,
                newPostText: action.text
            };
        }

        case "profileReducer/SET-PROFILE": {
            return {
                ...state,
                profile: action.profile
            };
        }

        case "profileReducer/TOGGLE-IS-FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            };
        }

        case "profileReducer/SET_STATUS": {
            return {
                ...state,
                status: action.status
            };
        }

        case "profileReducer/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }

        default:
            return state;
    }
}

type ActionsType = InferActionTypes<typeof actions>

export const actions = {
    addPost: (newText: string) => ({
            type: 'profileReducer/ADD-PROFILE-POST',
            newText: newText
        } as const),
    deletePost: (postId: number) => ({
            type: 'profileReducer/DELETE_POST',
            postId: postId
        } as const),
    updateNewPostText: (text: string) => ({
            type: 'profileReducer/UPDATE-NEW-POST-TEXT',
            text: text
        } as const),
    setProfile: (profile: ProfileType) => ({
            type: 'profileReducer/SET-PROFILE',
            profile: profile
        } as const),
    toggleIsFetching: (isFetching: boolean) => ({
            type: 'profileReducer/TOGGLE-IS-FETCHING',
            isFetching: isFetching
        } as const),
    setStatus: (status: string) => ({
        type: 'profileReducer/SET_STATUS',
        status: status
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'profileReducer/SAVE_PHOTO_SUCCESS',
        photos: photos
    } as const)
}

export type ThunkType= ThunkAction<void, AppStateType, any, ActionsType>

export const updateStatusThunkCreator = (status: string) : ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.updateStatus(status)

        if (response.resultCode === EnumResultCodes.Success) {
            dispatch(actions.setStatus(status))
        } else {
            console.log("Error : " + response.messages)
        }
    }

export const addPostThunkCreator = (newPostText: string) : ThunkType =>
    (dispatch) => {
        dispatch(actions.addPost(newPostText));
        dispatch(actions.updateNewPostText(''))
    }

export const savePhotoThunkCreator = (fileName: File) : ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(fileName)
        if (response.resultCode === EnumResultCodes.Success) {
            dispatch(actions.savePhotoSuccess(response.data.photos))
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
                    dispatch(actions.setProfile(data))
                })
        } else {
            console.log("Error : " + response.messages)
            return response.messages
        }
    }

export default profileReducer
