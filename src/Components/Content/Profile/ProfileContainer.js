import {
    addPostThunkCreator,
    setProfile, setStatus,
    toggleIsFetching,
    updateNewPostText, updateStatusThunkCreator
} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import Preloader from "../../Preloader/Preloader";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";
import {profileAPI} from "../../../DAL/Dal";
import store from "../../../redux/reduxStore";
import {withRouter} from "../../../HOC/withRouter";


let ProfileAPIContainer = (props) => {

    let profileId = props.router.params.userId;

    useEffect(() => {

        profileId = profileId ? profileId : props.authorizedUserId

        props.toggleIsFetching(true)
        profileAPI.getProfile(profileId).then(
            data => {
                props.setProfile(data);
                props.toggleIsFetching(false)
            })

    }, [])

    return (
        <>
            <h1>Profile</h1>

            {props.isFetching ? <Preloader/> : null}
            <Profile postData={props.postData}
                     newPostText={props.newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
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
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}

const ProfileContainer =
    compose(
        connect(mapStateToProps, {
            updateNewPostText, setProfile, toggleIsFetching,
            addPost: addPostThunkCreator, updateStatus: updateStatusThunkCreator, setStatus
        }),
        withRouter,
        withAuthRedirect)
    (ProfileAPIContainer)

export default ProfileContainer;
