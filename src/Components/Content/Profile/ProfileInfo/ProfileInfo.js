import React from 'react';
import styles from './ProfileInfo.module.css'

const ProfileInfo = (props) => {

    let profileData = props.profile
    let profileItem = null

    if (profileData) {
        let profileContactsArray = []

        for (let key in profileData.contacts) {
            if (profileData.contacts[key]) profileContactsArray.push(<div
                className={styles.contact}>{key} : {profileData.contacts[key]}</div>)
        }

        profileItem = <div className={styles.profileItemWrapper}>
            <img className={styles.avaImg} src={profileData.photos.small} alt="avaImg"/>
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
