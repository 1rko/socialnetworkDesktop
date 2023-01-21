import './Header.module.css';
import React from 'react';
import styles from './Header.module.css'
import Header from './Header';
import axios from 'axios';
import {setAuthUserData, userIsAuthorised} from '../../redux/authReducer'
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
            /*headers:{
                "API-KEY":"0a4e82f0-3a0f-4f07-bd13-4f0796adfac4"}*/
        }).then(response => {
                let {id, login, email} = response.data.data;
                this.props.setAuthUserData(id, login, email);
                this.props.userIsAuthorised(true)
            }
        )
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

export default connect(mapStateToProps, {setAuthUserData, userIsAuthorised})(HeaderContainer)