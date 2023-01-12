import React from 'react';
import styles from './Content.module.css'
import {Routes, Route} from 'react-router-dom'
import Messages from "./Messages/Messages";
import ProfileContainer from "./Profile/ProfileContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
//import Users from './Users/Users';
import UsersContainer from './Users/UsersContainer';

const Content = (props) => {
    return (
        <div className={styles.content_wrapper}>
            <Routes>
                <Route path="/dialogs/*" element={<DialogsContainer
                    store={props.store}/>}/>
                <Route path="/messages/*" element={<Messages/>}/>
                <Route path="/profile/">
                    <Route path=":userId" element={<ProfileContainer store={props.store}/>}/>
                    <Route path="" element={<ProfileContainer store={props.store}/>}/>
                </Route>
                <Route path="/users/*" element={<UsersContainer
                    store={props.store}/>}/>
            </Routes>
        </div>
    )
        ;
}

export default Content;
