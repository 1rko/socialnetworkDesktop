import React, {useEffect} from 'react'
import styles from './Users.module.css'
import Paginator from '../../../Common/Controls/Paginator/Paginator'
import User from './User/User'
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, getUsersThunkCreator, onPageChangedThunkCreator} from "../../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getTotalCount,
    getUsersCount,
    getUsersDataSuperSelector
} from "../../../redux/usersSelectors";

const Users: React.FC = () => {
    const usersData = useSelector(getUsersDataSuperSelector)
    const followingInProgress = useSelector(getFollowingInProgress)
    const currentPage = useSelector(getCurrentPage)
    const totalCount = useSelector(getTotalCount)
    const usersCount = useSelector(getUsersCount)
    const filter = useSelector(getFilter)

    const dispatch = useDispatch

    useEffect(() =>{
        // @ts-ignore
        dispatch(getUsersThunkCreator(currentPage, usersCount, filter))
    },[])

    const onPageChanged = (pageNumber: number) => {
        // @ts-ignore
        dispatch(onPageChangedThunkCreator(pageNumber, usersCount, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        // @ts-ignore
        dispatch(getUsersThunkCreator(1, usersCount, filter))
    }

    const allUsers = usersData.map(usersItem => {
        return <User key={usersItem.id}
                     id={usersItem.id}
                     photos={usersItem.photos}
                     name={usersItem.name}
                     status={usersItem.status}
                     followed={usersItem.followed}
                     followingInProgress={followingInProgress}
                     //onFollowButtonClick={props.onFollowButtonClick}
                     //onUnfollowButtonClick={props.onUnfollowButtonClick}
        />
    })

    return (
        <div className={styles.users_wrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalCount={totalCount}
                       usersCount={usersCount}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />

            {allUsers}
        </div>
    )
}

export default Users;
