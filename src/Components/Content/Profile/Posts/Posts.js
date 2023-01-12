import React from 'react';
import styles from './Posts.module.css'
import PostItem from "../PostItem/PostItem";

const Posts = (props) => {

    const postText = props.postData.map(postItem => {
        return <PostItem likesCount={postItem.likesCount} postText={postItem.postText}/>
    })

    let newPostElement = React.createRef();

    let onAddPost = () => {
        let newPostText = props.newPostText;
        props.addPost(newPostText)
        props.updateNewPostText('')
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (

        <div className={styles.profile_wrapper}>

            <textarea
                className={styles.dialogsMessage}
                ref={newPostElement}
                onChange={onPostChange}
                value={props.newPostText}
                placeholder='Enter new post text'/>
            <button className={styles.buttonNewDialogsMessage} onClick={onAddPost}>Добавить новый пост через
                CAllBack из state
            </button>
            {postText}
        </div>
    );
}

export default Posts;
