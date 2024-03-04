import React from 'react'
import Users from "./Users";
import {useSelector} from "react-redux";
import Preloader from "../../Preloader/Preloader";
import {getIsFetching} from "../../../redux/usersSelectors";

type UserPropsType = {
    title: string
}

export const UserP: React.FC<UserPropsType>= (props) => {
    const isFetching = useSelector(getIsFetching)

    return (<>
            {props.title && <h1>{props.title}</h1>}
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    )
}
