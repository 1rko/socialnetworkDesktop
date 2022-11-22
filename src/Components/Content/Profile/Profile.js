import React from 'react';
import styles from './Profile.module.css'
import PostItem from "./PostItem/PostItem";


const Profile = (props) => {
    const postText = props.profilePage.postData.map(postItem => {
        return <PostItem likesCount={postItem.likesCount} postText={postItem.postText} />
    })

    let newPostElement = React.createRef();


    let addPost = () => {
        let newPostText = props.profilePage.newPostText;
        props.dispatch({
            type: 'ADD-PROFILE-POST',
            newText: newPostText
        }
        );

        props.dispatch({
            type: 'UPDATE-NEW-POST-TEXT',
            text: ''
        })

    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.dispatch({
            type: 'UPDATE-NEW-POST-TEXT',
            text: text
        })
    }

    return (

        <div className={styles.profile_wrapper}>
            <img className={styles.profileImg} src="https://thumbs.dreamstime.com/b/drops-floral-
      background-closeup-tranquil-abstract-closeup-art-photography-print-wallpaper-floral-
      fantasy-design-macro-photo-96994455.jpg" alt="profileImg" />

            <textarea
                className={styles.dialogsMessage}
                ref={newPostElement}
                onChange={onPostChange}
                value={props.profilePage.newPostText} />
            <button className={styles.buttonNewDialogsMessage} onClick={addPost}>Добавить новый пост через
                CAllBack из state
            </button>

            {postText}

        </div>


    );
}

export default Profile;
