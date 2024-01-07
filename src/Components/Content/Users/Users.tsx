import React from 'react';
import styles from './Users.module.css'
import Paginator from '../../../Common/Controls/Paginator/Paginator';
import User from './User/User';
import {UsersDataType} from 'types';


type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalCount: number
    usersCount: number //pageSize
    usersData: Array<UsersDataType>
    followingInProgress: Array<number>
    onUnfollowButtonClick: (id: number) => void
    onFollowButtonClick: (id: number) => void
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
