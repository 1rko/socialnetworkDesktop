import React from 'react'
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/reduxStore";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuthorised
    }
}

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectedComponent: React.FC<MapStateToPropsForRedirectType> = (props) => {
        let {isAuth, ...restProps} = props                  //удаляем isAuth из props - остаются restProps

        if (!isAuth) return <Navigate to={'/login'}/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<MapStateToPropsForRedirectType, {}, WCP, AppStateType>
    (mapStateToPropsForRedirect)
    (RedirectedComponent)

    return ConnectedAuthRedirectComponent

}

export default withAuthRedirect