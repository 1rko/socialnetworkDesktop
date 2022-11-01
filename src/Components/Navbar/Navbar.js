import './Navbar.module.css';
import React from 'react';
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={styles.navbar_wrapper}>
            <div  className={styles.item}>
                <NavLink to="dialogs" className={navData=>navData.isActive? styles.active: styles.unactive}>
                    Dialogs
                </NavLink>
            </div>

            <div className={styles.item}>
                <NavLink to="messages" className={navData=>navData.isActive? styles.active: styles.unactive}>
                    Messages
                </NavLink>
            </div>

            <div className={styles.item}>
                <NavLink to="profile" className={navData=>navData.isActive? styles.active: styles.unactive}>
                    Profile
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
