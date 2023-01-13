import {
    addPost,
    setProfile,
    toggleIsFetching,
    updateNewPostText
} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import Preloader from "../../Preloader/Preloader";
import store from "../../../redux/reduxStore";

let ProfileAPIContainer = (props) => {

    const params = useParams();
    const profileId = params.userId;

    useEffect(() => {
        props.toggleIsFetching(true)
        console.log(store.getState().profilePage.profile)
        axios(`https://social-network.samuraijs.com/api/1.0/profile/${profileId}`).then(response => {
                props.setProfile(response.data);
                console.log("после запроса "+store.getState().profilePage.profile)
                props.toggleIsFetching(false)
            }
        )
    }, [])

    return (
        <>
            <h1>Profile</h1>
            {props.isFetching ? <Preloader/> : null}
            <Profile postData={props.postData}
                     newPostText={props.newPostText}
                //isFetching={this.props.isFetching}
                //toggleIsFetching={this.props.toggleIsFetching}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                //setProfile={this.props.setProfile}
                     profile={props.profile}
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPost(newPostText));
            dispatch(updateNewPostText(''))
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostText(text))
        },
        setProfile: (profile) => {
            dispatch(setProfile(profile))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetching(isFetching))
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileAPIContainer)
export default ProfileContainer;
