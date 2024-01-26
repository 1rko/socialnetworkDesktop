import React from 'react'
import styles from './Users.module.css'
import Paginator from '../../../Common/Controls/Paginator/Paginator'
import User from './User/User'
import {UsersDataType} from 'types'
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../../redux/usersReducer";
//import {Formik, Form, Field, FormikHelpers} from "formik" import {UsersSearchForm} from "./UsersSearchForm";

type PropsType = {
    currentPage: number
    totalCount: number
    usersCount: number //pageSize
    usersData: Array<UsersDataType>
    followingInProgress: Array<number>
    onUnfollowButtonClick: (id: number) => void
    onFollowButtonClick: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
    onPageChanged: (pageNumber: number) => void
}

const Users: React.FC<PropsType> = (props) => {

    const allUsers = props.usersData.map(usersItem => {
        return <User key={usersItem.id}
                     id={usersItem.id}
                     photos={usersItem.photos}
                     name={usersItem.name}
                     status={usersItem.status}
                     followed={usersItem.followed}
                     followingInProgress={props.followingInProgress}
                     onUnfollowButtonClick={props.onUnfollowButtonClick}
                     onFollowButtonClick={props.onFollowButtonClick}/>
    })

    return (
        <div className={styles.users_wrapper}>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            <Paginator totalCount={props.totalCount}
                       usersCount={props.usersCount}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
            />

            {allUsers}
        </div>
    )
}

export default Users;
