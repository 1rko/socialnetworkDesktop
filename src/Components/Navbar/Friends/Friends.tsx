import React from 'react';
import styles from './Friends.module.css'
import { NavLink } from "react-router-dom";

const Friends: React.FC = () => {
    return (
        <div className={styles.friendsBar_wrapper}>
            <div className={styles.friendsBar_header}>Friends</div>
            <div className={styles.friendsBar_allItems}>
                <div className={styles.friendsBar_item}>
                    <NavLink to="AAA" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        Ivan
                    </NavLink>
                </div>

                <div className={styles.friendsBar_item}>
                    <NavLink to="BBB" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        Fedor
                    </NavLink>
                </div>

                <div className={styles.friendsBar_item}>
                    <NavLink to="CCC" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        Alexandra Ivanova
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Friends;
