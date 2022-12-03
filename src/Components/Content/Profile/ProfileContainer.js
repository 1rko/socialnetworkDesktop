import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profileReducer";
import Profile from "./Profile";


const ProfileContainer = (props) => {
    let state = props.store.getState()

    let addPost = (newPostText) => {
        props.store.dispatch(addPostCreator(newPostText));
        props.store.dispatch(updateNewPostTextCreator(''))
    }

    let updateNewPostText = (text) => {
        props.store.dispatch(updateNewPostTextCreator(text))
    }

    return (
        <Profile
            postData={state.profilePage.postData}
            newPostText={state.profilePage.newPostText}
            addPost={addPost}
            updateNewPostText={updateNewPostText}/>
    );
}

export default ProfileContainer;
