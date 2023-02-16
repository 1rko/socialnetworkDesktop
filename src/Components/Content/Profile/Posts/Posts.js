import React from 'react';
import styles from './Posts.module.css'
import PostItem from "../PostItem/PostItem";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MyTextArea from '../../../../Common/Controls/TextArea';

const Posts = (props) => {

    const postText = props.postData.map(postItem => {
        return <PostItem likesCount={postItem.likesCount} postText={postItem.postText} />
    })

    let newPostElement = React.createRef();

    let onAddPost = (newPostText) => {
        props.addPost(newPostText)
        props.updateNewPostText('')
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (

        <div className={styles.profile_wrapper}>

            <PostForm funcAddPost={onAddPost} />

//Это не нужно
            <textarea
                className={styles.dialogsMessage}
                ref={newPostElement}
                onChange={onPostChange}
                value={props.newPostText}
                placeholder='Enter new post text' />
            <button className={styles.buttonNewDialogsMessage} onClick={onAddPost}>Добавить новый пост через
                CAllBack из state
            </button>
///
            {postText}
        </div>
    );
}

const PostForm = (props) => (
    <div>
        <Formik
            initialValues={{
                newPost: ""
            }}
            validate={values => {
                const errors = {};
                if (!values.newPost) {
                    errors.newPost = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    props.funcAddPost(values.newPost);
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field name="newPost" component={MyTextArea} placeholder="Enter new post text" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Posts;
