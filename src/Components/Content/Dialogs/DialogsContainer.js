import React from 'react';
import styles from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {addMessageCreator, updateNewMessageCreator} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState()
    let addMessage = (newMessageText) => {
        //let newMessageText = props.dialogsPage.newMessageText;
        props.store.dispatch(addMessageCreator(newMessageText));
        props.store.dispatch(updateNewMessageCreator(''))
    }

    let messageChange = (text) => {
        props.store.dispatch(updateNewMessageCreator(text))
    }

    return (
        <Dialogs
            dialogsData={state.dialogsPage.dialogsData}
            messages={state.dialogsPage.messages}
            newMessageText={state.dialogsPage.newMessageText}
            addMessage={addMessage}
            messageChange={messageChange}
        />
    );
}

export default DialogsContainer;
