import {
    addPost,
    setProfile,
    toggleIsFetching,
    updateNewPostText, updateStatusThunkCreator
} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import Preloader from "../../Preloader/Preloader";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";
import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";
import {profileAPI} from "../../../DAL/Dal";
import {onUnFollow} from "../../../redux/usersReducer";


let ProfileAPIContainer = (props) => {

    const params = useParams();
    const profileId = params.userId;

    useEffect(() => {
            if (profileId) {
                props.toggleIsFetching(true)
                profileAPI.getProfile(profileId).then(
                    data => {
                        console.log(data);
                        props.setProfile(data);
                        props.toggleIsFetching(false)
                    })
            }

        }, []
    )

    return (
        <>
            <h1>Profile</h1>

            <MyProfileInfo status={props.status} updateStatus={props.updateStatus}/>

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
        status: state.profilePage.status
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

const ProfileContainer = compose(
    connect(mapStateToProps, {...mapDispatchToProps,updateStatus: updateStatusThunkCreator}),
    withAuthRedirect)
(ProfileAPIContainer)

export default ProfileContainer;
