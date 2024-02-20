import React from 'react';
import styles from './Posts.module.css'
import PostItem from "../PostItem/PostItem";
import { Formik, Form, Field, FormikHelpers, FormikErrors } from "formik";
import MyTextArea from '../../../../Common/Controls/MyTextArea/MyTextArea';
import {PostDataType} from "types";

type PropsType = {
    postData: Array<PostDataType>

    addPost: (newPostText: string) => void
    updateNewPostText: (text: string) => void
}

const Posts = (props: PropsType) => {

    const postText = [...props.postData].reverse().map(postItem => {
        return <PostItem key={postItem.id} likesCount={postItem.likesCount} postText={postItem.postText} />
    })

    //let newPostElement = React.createRef();

    let onAddPost = (newPostText:string) => {
        props.addPost(newPostText)
        props.updateNewPostText('')
    }

    /*let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }*/

    return (

        <div className={styles.profile_wrapper}>

            <PostForm funcAddPost={onAddPost} />

            {postText}
        </div>
    );
}

const MyPostsMemorized = React.memo(Posts)

type FormPropsType = {
    funcAddPost: (newPost:string) => void
}

type ValuesType = {
    newPost: string
}

const PostForm = (props:FormPropsType) => (
    <div>
        <Formik
            initialValues={{
                newPost: ""
            }}
            validate={values => {
                const errors: FormikErrors<ValuesType> = {};
                if (!values.newPost) {
                    errors.newPost = 'Required';
                }
                return errors;
            }}
            onSubmit={(values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) => {
                    props.funcAddPost(values.newPost);
                    setSubmitting(false) ;
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

export default MyPostsMemorized;
