import React, { useState } from 'react';
import styles from './MyProfileInfo.module.css'

const MyProfileInfoWithHooks = (props) => {

    let [status, setStatus] = useState(props.status)
    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onChangeInput = (e) => {
        let newStatus = e.target.value
        setStatus(newStatus);
    }
    /*

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({localStatus: this.props.status})
        }
    }
    }*/

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
