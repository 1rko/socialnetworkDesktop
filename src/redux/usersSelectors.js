export const getuUsersData = (state) => {
    return state.usersPage.usersData
}

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

export const getFollowingInProgress =(state) => {
    return state.usersPage.followingInProgress
}
