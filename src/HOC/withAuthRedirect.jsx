import React from 'react'
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuthorised
    }
}

const withAuthRedirect = (Component) => {
    class RedirectedComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'}/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectedComponent)
    return ConnectedAuthRedirectComponent

}

export default withAuthRedirect