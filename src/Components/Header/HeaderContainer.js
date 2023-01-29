import './Header.module.css';
import React from 'react';
import styles from './Header.module.css'
import Header from './Header';
import {meThunkCreator, setAuthUserData, userIsAuthorised} from '../../redux/authReducer'
import {connect} from "react-redux";
import {authAPI} from "../../DAL/Dal";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.me()
    }

    render() {
        return <Header auth={this.props.auth}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {setAuthUserData, userIsAuthorised, me: meThunkCreator})(HeaderContainer)