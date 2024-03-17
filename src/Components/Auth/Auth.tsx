import React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "./../../Types/hooks";
import {logoutThunkCreator} from "../../redux/authReducer";
import {Button, Col, Row} from 'antd';
import {AppStateType} from "../../redux/reduxStore";

type PropsType = {
    //auth: SetAuthUserDataPayloadType,
    //logout: () => void
}

const Auth: React.FC<PropsType> = (props) => {

    const auth = useAppSelector((state: AppStateType) => state.auth)

    const dispatch = useAppDispatch()

    const logoutCallback = () => {
        dispatch(logoutThunkCreator())
    }

    return (
        <>
            {auth.isAuthorised ? (
                    <>
                        <Row>
                            <Col span={16}>
                                <div> ID: {auth.id} Login: {auth.login}</div>
                            </Col>
                            <Col span={8}>
                                <Button onClick={logoutCallback}>Logout</Button>
                            </Col>
                        </Row>
                    </>) :
                <Row>
                    <Col span={24}>
                        <Button onClick={logoutCallback}><Link to="/login"> Login </Link></Button>
                    </Col>
                </Row>
            }
        </>
    );
}

export default Auth;
