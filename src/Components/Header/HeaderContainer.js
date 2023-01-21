import './Header.module.css';
import React from 'react';
import styles from './Header.module.css'
import Header from './Header';
import axios from 'axios';
import {setAuthUserData} from '../../redux/authReducer'
import {connect} from "react-redux";
import store from '../../redux/reduxStore'

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
          /*header:{
              "API-KEY":"0a4e82f0-3a0f-4f07-bd13-4f0796adfac4"
          }*/
        }).then(response => {
                let {id, login, email} = response.data.data;
                this.props.setAuthUserData(id, login, email);
                console.log(store.getState().auth)
            }
        )
    }

    render() {
        return <Header auth={this.props.auth}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)