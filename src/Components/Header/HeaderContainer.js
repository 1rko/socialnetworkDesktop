import './Header.module.css';
import React from 'react';
import styles from './Header.module.css'
import Header from './Header';
import {setAuthUserData, userIsAuthorised} from '../../redux/authReducer'
import {connect} from "react-redux";
import {authAPI} from "../../DAL/Dal";

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.getMe().then(data => {
                let {id, login, email} = data.data;
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