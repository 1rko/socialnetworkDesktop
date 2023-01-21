import React from 'react';
import styles from './Auth.module.css'
import { NavLink } from 'react-router-dom';

const Auth = (props) => {
    debugger
  return (
    <div className={styles.loginText_wrapper}>
      <NavLink to="/login"> Login </NavLink>
        <div style={{ color: 'blue'}}> ID: {props.auth.id} Login: {props.auth.login}</div>
        <div style={{ color: 'green'}}> Login: {props.auth.email} </div>
    </div>
  );
}

export default Auth;
