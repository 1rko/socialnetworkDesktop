import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css'
import defaultImgSrc from './../../../../Common/Img/AvaForAll.png'
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "../ProfileData";
import {ProfileType} from "types";

type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    savePhoto: (fileName: any) => void,
    saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)

    let profileData = props.profile
    let profileItem = null

    if (profileData) {

        const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return                                 //проверка e.target.files на null (т.к. HTMLInputElement
            if (e.target.files.length) {                                //имеет встроенное свойство files typeof FileList | null.)
                props.savePhoto(e.target.files[0])                      //м. еще так записать if (e.target.files?.length) props.savePhoto(e.target.files[0])
            }
        }

        profileItem = <div className={styles.profileItemWrapper}>
            <img className={styles.avaImg} src={profileData.photos.large || defaultImgSrc} alt="avaImg"/>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            {editMode ? <ProfileDataForm profile={profileData} saveProfile={props.saveProfile}
                                         finishEditMode={() => setEditMode(false)}/> :
                <ProfileData profile={profileData}
                             isOwner={props.isOwner}
                             goToEditMode={() => {
                                 setEditMode(true)
                             }}
                />}
        </div>
    } else profileItem = <div>Профиль не загружен</div>

    return (<div className={styles.profileinfo_wrapper}>

        {profileItem}

    </div>);
}

export default ProfileInfo;
