import React, {ChangeEvent, useState} from 'react';
import styles from './MyProfileInfo.module.css'

type PropsType = {
    status: string
    updateStatus: (prevStatus: string) => void
}

const MyProfileInfoWithHooks = (props: PropsType) => {

    let [status, setStatus] = useState(props.status)
    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.target.value
        setStatus(newStatus);
    }

    return <div className={styles.MyProfileInfo}>
        {((!editMode) && <span onDoubleClick={activateEditMode}>{props.status}</span>)}
        {((editMode) && <input autoFocus={true}
                               onBlur={deActivateEditMode}
                               value={status}
                               onChange={onChangeInput}
        />)}

    </div>


}

export default MyProfileInfoWithHooks;
