import React from 'react';
import styles from './Auth.module.css'
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "./../../Types/hooks";
import {logoutThunkCreator} from "../../redux/authReducer";
import {Button} from 'antd';
import {Col, Row} from 'antd';
import {selectAuthUserDataPayloadType} from "../../redux/authSelectors";

type PropsType = {
    //auth: SetAuthUserDataPayloadType,
    //logout: () => void
}

const Auth: React.FC<PropsType> = (props) => {

    const auth = useAppSelector(selectAuthUserDataPayloadType)

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
