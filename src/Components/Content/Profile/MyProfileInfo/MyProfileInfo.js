import React from 'react';
import styles from './MyProfileInfo.module.css'
import store from "../../../../redux/reduxStore";

class MyProfileInfo extends React.Component {
    state = {
        localStatus: this.props.status,
        editMode: false
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.localStatus)
    }

    onChangeInput = (e) => {
        let newStatus = e.target.value
        this.setState({localStatus: newStatus});
    }

    render() {
        return <div className={styles.MyProfileInfo}>
            {((!this.state.editMode) && <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>)}
            {((this.state.editMode) && <input autoFocus={true}
                                              onBlur={this.deActivateEditMode}
                                              value={this.state.localStatus}
                                              onChange={this.onChangeInput}/>)}
        </div>


    }
}

export default MyProfileInfo;
