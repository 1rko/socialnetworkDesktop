import React from 'react';
import styles from './Content.module.css'
import {Routes, Route} from 'react-router-dom'
//import Messages from "./Messages/Messages";
import ProfileContainer from "./Profile/ProfileContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import UsersContainer from './Users/UsersContainer';
import LoginPage from "../Login/Login";
import {lazy} from 'react';
import {withSuspense} from "../../HOC/withSuspense";

const Messages = lazy(() => import('./Messages/Messages'));

const Content = (props) => {
    return (
        <div className={styles.content_wrapper}>
            <Routes>
                <Route path="/dialogs/*" element={<DialogsContainer
                    store={props.store}/>}/>
                <Route path="/messages/*" element={withSuspense(Messages)()}/>
                <Route path="/profile/">
                    <Route path=":userId" element={<ProfileContainer store={props.store}/>}/>
                    <Route path="" element={<ProfileContainer store={props.store}/>}/>
                </Route>
                <Route path="/users/*" element={<UsersContainer
                    store={props.store}/>}/>
                <Route path="/login" element={<LoginPage/>}
                />

            </Routes>
        </div>
    )
        ;
}

export default Content;
