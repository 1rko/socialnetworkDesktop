import React from 'react';
import {addMessageCreator, updateNewMessageCreator} from "../../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../../StoreContext"


const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState()
                let addMessage = (newMessageText) => {
                    store.dispatch(addMessageCreator(newMessageText));
                    store.dispatch(updateNewMessageCreator(''))
                }

                let messageChange = (text) => {
                    store.dispatch(updateNewMessageCreator(text))
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
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;
