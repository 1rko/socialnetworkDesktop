import {
    actions,
    addPostThunkCreator,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
    updateStatusThunkCreator
} from "../../../redux/profileReducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import Preloader from "../../Preloader/Preloader";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../../HOC/withRouter";
import {getIsFetching, getNewPostText, getPostData, getProfile, getStatus} from "../../../redux/profileSelectors";
import {PostDataType, ProfileType} from "types";
import {AppStateType} from "../../../redux/reduxStore";
import {useParams} from "react-router-dom";
import {profileAPI} from "../../../DAL/ProfileAPI";
import {useAppDispatch, useAppSelector} from "./../../../Types/hooks";

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type RouteParams = {
    userId: string
}

let ProfileAPIContainer: React.FC<PropsType> = (props) => {

    const postData = useAppSelector(getPostData)
    const newPostText = useAppSelector(getNewPostText)
    const profile = useAppSelector(getProfile)
    const isFetching = useAppSelector(getIsFetching)
    const status = useAppSelector(getStatus)
    const authorizedUserId = useAppSelector((state:AppStateType) => state.auth.id)

    const dispatch=useAppDispatch()

    let {userId} = useParams<RouteParams>();
    let profileId: number | null
    profileId = Number(userId);
    const prevProfileIdRef = React.useRef<number | null>(null); //Хук useRef() запоминает обект, который хранится весь жизн цикл обекта

    useEffect(() => {

        profileId = profileId ? profileId : authorizedUserId

        if (prevProfileIdRef.current !== profileId) { //Сравниваются предыд значение с текущим: если не изменилось, то UseEffect не происходит
            prevProfileIdRef.current = profileId;

            dispatch(actions.toggleIsFetching(true))
            profileAPI.getProfile(profileId as unknown as number).then(
                data => {
                    dispatch(actions.setProfile(data));
                    dispatch(actions.toggleIsFetching(false))
                })

            let userId: number = 0
            if (authorizedUserId) {
                userId = authorizedUserId
            }

            profileAPI.getStatus(userId).then(
                data => {
                    dispatch(actions.setStatus(data as unknown as string))
                })
        }
    },)

    return (
        <>
            <h1>Profile</h1>

            {isFetching ? <Preloader/> : null}
            <Profile postData={postData}
                     newPostText={newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     isOwner={!profileId||(profileId===authorizedUserId)}//если нет параметра или это мой Id (т.е. это Я)
                     profile={profile}
                     status={status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}
            />
        </>
    )
}

type MapStateToPropsType = {
    /*postData: Array<PostDataType>,
    newPostText: string | null,
    profile: ProfileType | null,
    isFetching: boolean,
    status: string,
    authorizedUserId: number | null*/
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void,
    //setProfile: (profile: ProfileType) => void,
    //toggleIsFetching: (isFetching: boolean) => void,
    addPost: (newPostText: string) => void,
    updateStatus: (status: string) => void,
    savePhoto: (fileName: File) => void,
    saveProfile: (profile: ProfileType) => void,
    //setStatus: (status: string) => void
}

const mapStateToProps = (state: AppStateType) => {
    return {
       /* postData: getPostData(state),
        newPostText: getNewPostText(state),
        profile: getProfile(state),
        isFetching: getIsFetching(state),
        status: getStatus(state),
        authorizedUserId: state.auth.id*/
    }
}

//Ctrl+b на ф-ции connect -смотрим описание типов дженерика <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

const ProfileContainer: any =
    compose(
        connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(mapStateToProps, {
            updateNewPostText: actions.updateNewPostText,
            //setProfile: actions.setProfile,
            //toggleIsFetching: actions.toggleIsFetching,
            addPost: addPostThunkCreator,
            updateStatus: updateStatusThunkCreator,
            savePhoto: savePhotoThunkCreator,
            saveProfile: saveProfileThunkCreator,
            //setStatus: actions.setStatus
        }),
        withRouter,
        withAuthRedirect)
    (ProfileAPIContainer)

export default ProfileContainer;
