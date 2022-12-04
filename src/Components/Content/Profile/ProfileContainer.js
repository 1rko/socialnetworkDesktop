import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profileReducer";
import Profile from "./Profile";
import StoreContext from "../../../StoreContext";


const ProfileContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let
                    state = store.getState()

                let addPost = (newPostText) => {
                    store.dispatch(addPostCreator(newPostText));
                    store.dispatch(updateNewPostTextCreator(''))
                }

                let updateNewPostText = (text) => {
                    store.dispatch(updateNewPostTextCreator(text))
                }

                return (
                    <Profile
                        postData={state.profilePage.postData}
                        newPostText={state.profilePage.newPostText}
                        addPost={addPost}
                        updateNewPostText={updateNewPostText}/>
                )
            }}
        </StoreContext.Consumer>
    )
}

export default ProfileContainer;
