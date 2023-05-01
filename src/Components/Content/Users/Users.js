import React from 'react';
import styles from './Users.module.css'
import Paginator from '../../../Common/Controls/Paginator/Paginator';
import User from './User/User';

const Users = (props) => {

    const allUsers = props.usersData.map(usersItem => {
        return <User id={usersItem.id}
            photos={usersItem.photos}
            name={usersItem.name}
            status={usersItem.status}
            followed={usersItem.followed}
            followingInProgress={props.followingInProgress}
            onUnfollowButtonClick={props.onUnfollowButtonClick}
            onFollowButtonClick={props.onFollowButtonClick} />
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
