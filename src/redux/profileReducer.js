const ADD_PROFILE_POST = 'ADD-PROFILE-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_PROFILE_POST:
                let lastItem = state.postData[state.postData.length - 1]
                let newPost = {
                    id: lastItem.id + 1,
                    likesCount: lastItem.likesCount + 1,
                    postText: action.newText
                }
                state.postData.push(newPost)
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.text
            return state;
        default:
            return state;
    }
}

export const addPostCreator = (newText) =>
    ({
        type: ADD_PROFILE_POST,
        newText: newText
    })

export const updateNewPostTextCreator = (text) =>
    ({
        type: UPDATE_NEW_POST_TEXT,
        text: text
    })

export default profileReducer