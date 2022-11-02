import React from 'react';
import styles from './Profile.module.css'
import PostItem from "./PostItem/PostItem";



const Profile = (props ) => {
    const postText = props.postData.map(postItem => {
        return <PostItem likesCount={postItem.likesCount} postText={postItem.postText}/>
    })

    return (

        <div className={styles.profile_wrapper}>
            <img className={styles.profileImg} src="https://thumbs.dreamstime.com/b/drops-floral-
      background-closeup-tranquil-abstract-closeup-art-photography-print-wallpaper-floral-
      fantasy-design-macro-photo-96994455.jpg" alt="profileImg"/>

            {postText}

        </div>


    );
}

export default Profile;
