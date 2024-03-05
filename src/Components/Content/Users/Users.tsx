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
import {useAppDispatch, useAppSelector} from "../../../Types/hooks";

const Users: React.FC = () => {
    const usersData = useAppSelector(getUsersDataSuperSelector)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const currentPage = useAppSelector(getCurrentPage)
    const totalCount = useAppSelector(getTotalCount)
    const usersCount = useAppSelector(getUsersCount)
    const filter = useAppSelector(getFilter)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, usersCount, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangedThunkCreator(pageNumber, usersCount, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
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
