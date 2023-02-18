import React from 'react';
import styles from './Auth.module.css'
import {NavLink} from 'react-router-dom';

const Auth = (props) => {
    return (
        <div className={styles.loginText_wrapper}>
            {props.auth.isAuthorised ? (
                    <>
                        <div className={styles.AuthText}> ID: {props.auth.id} Login: {props.auth.login}</div>
                        <div className={styles.AuthText}> Login: {props.auth.email} </div>
                        <button onClick={props.logout}>Logout</button>
                    </>) :
                <NavLink to="/login"> Login </NavLink>
            }
        </div>
    );
}

export default Auth;
