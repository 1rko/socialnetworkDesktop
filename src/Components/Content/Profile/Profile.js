import React from 'react';
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Posts from "./Posts/Posts";
import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";

const Profile = (props) => {

    return (
        <>
            <div>
                ------Мой профиль-----
                <MyProfileInfo status={props.status} updateStatus={props.updateStatus}/>
                ----------------------
            </div>

            <div className={styles.profile_wrapper}>

                {/*   <img className={styles.profileImg} src="https://thumbs.dreamstime.com/b/drops-floral-
      background-closeup-tranquil-abstract-closeup-art-photography-print-wallpaper-floral-
      fantasy-design-macro-photo-96994455.jpg" alt="profileImg"/>*/}


                <ProfileInfo profile={props.profile}/>

                <Posts postData={props.postData}
                       newPostText={props.newPostText}
                       addPost={props.addPost}
                       updateNewPostText={props.updateNewPostText}/>
            </div>
        </>
    );
}

export default Profile;
