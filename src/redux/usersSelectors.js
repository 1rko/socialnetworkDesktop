import {createSelector} from "reselect";

const getUsersData = (state) => {
    return state.usersPage.usersData
}

export const getUsersDataSuperSelector =                //Пример сложного селектора
    createSelector(getUsersData, (userData) => {
        return userData.filter(user => true)            //Здесь м.б. реализована сложная логика
    })

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getUsersCount = (state) => {
    return state.usersPage.usersCount
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
