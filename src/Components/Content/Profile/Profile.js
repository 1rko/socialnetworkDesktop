import React from 'react';
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Posts from "./Posts/Posts";
import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";
import MyProfileInfoWithHooks from "./MyProfileInfo/MyProfileInfoWithHooks";


const Profile = (props) => {
    return (
        <>
            <div>
                ------Мой профиль-----
                <MyProfileInfo status={props.status} updateStatus={props.updateStatus} img={''}/>
                ----------------------
                <MyProfileInfoWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>

            <div className={styles.profile_wrapper}>
                <ProfileInfo profile={props.profile}
                             isOwner={props.isOwner}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}
                />

                <Posts postData={props.postData}
                       newPostText={props.newPostText}
                       addPost={props.addPost}
                       updateNewPostText={props.updateNewPostText}/>
            </div>
        </>
    );
}

export default Profile;
