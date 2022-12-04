import React from 'react';
import styles from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {addMessageCreator, updateNewMessageCreator} from "../../../redux/dialogsReducer";

const Dialogs = (props) => {
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

    const messagesArray = props.messages.map(messageItem => {
        return (
            <div className={styles.messageItem}>
                {messageItem.message}
            </div>
        )
    })

    let onAddMessage = () => {
        let newMessageText = props.newMessageText;
        props.addMessage(newMessageText)
        /*props.dispatch(addMessageCreator(newMessageText));
        props.dispatch(updateNewMessageCreator(''))*/
    }

    let onMessageChange = (e) => {
        let text = e.target.value
        //props.dispatch(updateNewMessageCreator(text))
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
                <textarea
                    className={styles.dialogsMessage}
                    onChange={onMessageChange}
                    value={props.newMessageText}
                    placeholder='Enter New Message'/>
                    <button className={styles.buttonNewDialogsMessage} onClick={onAddMessage}>Добавить новое сообщение
                        через
                        CAllBack из state
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
