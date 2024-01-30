import {
    addPostThunkCreator,
    setProfile, setStatus,
    toggleIsFetching,
    updateNewPostText,
    updateStatusThunkCreator,
    savePhotoThunkCreator, saveProfileThunkCreator
} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import Preloader from "../../Preloader/Preloader";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../../HOC/withRouter";
import {
    getPostData, getNewPostText, getProfile,
    getIsFetching, getStatus
} from "../../../redux/profileSelectors";
import {PostDataType, ProfileType} from "types";
import {AppStateType} from "../../../redux/reduxStore";
import {useParams} from "react-router-dom";
import {profileAPI} from "../../../DAL/ProfileAPI";

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type RouteParams = {
    userId: string
}

let ProfileAPIContainer: React.FC<PropsType> = (props) => {

    let { userId }= useParams<RouteParams>();
    let profileId: number | null
    profileId = Number(userId);
    const prevProfileIdRef = React.useRef<number | null>(null); //Хук useRef() запоминает обект, который хранится весь жизн цикл обекта

    useEffect(() => {

        profileId = profileId ? profileId : props.authorizedUserId

        if (prevProfileIdRef.current !== profileId) { //Сравниваются предыд значение с текущим: если не изменилось, то UseEffect не происходит
            prevProfileIdRef.current = profileId;

            props.toggleIsFetching(true)
            profileAPI.getProfile(profileId as unknown as  number).then(
                data => {
                    props.setProfile(data);
                    props.toggleIsFetching(false)
                })

            let userId: number = 0
            if (props.authorizedUserId) {
                userId = props.authorizedUserId
            }

            profileAPI.getStatus(userId).then(
                data => {
                    props.setStatus(data as unknown as string)
                })
        }
    },)

    return (
        <>
            <h1>Profile</h1>

            {props.isFetching ? <Preloader/> : null}
            <Profile postData={props.postData}
                     newPostText={props.newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     isOwner={!profileId}//если нет параметра (т.е. это Я)
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}
            />
        </>
    )
}

type MapStateToPropsType = {
    postData: Array<PostDataType>,
    newPostText: string | null,
    profile: ProfileType | null,
    isFetching: boolean,
    status: string,
    authorizedUserId: number | null
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string | null) => void,
    setProfile: (profile: ProfileType) => void,
    toggleIsFetching: (isFetching: boolean) => void,
    addPost: (newPostText: string) => void,
    updateStatus: (status: string) => void,
    savePhoto: (fileName: any) => void,
    saveProfile: (profile: ProfileType) => void,
    setStatus: (status: string) => void
}

const mapStateToProps = (state: AppStateType) => {
    return {
        postData: getPostData(state),
        newPostText: getNewPostText(state),
        profile: getProfile(state),
        isFetching: getIsFetching(state),
        status: getStatus(state),
        authorizedUserId: state.auth.id
    }
}

const ProfileContainer:any =
    compose(
        connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(mapStateToProps, {
            updateNewPostText,
            setProfile,
            toggleIsFetching,
            addPost: addPostThunkCreator,
            updateStatus: updateStatusThunkCreator,
            savePhoto: savePhotoThunkCreator,
            saveProfile: saveProfileThunkCreator,
            setStatus
        }),
        withRouter,
        withAuthRedirect)
    (ProfileAPIContainer)

export default ProfileContainer;
