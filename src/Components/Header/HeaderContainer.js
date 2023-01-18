import './Header.module.css';
import React from 'react';
import styles from './Header.module.css'
import Header from './Header';
import axios from 'axios';
import { setAuthUserData } from '../../redux/authReducer'
import { connect } from "react-redux";
import store from '../../redux/reduxStore'

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true }).
      then(response => {
        let { id, login, email } = response.data.data;
        this.props.setAuthUserData(id, login, email);
        console.log(store.getState())
      }
      )
  }

  render() {
    return <Header />
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer)