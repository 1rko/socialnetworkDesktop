import React from 'react';
import styles from './Content.module.css'
import {Routes, Route} from 'react-router-dom'
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import Profile from "./Profile/Profile";



const Content = (props) => {
    return (
        <div className={styles.content_wrapper}>
            <Routes>
                <Route path="/dialogs/*" element={<Dialogs/>}/>
                <Route path="/messages/*" element={<Messages/>}/>
                <Route path="/profile/*" element={<Profile postData={props.postData}/>}/>
            </Routes>
        </div>
    );
}

export default Content;
