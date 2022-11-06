import React from 'react';
import styles from './Friends.module.css'
import {NavLink} from "react-router-dom";

const Friends = () => {
    return (
        <div className={styles.friendsBar_wrapper}>
            <div className={styles.friendsBar_header}>Friends</div>
            <div className={styles.friendsBar_allItems}>
                <div className={styles.friendsBar_item}>
                    <NavLink to="AAA" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        AAA
                    </NavLink>
                </div>

                <div className={styles.friendsBar_item}>
                    <NavLink to="BBB" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        BBB
                    </NavLink>
                </div>

                <div className={styles.friendsBar_item}>
                    <NavLink to="CCC" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        CCC
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Friends;
