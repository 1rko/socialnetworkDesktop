import './Header.module.css';
import React from 'react';
import styles from './Header.module.css'
import Header from './Header';
import {
    getAuthUserDataThunkCreator,
    logoutThunkCreator,
    setAuthUserData,
    userIsAuthorised
} from '../../redux/authReducer'
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
   /* componentDidMount() {
        this.props.getAuthUserData()
    }*/

    render() {
        return <Header auth={this.props.auth} logout={this.props.logout}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps,
    {
        setAuthUserData, userIsAuthorised, logout: logoutThunkCreator
    })
(HeaderContainer)