import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getUsersData = (state:AppStateType) => {
    return state.usersPage.usersData
}

export const getUsersDataSuperSelector =                //Пример сложного селектора
    createSelector(getUsersData, (userData) => {
        return userData.filter(user => true)            //Здесь м.б. реализована сложная логика
    })

export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage
}

export const getUsersCount = (state:AppStateType) => {
    return state.usersPage.usersCount
}

export const getTotalCount = (state:AppStateType) => {
    return state.usersPage.totalCount
}

export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress
}
