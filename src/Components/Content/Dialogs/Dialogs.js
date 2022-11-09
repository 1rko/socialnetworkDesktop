import React from 'react';
import styles from './Dialogs.module.css'
import { NavLink } from "react-router-dom";

const Dialogs = (props) => {
    const dialogsArray = props.dialogs.map(dialogItem => {
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

    let newPostElement = React.createRef();
    let addNewPost = () => {
        let text = newPostElement.current?.value;
        alert(text);
    }

    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_items}>

                {dialogsArray}

                <textarea className={styles.dialogsMessage} ref={newPostElement}></textarea>
                <button className={styles.buttonNewDialogsMessage} onClick={addNewPost}>Добавить новое сообщение</button>

            </div>

            <div className={styles.messages}>

                {messagesArray}

            </div>
        </div>
    );
}

export default Dialogs;
