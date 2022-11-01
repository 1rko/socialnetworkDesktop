import React from 'react';
import styles from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = () => {
    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_items}>
                <div className={styles.item}>
                    <NavLink to="/dialogs/1" className={navData => navData.isActive ? (styles.active) : styles.unactive}>
                        Ivan
                    </NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to="/dialogs/2" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        Peter
                    </NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to="/dialogs/3" className={navData => navData.isActive ? styles.active : styles.unactive}>
                        Irina
                    </NavLink>

                </div>
            </div>

            <div className={styles.messages}>
                <div className={styles.message}>
                    Hello
                </div>

                <div className={styles.message}>
                    How are you?
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
