import React, {useState} from 'react';
import styles from './ProfileInfo.module.css'
import defaultImgSrc from './../../../../Common/Img/AvaForAll.png'
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    let profileData = props.profile
    let profileItem = null

    if (profileData) {

        const onMainPhotoSelected = (e) => {
            if (e.target.files.length) {
                props.savePhoto(e.target.files[0])
            }
        }

        profileItem = <div className={styles.profileItemWrapper}>
            <img className={styles.avaImg} src={profileData.photos.large || defaultImgSrc} alt="avaImg"/>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            {editMode ? <ProfileDataForm profile={profileData} saveProfile={props.saveProfile}
                                         finishEditMode={() => setEditMode(false)}/> :
                <ProfileData profile={profileData}
                             isOwner={props.isOwner}
                             goToEditMode={() => setEditMode(true)}
                />}
        </div>
    } else profileItem = <div>Профиль не загружен</div>

    return (<div className={styles.profileinfo_wrapper}>

        {profileItem}

    </div>);
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name: </b>{profile.fullName}
        </div>
        <div>
            <b>userId: </b>{profile.userId}
        </div>
        <div>
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div>
            <b>lookingForAJob: </b>{profile.lookingForAJob}
        </div>
        <div>
            <b>My professional skills: </b>{profile.lookingForAJobDescription}
        </div>
        <div>
            <b>Contacts: </b>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={styles.contacts}> {key} : {profile.contacts[key]} </div>
            })}
        </div>
    </>
}

export default ProfileInfo;
