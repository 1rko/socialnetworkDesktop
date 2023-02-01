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
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";
import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";

let ProfileAPIContainer = (props) => {

    const params = useParams();
    const profileId = params.userId;

    useEffect(() => {
        if (profileId) {
            props.toggleIsFetching(true)
            axios(`https://social-network.samuraijs.com/api/1.0/profile/${profileId}`).then(response => {
                    props.setProfile(response.data);
                    props.toggleIsFetching(false)
                }
            )

        }
    }, [])

    return (
        <>
            <h1>Profile</h1>

            <MyProfileInfo/>

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

const ProfileContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(ProfileAPIContainer)

export default ProfileContainer;
