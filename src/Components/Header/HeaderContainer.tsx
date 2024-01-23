import './Header.module.css';
import React from 'react';
import Header from './Header';
import {
    //getAuthUserDataThunkCreator,
    logoutThunkCreator,
    //setAuthUserData,
    //userIsAuthorised
} from '../../redux/authReducer'
import {connect} from "react-redux"
import {AppStateType} from "./../../redux/reduxStore";
import {SetAuthUserDataPayloadType} from "types";

type MapStateToPropsType={
    auth:SetAuthUserDataPayloadType
}

type MapDispatchToPropsType={
    logout: ()=> void
}

type PropsType= MapStateToPropsType&MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType, AppStateType> {
   /* componentDidMount() {
        this.props.getAuthUserData()
    }*/

    render() {

        // @ts-ignore
        return <Header auth={this.props.auth} logout={this.props.logout}/>
    }
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(mapStateToProps,
    {
         logout: logoutThunkCreator
    })
(HeaderContainer)