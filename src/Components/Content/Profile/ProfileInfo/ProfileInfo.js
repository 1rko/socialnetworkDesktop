import React from 'react';
import styles from './ProfileInfo.module.css'
import defaultImgSrc from './../../../../Common/Img/AvaForAll.png'

const ProfileInfo = (props) => {

    let profileData = props.profile
    let profileItem = null

    if (profileData) {
        let profileContactsArray = []

        for (let key in profileData.contacts) {
            if (profileData.contacts[key]) profileContactsArray.push(<div
                className={styles.contact}>{key} : {profileData.contacts[key]}</div>)
        }

        const onMainPhotoSelected = (e) =>{
            if (e.target.files.length) {
                props.savePhoto(e.target.files[0])
            }
        }

        profileItem = <div className={styles.profileItemWrapper}>
            <img className={styles.avaImg} src={profileData.photos.large || defaultImgSrc} alt="avaImg" />
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            <div>{profileData.fullName}</div>
            <div>{profileData.userId}</div>
            <div>{profileData.aboutMe}</div>
            {profileContactsArray}
        </div>
    } else profileItem = <div>Профиль не загружен</div>

    return (<div className={styles.profileinfo_wrapper}>

        {profileItem}

    </div>);
}

export default ProfileInfo;
