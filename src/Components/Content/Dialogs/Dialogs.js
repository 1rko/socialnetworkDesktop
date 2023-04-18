import React from 'react';
import styles from './Dialogs.module.css'
import { Navigate, NavLink } from "react-router-dom";
import store from '../../../redux/reduxStore';
import { Formik, Form, Field, ErrorMessage } from "formik";
import MyTextArea from '../../../Common/Controls/MyTextArea/MyTextArea';


const Dialogs = ({ messages, ...props }) => {
    const dialogsArray = props.dialogsData.map(dialogItem => {
        return (
            <div className={styles.item}>
                <NavLink to={"/dialogs/" + dialogItem.id}
                    className={navData => navData.isActive ? (styles.active) : styles.unactive}>
                    {dialogItem.name}
                </NavLink>
            </div>
        )
    })

    const messagesArray = messages.map(messageItem => {
        return (
            <div className={styles.messageItem}>
                {messageItem.message}
            </div>
        )
    })

    let onAddMessage = (newMessageText) => {
        props.addMessage(newMessageText)
    }

    let onMessageChange = (e) => {
        let text = e.target.value
        props.messageChange(text);
    }

    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_items}>
                {dialogsArray}
            </div>

            <div className={styles.messages}>
                {messagesArray}

                <div>

                    <AddMessageForm funcAddMessage={onAddMessage} />

                </div>
            </div>
        </div>
    );
}

const AddMessageForm = (props) => (
    <div>
        <Formik
            initialValues={{
                newMessage: ""
            }}
            validate={values => {
                const errors = {};
                if (!values.newMessage) {
                    errors.newMessage = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    props.funcAddMessage(values.newMessage);
                    console.log(store.getState().dialogsPage.messages)
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field name="newMessage" component={MyTextArea} placeholder="Enter new message text" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Dialogs;
