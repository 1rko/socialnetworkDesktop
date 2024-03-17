import React, {lazy} from 'react';
import styles from './Content.module.css'
import {Route, Routes} from 'react-router-dom'
import ProfileContainer from "./Profile/ProfileContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import {User} from './Users/UsersContainer';
import {Login} from "../Login/Login";
import {withSuspense} from "../../HOC/withSuspense";
import AntLayout from '../AntLayout';

const Messages = lazy(() => import('./Messages/Messages'));
const SuspendedMessages = withSuspense(Messages)    //создаем компонент, который потом отрисуем в компоненте Content

type PropsType = {

}

const Content = (props: PropsType) => {
    return (
        <div className={styles.content_wrapper}>
            <Routes>
                <Route path="/dialogs/*" element={<DialogsContainer
                    /*store={props.store}*//>}/>
                <Route path="/messages/*" element={<SuspendedMessages/>}/>
                <Route path="/profile/">
                    <Route path=":userId" element={<ProfileContainer /*store={props.store}*//>}/>
                    <Route path="" element={<ProfileContainer /*store={props.store}*//>}/>
                </Route>
                <Route path="/users/" element={<User title="Все пользователи"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/antLayout" element={<AntLayout/>}
                />
            </Routes>
        </div>
    )
        ;
}

export default Content;
