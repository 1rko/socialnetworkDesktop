import { usersAPI } from "../DAL/Dal";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    usersData: [],
    currentPage: 4,
    usersCount: 20,
    totalCount: 0,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            };
        }
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            };
        case SET_USERS:
            return {
                ...state, usersData: [...action.usersData]
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const onFollow = (id) =>
({
    type: FOLLOW,
    userId: id
})

export const onUnFollow = (id) =>
({
    type: UNFOLLOW,
    userId: id
})

export const setUsers = (users) =>
({
    type: SET_USERS,
    usersData: users
})

export const setTotalCount = (totalCount) =>
({
    type: SET_TOTAL_COUNT,
    totalCount: totalCount
})

export const setCurrentPage = (currentPage) =>
({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
})

export const toggleIsFetching = (isFetching) =>
({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
})

export const toggleFollowingIsFetching = (isFetching, userId) =>
({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching: isFetching,
    userId: userId
})

export const getUsersThunkCreator = (currentPage, usersCount) =>
    (dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, usersCount)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount))
                dispatch(toggleIsFetching(false))
            })
    }

export const onPageChangedThunkCreator = (pageNumber, usersCount) =>
    (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, usersCount)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(toggleIsFetching(false))
            })

    }

export const onFollowButtonClickThunkCreator = (userId) =>
    (dispatch) => {
        dispatch(toggleFollowingIsFetching(true, userId))
        usersAPI.followUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(onFollow(userId))
                }
                dispatch(toggleFollowingIsFetching(false, userId))
            })
    }

export const onUnfollowButtonClickThunkCreator = (userId) =>
    (dispatch) => {
        dispatch(toggleFollowingIsFetching(true, userId))
        usersAPI.unFollowUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(onUnFollow(userId))
                }
                dispatch(toggleFollowingIsFetching(false, userId))
            })
    }

export default usersReducer