import React from 'react';
import styles from './MyProfileInfo.module.css'

class MyProfileInfo extends React.Component {
    state = {
        status: 'Это мой статус',
        editMode: false
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = () => {
        this.setState({editMode: false})
    }

    render() {
        return <div className={styles.MyProfileInfo}>
            {((!this.state.editMode) && <span onDoubleClick={this.activateEditMode}>{this.state.status}</span>)}
            {((this.state.editMode) && <input autoFocus={true}
                                              onBlur={this.deActivateEditMode}
                                              value={this.state.status}/>)}
        </div>


    }
}

export default MyProfileInfo;
