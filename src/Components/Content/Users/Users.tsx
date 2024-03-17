import React, {useEffect} from 'react'
import styles from './Users.module.css'
import Paginator from '../../../Common/Controls/Paginator/Paginator'
import {Pagination} from 'antd';
import User from './User/User'
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, getUsersThunkCreator, onPageChangedThunkCreator} from "../../../redux/usersReducer";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getTotalCount,
    getUsersCount,
    getUsersDataSuperSelector
} from "../../../redux/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../../Types/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";

type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
}

const Users: React.FC = () => {
    const usersData = useAppSelector(getUsersDataSuperSelector)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const currentPage = useAppSelector(getCurrentPage)
    const totalCount = useAppSelector(getTotalCount)
    const usersCount = useAppSelector(getUsersCount)
    const filter = useAppSelector(getFilter)

    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        let query: QueryParamsType = {}                              //создаем обект, который поместим в search параметры строки поиска

        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            //pathname:'users',
            search: queryString.stringify(query)                     //переводим этот обект в строковый вид
        })
    }, [filter, currentPage])                                   //этот useEffect сработаект, только если изменится filter или currentPage

    useEffect(() => {
        const parsed = queryString.parse(location.search)       //читаем search-параметры из строки с URL параметрами в обект parsed
        console.log(parsed)

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)       // проверяем, если что-то в параметрах изменилось, то диспатчим новый запрос users

        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break;
            case 'null':
                actualFilter = {...actualFilter, friend: null}
        }

        dispatch(getUsersThunkCreator(actualPage, usersCount, actualFilter))
    }, [])


    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangedThunkCreator(pageNumber, usersCount, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, usersCount, filter))
    }

    const allUsers = usersData.map((usersItem) => {
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

            <Pagination  /*defaultCurrent={1}*/ total={totalCount}
                                                current={currentPage}
                                                defaultPageSize={usersCount}
                                                showSizeChanger={false}
                                                onChange={onPageChanged}/>

            {allUsers}
        </div>
    )
}

export default Users;
