import React, {lazy} from 'react';
import styles from './Content.module.css'
import {Route, Routes} from 'react-router-dom'
import ProfileContainer from "./Profile/ProfileContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import {UserP} from './Users/UsersContainer';
import LoginPage from "../Login/Login";
import {withSuspense} from "../../HOC/withSuspense";

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
                <Route path="/users/*" element={<UserP title="Все пользователи"/>}/>
                <Route path="/login" element={<LoginPage/>}
                />
            </Routes>
        </div>
    )
        ;
}

export default Content;
