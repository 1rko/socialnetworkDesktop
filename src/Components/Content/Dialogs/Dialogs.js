import React from 'react';
import styles from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    const dialogsArray = props.dialogs.map(dialogItem => {
        return (
            <div className={styles.item}>
                <NavLink to={"/dialogs/" + dialogItem.id}
                         className={navData => navData.isActive ? (styles.active) : styles.unactive}>
                    {dialogItem.name}
                </NavLink>
            </div>
        )
    })

    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_items}>

                {dialogsArray}

            </div>

            <div className={styles.messages}>
                <div className={styles.messages}>
                    {props.messages[0].message}
                </div>

                <div className={styles.message}>
                    How are you?
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
