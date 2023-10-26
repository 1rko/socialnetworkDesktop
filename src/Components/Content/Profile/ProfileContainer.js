import {
    addPostThunkCreator,
    setProfile, setStatus,
    toggleIsFetching,
    updateNewPostText,
    updateStatusThunkCreator,
    savePhotoThunkCreator
} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React, {useEffect, useRef} from "react";
import Preloader from "../../Preloader/Preloader";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";
import {profileAPI} from "../../../DAL/Dal";
import {withRouter} from "../../../HOC/withRouter";
import {
    getPostData, getNewPostText, getProfile,
    getIsFetching, getStatus
} from "../../../redux/profileSelectors";


let ProfileAPIContainer = (props) => {

    let profileId = props.router.params.userId;
    const prevProfileIdRef = useRef(); //Хук useRef() запоминает обект, который хранится весб жизн цикл обекта

    useEffect(() => {

        profileId = profileId ? profileId : props.authorizedUserId

        if (prevProfileIdRef.current !== profileId) { //Сравниваются предыд значение с текущим
            prevProfileIdRef.current = profileId;// если не изменилось, то UseEffect не происходит

            props.toggleIsFetching(true)
            profileAPI.getProfile(profileId).then(
                data => {
                    props.setProfile(data);
                    props.toggleIsFetching(false)
                })

            profileAPI.getStatus(props.authorizedUserId).then(
                data => {
                    props.setStatus(data)
                })
        }
    }, )

    return (
        <>
            <h1>Profile</h1>

            {props.isFetching ? <Preloader/> : null}
            <Profile postData={props.postData}
                     newPostText={props.newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     isOwner = {!props.router.params.userId}//если нет параметра (т.е. это Я)
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto = {props.savePhoto}
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        postData: getPostData(state),
        newPostText: getNewPostText(state),
        profile: getProfile(state),
        isFetching: getIsFetching(state),
        status: getStatus(state),
        authorizedUserId: state.auth.id
    }
}

const ProfileContainer =
    compose(
        connect(mapStateToProps, {
            updateNewPostText, setProfile, toggleIsFetching,
            addPost: addPostThunkCreator, updateStatus: updateStatusThunkCreator, savePhoto: savePhotoThunkCreator,
            setStatus
        }),
        withRouter,
        withAuthRedirect)
    (ProfileAPIContainer)

export default ProfileContainer;
