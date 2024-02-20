import React from 'react';
import styles from './Profile.module.css'
import {ContactsType, ProfileType} from "types";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: PropsType) => {
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
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}  />
            })}
        </div>
    </>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) =>{
    return <div className={styles.contact}> <b>{contactTitle}</b> : {contactValue} </div>
}

export default ProfileData;
