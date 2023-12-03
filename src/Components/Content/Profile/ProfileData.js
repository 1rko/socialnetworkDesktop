import React from 'react';
import styles from './Profile.module.css'

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
            <b>lookingForAJob: </b>{profile.lookingForAJob ? 'yes' : 'no'}
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

export default ProfileData;
