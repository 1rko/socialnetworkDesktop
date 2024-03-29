import React from 'react';
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Posts from "./Posts/Posts";
import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";
import MyProfileInfoWithHooks from "./MyProfileInfo/MyProfileInfoWithHooks";
import {PostDataType, ProfileType} from "types";

type PropsType = {
    postData: Array<PostDataType>
    newPostText: string | null
    status: string
    isOwner: boolean
    profile: ProfileType | null

    addPost: (newPostText: string) => void
    updateNewPostText: (text: string) => void
    updateStatus: (newPostText: string) => void
    savePhoto: (fileName: any) => void
    saveProfile: (profile: ProfileType) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <>
            <div>
                ------Мой профиль-----
                <MyProfileInfo status={props.status} updateStatus={props.updateStatus} img={''}/>
                ----------------------
                <MyProfileInfoWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>

            <div>
                <ProfileInfo profile={props.profile}
                             isOwner={props.isOwner}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}
                />

                <Posts postData={props.postData}
                    //newPostText={props.newPostText}
                       addPost={props.addPost}
                       updateNewPostText={props.updateNewPostText}/>
            </div>
        </>
    );
}

export default Profile;
