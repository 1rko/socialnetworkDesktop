import React from 'react';
import styles from './Auth.module.css'
import { NavLink } from 'react-router-dom';

const Auth = (props) => {
  return (
    <div className={styles.loginText_wrapper}>
      <NavLink to="/login"> Login </NavLink>
    </div>
  );
}

export default Auth;
