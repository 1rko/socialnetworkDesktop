import React from 'react';
import styles from './Content.module.css'
import { Routes, Route } from 'react-router-dom'
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import ProfileContainer from "./Profile/ProfileContainer";


const Content = (props) => {
    return (
        <div className={styles.content_wrapper}>
            <Routes>
                <Route path="/dialogs/*" element={<Dialogs
                    dialogsPage={props.contentData.dialogsPage}
                    messages={props.contentData.messages}
                    dispatch={props.dispatch}
                />
                }
                />
                <Route path="/messages/*" element={<Messages />} />
                <Route path="/profile/*" element={<ProfileContainer
                    store={props.store}
                />
                }
                />
            </Routes>
        </div>
    );
}

export default Content;
