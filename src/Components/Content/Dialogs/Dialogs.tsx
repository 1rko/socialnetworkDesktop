import React, {ChangeEvent} from 'react';
import styles from './Dialogs.module.css'
import {Navigate, NavLink} from "react-router-dom";
import store from '../../../redux/reduxStore';
import {Formik, Form, Field, ErrorMessage} from "formik";
import MyTextArea from '../../../Common/Controls/MyTextArea/MyTextArea';
import {DialogsDataType, MessageType} from "types";

type PropsType = {
    dialogsData: Array<DialogsDataType>
    messages: Array<MessageType>
    newMessageText: string
    isAuth: boolean

    addMessage: (newMessageText: string) => void
    //messageChange:(newMessageText: string) => void
}

const Dialogs = ({messages, ...props}: PropsType) => {
    const dialogsArray = props.dialogsData.map(dialogItem => {
        return (
            <div key={dialogItem.id} className={styles.item}>
                <NavLink to={"/dialogs/" + dialogItem.id}
                         className={navData => navData.isActive ? (styles.active) : styles.unactive}>
                    {dialogItem.name}
                </NavLink>
            </div>
        )
    })

    const messagesArray = messages.map(messageItem => {
        return (
            <div key={messageItem.id} className={styles.messageItem}>
                {messageItem.message}
            </div>
        )
    })

    let onAddMessage = (newMessageText: string) => {
        props.addMessage(newMessageText)
    }

    /*let onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value
        props.messageChange(text);
    }*/

    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_items}>
                {dialogsArray}
            </div>

            <div className={styles.messages}>
                {messagesArray}

                <div>

                    <AddMessageForm funcAddMessage={onAddMessage}/>

                </div>
            </div>
        </div>
    );
}

type AddMessageFormPropsType = {
    funcAddMessage: (newMessageText: string) => void
}

const AddMessageForm = (props: AddMessageFormPropsType) => (
    <div>
        <Formik
            initialValues={{
                newMessage: ""
            }}
            validate={values => {
                let errors: Partial<typeof values> = {}     //Partial - возвращает обект с необязательными всеми полями
                if (!values.newMessage) {
                    errors.newMessage = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                props.funcAddMessage(values.newMessage);
                console.log(store.getState().dialogsPage.messages)
                values.newMessage=''
                setSubmitting(false);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field name="newMessage" component={MyTextArea} placeholder="Enter new message text"/>

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Dialogs;
