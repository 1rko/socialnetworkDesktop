import React from 'react';
import styles from './MyProfileInfo.module.css'
import defaultImgSrc from './../../../../Common/Img/AvaForAll.png'

class MyProfileInfo extends React.Component {
    state = {
        localStatus: this.props.status,
        editMode: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({localStatus: this.props.status})
        }
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


            <div>
                <img src={this.props.img || defaultImgSrc} alt={'Моя аватарка'} className={styles.myAva}/>


            </div>
            {((!this.state.editMode) && <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>)}
            {((this.state.editMode) && <input autoFocus={true}
                                              onBlur={this.deActivateEditMode}
                                              value={this.state.localStatus}
                                              onChange={this.onChangeInput}/>)}
            {/*<button onClick={()=> this.props.updateStatus("любой статус")}>Установить любой статус Это тестовая кнопака</button>*/}
        </div>


    }
}

export default MyProfileInfo;
