const ADD_PROFILE_POST = 'ADD-PROFILE-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_PROFILE = 'SET-PROFILE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

let initialState = {
    postData: [
        {
            id: 1,
            likesCount: 11,
            postText: "Hi"
        },
        {
            id: 2,
            likesCount: 12,
            postText: "My name is"
        },
        {
            id: 3,
            likesCount: 13,
            postText: "How are you"
        },
        {
            id: 4,
            likesCount: 14,
            postText: "I am fine"
        }
    ],
    newPostText: '',
    profile:null,
    isFetching:false
}

const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const addPost = (newText) =>
({
    type: ADD_PROFILE_POST,
    newText: newText
})

export const updateNewPostText = (text) =>
({
    type: UPDATE_NEW_POST_TEXT,
    text: text
})

export const setProfile = (profile) =>
({
    type: SET_PROFILE,
    profile: profile
})

export const toggleIsFetching = (isFetching) =>
({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
})

export default profileReducer